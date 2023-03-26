dev:
  @pnpm dev

pub:
  npm config set registry https://registry.npmjs.org/
  pnpm publish
  npm config set registry https://registry.npm.taobao.org/

bang:
  @GOOS=darwin  GOARCH=amd64 go build -o ./bin/bang ./main.go
  cd ./bin &&  tar -zcvf ../bin/bang-darwin-amd64.tar.gz ./bang
  @GOOS=linux   GOARCH=amd64 go build -o ./bin/bang ./main.go
  cd ./bin && tar -zcvf ../bin/bang-linux-amd64.tar.gz ./bang
  @GOOS=windows GOARCH=amd64 go build -o ./bin/bang.exe ./main.go
  cd ./bin && tar -zcvf ../bin/bang-windows-amd64.tar.gz ./bang.exe
  @rm -rf ./bin/bang ./bin/bang.exe

upload:
  # sh
  gh release upload $(go run . version) ./bin/bang-darwin-amd64.tar.gz ./bin/bang-linux-amd64.tar.gz ./bin/bang-windows-amd64.tar.gz

release: bang
  # sh
  @go run . log > qwe
  cat qwe | gh release create $(go run . version) -F -
  @just upload
  @rm -rf qwe
