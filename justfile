dev:
  @pnpm dev

pub:
  npm config set registry https://registry.npmjs.org/
  pnpm publish
  npm config set registry https://registry.npm.taobao.org/

corss:
  GOOS=darwin  GOARCH=amd64 go build -o ./bin/corss_darwin_amd64 ./main.go
  GOOS=linux   GOARCH=amd64 go build -o ./bin/corss_linux_amd64 ./main.go
  GOOS=windows GOARCH=amd64 go build -o ./bin/corss_windows_amd64.exe ./main.go

upload:
