项目含有 submodules，clone 记得加 --recursive 参数

`git clone git@github.com:jjz/pod-project.git --recursive`

如果已经 clone 未加 --recursive，要手动获取 submodules

`git submodule update --init`

每次 pull 代码也别忘了更新 submodule

`git pull && git submodule update`



使用方法

```
npm install
npm start
```

