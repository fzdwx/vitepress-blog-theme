package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"text/template"
	"time"

	"github.com/charmbracelet/bubbles/key"
	"github.com/fzdwx/infinite"
	"github.com/fzdwx/infinite/components"
	"github.com/fzdwx/infinite/components/input/text"
	"github.com/fzdwx/infinite/components/selection/singleselect"
	"github.com/google/go-github/v50/github"
	cp "github.com/otiai10/copy"
	"github.com/spf13/cobra"
	"golang.org/x/oauth2"
)

var (
	// update theme
	includeDir = []string{
		"src", "main.go", "go.mod", "go.sum",
		"vite.config.ts",
		"tailwind.config.js",
		"tsconfig.json",
	}

	// newSite
	excludeDir = []string{
		".git", "justfile", "README.md",
	}
	version = "0.3.0"
)

func main() {
	cmd := root()
	cmd.AddCommand(sync())    // sync issue
	cmd.AddCommand(update())  // update theme
	cmd.AddCommand(initCmd()) // new site
	cmd.AddCommand(newCmd())  // new page
	cmd.AddCommand(versionCmd())
	cmd.AddCommand(logCmd())

	cmd.Execute()
}

func root() *cobra.Command {
	return &cobra.Command{
		Use:     "bang",
		Version: version,
		Short:   "vitepress-blog-theme 的辅助工具",
	}
}

func sync() *cobra.Command {
	return &cobra.Command{
		Use:   "sync",
		Short: "同步 issue 到本地的 /content/issues 目录",
		Run: func(_ *cobra.Command, _ []string) {
			_init()
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
		Use:   "update",
		Short: `更新 vitepress-blog-theme`,
		Run: func(_ *cobra.Command, _ []string) {
			_init()
			dir := "../vitepress-blog-theme-" + time.Now().Format("20060102")
			os.RemoveAll(dir)

			// clone repo
			cmd := exec.Command("git", "clone", "--depth=1", "https://github.com/fzdwx/vitepress-blog-theme.git", dir)
			cmd.Stderr = os.Stderr
			if err := cmd.Run(); err != nil {
				perr("clone repo", err)
				os.RemoveAll(dir)
				return
			}

			// copy file
			for i := range includeDir {
				path := includeDir[i]
				err := cp.Copy(filepath.Join(dir, path), path)
				if err != nil {
					perr("copy file", err)
					return
				}
			}

			cmpDep(dir)
		},
	}
}

func initCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "init",
		Short: `创建新的 vitepress-blog-theme 项目`,
		Run: func(_ *cobra.Command, _ []string) {
			_init()
			cmd := exec.Command("git", "clone", "--depth=1", "https://github.com/fzdwx/vitepress-blog-theme.git")
			cmd.Stderr = os.Stderr
			if err := cmd.Run(); err != nil {
				perr("clone repo", err)
				return
			}

			for i := range excludeDir {
				path := excludeDir[i]
				err := os.RemoveAll("./vitepress-blog-theme/" + path)
				if err != nil {
					perr("rm file", err)
					return
				}
			}

			fmt.Println("创建成功，请执行 cd vitepress-blog-theme && pnpm i && pnpm dev")
		},
	}
}

func newCmd() *cobra.Command {
	var (
		flagTtile  string
		flagLayout string
		flagGroup  string
	)
	cmd := &cobra.Command{
		Use: "new",
		Short: `创建新的页面
$ bang new  # 交互式创建
$ bang -t "标题" -l "post" -g "group" new  # 直接创建`,
		Run: func(_ *cobra.Command, _ []string) {
			if flagTtile != "" {
				newPage(flagTtile, flagLayout, flagGroup)
				return
			}

			title, err := infinite.NewText(
				text.WithPrompt("请输入标题"),
			).Display()
			if err != nil {
				perr("get title", err)
				return
			}

			layouts := []string{"post", "doc"}
			selectKeymap := components.DefaultSingleKeyMap()
			selectKeymap.Confirm = key.NewBinding(
				key.WithKeys("enter"),
			)
			selectKeymap.Choice = key.NewBinding(
				key.WithKeys("enter"),
			)
			selectItem, err := infinite.NewSingleSelect(
				layouts,
				singleselect.WithKeyBinding(selectKeymap),
				singleselect.WithDisableFilter(),
			).Display()
			if err != nil {
				perr("get layout", err)
				return
			}

			layout := layouts[selectItem]
			group := "Others"
			if layout == "doc" {
				group, err = infinite.NewText(
					text.WithPrompt("请输入文档分组"),
				).Display()
				if err != nil {
					perr("get group", err)
					return
				}
			}

			newPage(title, layout, group)
		},
	}

	cmd.Flags().StringVarP(&flagTtile, "title", "t", "", "标题")
	cmd.Flags().StringVarP(&flagLayout, "layout", "l", "", "布局 (post/doc)")
	cmd.Flags().StringVarP(&flagGroup, "group", "g", "", "文档分组(仅在 layout 为 doc 时有效)")

	return cmd
}

func versionCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "version",
		Short: "bang version",
		Run: func(_ *cobra.Command, _ []string) {
			fmt.Printf("vbang%s", version)
		},
	}
}

func logCmd() *cobra.Command {
	return &cobra.Command{
		Use:   "log",
		Short: "bang log",
		Run: func(_ *cobra.Command, _ []string) {
			log := `# bang

vitepress-blog-theme 的辅助工具

## v0.3.0

1. ` + "`new`" + ` 命令修改为 init
2. 原来的 new 命令改为创建新的页面
  - $ bang new  # 交互式创建
  - $ bang -t "标题" -l "post" -g "group" new  # 直接创建

## v0.2.0

1. update 命令支持自动化比较依赖版本, 并且自动化更新依赖版本
2. 新增命令 ` + "`new`" + `, 用于创建新的 vitepress-blog-theme 项目
3. 现在直接运行 ` + "`bang`" + ` 不会同步 issue了, 需要运行 ` + "`bang sync`" + `

## v0.1.1

1. 支持同步 issue 到本地的 /content/issues 目录, 需要设置环境变量 ` + "`token`" + `以及  ` + "`repo`" + `
2. 支持更新 vitepress-blog-theme`
			fmt.Println(log)
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

func _init() {
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

type Package struct {
	Dependencies    map[string]string `json:"dependencies"`
	DevDependencies map[string]string `json:"devDependencies"`
}

func cmpDep(dir string) {
	// 读取第一个 package.json 文件
	path := filepath.Join(dir, "package.json")
	firstFile, err := os.Open(path)
	if err != nil {
		perr("open "+path, err)
		return
	}
	defer firstFile.Close()

	var firstPackage = Package{}
	// 解析第一个文件的依赖列表
	if err := json.NewDecoder(firstFile).Decode(&firstPackage); err != nil {
		perr("decode "+path, err)
		return
	}

	// 读取第二个 package.json 文件
	secondFile, err := os.Open("./package.json")
	if err != nil {
		perr("open "+"./package.json", err)
		return
	}
	defer secondFile.Close()

	var secondPackage = Package{}

	// 解析第二个文件的依赖列表
	if err := json.NewDecoder(secondFile).Decode(&secondPackage); err != nil {
		perr("decode "+"./package.json", err)
	}

	var dep = []string{}
	var devDep = []string{}
	var updateDep = []string{}
	for dependency, fversion := range firstPackage.Dependencies {
		if sVersion, ok := secondPackage.Dependencies[dependency]; !ok {
			dep = append(dep, dependency)
			if sVersion != fversion {
				updateDep = append(updateDep, dependency)
			}
		}
	}
	for dependency, fVersion := range firstPackage.DevDependencies {
		if sVersion, ok := secondPackage.DevDependencies[dependency]; !ok {
			devDep = append(devDep, dependency)
			if sVersion != fVersion {
				updateDep = append(updateDep, dependency)
			}
		}
	}

	if len(dep) > 0 {
		for i := range dep {
			cmd := exec.Command("pnpm", "add", dep[i])
			cmd.Stderr = os.Stderr
			cmd.Run()
		}
		fmt.Println("new dependencies:", strings.Join(dep, " "))
	}
	if len(devDep) > 0 {
		for i := range devDep {
			cmd := exec.Command("pnpm", "add", "-D", devDep[i])
			cmd.Stderr = os.Stderr
			cmd.Run()
		}
		fmt.Println("new dev dependencies:", strings.Join(devDep, " "))
	}

	if len(updateDep) > 0 {
		cmd := exec.Command("pnpm", "update", "--latest")
		cmd.Stderr = os.Stderr
		cmd.Run()
		fmt.Println("update dependencies:", strings.Join(updateDep, " "))
	}
}

const postTemplate = `---
title: "%s"
date: "%s"
layout: "post"
tags: []
---

`

const docTemplate = `---
group: "%s"
title: "%s"
date: "%s"
layout: "doc"
tags: []
---

`

const timeLayout = "2006-01-02T15:04:05Z07:00"

func newPage(title, layout, group string) {
	if layout == "" {
		layout = "post"
	}
	var (
		page string
		date = time.Now().Format(timeLayout)
	)

	// format content
	if layout == "post" {
		page = fmt.Sprintf(postTemplate, title, date)
	} else if layout == "doc" {
		page = fmt.Sprintf(docTemplate, group, title, date)
	} else {
		perr("unknow layout: "+layout, nil)
		return
	}

	// file dir
	dir := filepath.Join("./content", layout+"s")
	if layout == "doc" {
		dir = filepath.Join(dir, group)
	}
	os.MkdirAll(dir, 0755)

	// create file
	f, err := os.Create(filepath.Join(dir, title+".md"))
	if err != nil {
		perr("create file", err)
		return
	}
	defer f.Close()

	_, err = f.WriteString(page)
	if err != nil {
		perr("write file", err)
		return
	}
}

type Issue struct {
	Number      int
	Title       string
	Body        string
	Labels      []Label
	LabelString string
	CreateAt    string
	UpdateAt    string
	Url         string
}

type Label struct {
	Id    int64
	Name  string
	Color string
}

func mapissues(issue *github.Issue) *Issue {
	label, labelString := maplabels(issue.Labels)
	i := &Issue{
		Number:      issue.GetNumber(),
		Title:       issue.GetTitle(),
		Body:        issue.GetBody(),
		Labels:      label,
		LabelString: labelString,
		CreateAt:    issue.GetCreatedAt().Local().Format(timeLayout),
		UpdateAt:    issue.GetUpdatedAt().Local().Format(timeLayout),
		Url:         issue.GetHTMLURL(),
	}
	return i
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
	} else {
		fmt.Println("Error:", msg)
	}
}
