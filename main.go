package main

import (
	"context"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"text/template"
	"time"

	"github.com/google/go-github/v50/github"
	cp "github.com/otiai10/copy"
	"github.com/spf13/cobra"
	"golang.org/x/oauth2"
)

var (
	includeDir = []string{
		"src",
		"go.mod",
		"go.sum",
		"main.go",
	}
)

func main() {
	cmd := root()
	cmd.AddCommand(update())

	cmd.Execute()
}

func root() *cobra.Command {
	return &cobra.Command{
		Use: "bang",
		Run: func(_ *cobra.Command, _ []string) {
			issues_gh, _, err := client.Issues.ListByRepo(ctx, username, repo, &github.IssueListByRepoOptions{})
			if err != nil {
				perr("list issue by repo", err)
				return
			}

			var issues []Issue
			for i := range issues_gh {
				issues = append(issues, *mapissues(issues_gh[i]))
			}

			makeTemplate(issues)
		},
	}
}

func update() *cobra.Command {
	return &cobra.Command{
		Use: "update",
		Run: func(_ *cobra.Command, _ []string) {
			dir := "../vitepress-blog-theme-" + time.Now().Format("20060102")
			os.RemoveAll(dir)

			cmd := exec.Command("git", "clone", "--depth=1", "https://github.com/fzdwx/vitepress-blog-theme.git", dir)
			cmd.Stderr = os.Stderr
			if err := cmd.Run(); err != nil {
				perr("clone repo", err)
				os.RemoveAll(dir)
				return
			}

			for i := range includeDir {
				path := includeDir[i]
				err := cp.Copy(filepath.Join(dir, path), path)
				if err != nil {
					perr("copy file", err)
					return
				}
			}
		},
	}
}

var (
	client        *github.Client
	ctx           = context.Background()
	repo          string
	username      string
	hourOffset    = 8 * time.Hour
	issueTemplate = `---
# generated don't edit this file !!!
# 自动化生成，不要编辑这个文件！！！
title: "{{ .Title}}"
layout: "issue"
date: {{ .CreateAt }}
update: {{ .UpdateAt }}
tags: [{{ .LabelString }}]
editLink: "{{ .Url}}"
---

{{ .Body }}
`
)

func init() {
	gh_token := os.Getenv("GH_TOKEN")
	if gh_token == "" {
		gh_token = os.Getenv("token")
		if gh_token == "" {
			fmt.Println("Error: no gh_token env var")
			os.Exit(1)
		}
	}

	repo = os.Getenv("repo")
	if repo == "" {
		repo = "vitepress-blog-theme"
		fmt.Println("Warning: no repo env var, using default:", repo)
	}

	ctx := context.Background()
	ts := oauth2.StaticTokenSource(
		&oauth2.Token{AccessToken: gh_token},
	)
	tc := oauth2.NewClient(ctx, ts)

	client = github.NewClient(tc)

	users, _, err := client.Users.Get(ctx, "")
	if err != nil {
		perr("get user", err)
		return
	}
	username = users.GetLogin()
}

func makeTemplate(issues []Issue) {
	templateIssue, err := template.New("issue").Parse(issueTemplate)
	if err != nil {
		perr("parse template", err)
		return
	}

	os.RemoveAll("./content/issues")
	os.MkdirAll("./content/issues", 0755)
	for i := range issues {
		f, err := os.Create(fmt.Sprintf("./content/issues/%d.md", issues[i].Number))
		if err != nil {
			f.Close()
			perr("create file", err)
			return
		}
		err = templateIssue.Execute(f, issues[i])
		if err != nil {
			f.Close()
			perr("execute template", err)
		}
		f.Close()
		fmt.Println("Issue", issues[i].Number, "created")
	}
}

type Issue struct {
	Number      int
	Title       string
	Body        string
	Labels      []Label
	LabelString string
	CreateAt    int64
	UpdateAt    int64
	Url         string
}

type Label struct {
	Id    int64
	Name  string
	Color string
}

func mapissues(issue *github.Issue) *Issue {
	label, labelString := maplabels(issue.Labels)
	return &Issue{
		Number:      issue.GetNumber(),
		Title:       issue.GetTitle(),
		Body:        issue.GetBody(),
		Labels:      label,
		LabelString: labelString,
		CreateAt:    issue.GetCreatedAt().Add(hourOffset).UnixMilli(),
		UpdateAt:    issue.GetUpdatedAt().Add(hourOffset).UnixMilli(),
		Url:         issue.GetHTMLURL(),
	}
}

func maplabels(labels []*github.Label) ([]Label, string) {
	var l []Label
	var s []string
	var label *github.Label
	for i := range labels {
		label = labels[i]
		l = append(l, Label{
			Id:    label.GetID(),
			Name:  label.GetName(),
			Color: label.GetColor(),
		})
		s = append(s, label.GetName())
	}
	return l, strings.Join(s, ", ")
}

func perr(msg string, err error) {
	if err != nil {
		fmt.Println("Error:", msg, ", cause", err)
	}
}
