// var argv=process.argv;

// console.log(argv[0],argv[1]);
//1、模拟npm的包管理器(npm底层也是这样的一个判断！)
//1、根目录分别执行：node a.js init
//---------------：node a.js install bootstrap
//---------------：node a.js uninstall
var argvs=process.argv.slice(2);
console.log(argvs[0]);
switch(argvs[0]){
    case 'init':
    console.log('你需要初始化');
    break;
    case 'install':
    var installPackageName=argvs[1];
    console.log('你在安装'+installPackageName);
    break;
    case 'uninstall':
    console.log('你在uninstall!');
    break;
}