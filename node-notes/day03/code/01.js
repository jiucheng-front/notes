//PATH模块的使用

const path=require('path');

const temp=path.join(__dirname,'./../date/01.txt');
// path.basename(p[, ext])
// console.log(path.basename(temp));//获取文件名

// path.delimiter
// console.log(path.delimiter);//获取不听操作系统中默认的路径分隔符，WIN中是;,Linux中是:
// console.log(process.env.PATH);//获取环境变量
// console.log(process.env.PATH.split(path.delimiter));

// path.dirname(p)
// console.log(path.dirname(temp));//获取文件的目录的路径

// path.extname(p)
// console.log(path.extname(temp));//获取路径中的扩展名，后缀名

//path.parse(pathString);//将路径转换为一个字符串对象
var obj=path.parse(temp);
// console.log(obj);
// path.format(pathObject)
// console.log(path.format(obj));

// path.isAbsolute(path)
// console.log(path.isAbsolute(temp));//判断是不是绝对路径
// console.log(path.isAbsolute('../date/01.txt'))



// path.join([path1][, path2][, ...])
var s=path.join(__dirname,'..','../','day01','frames/1.txt');
// console.log(s);//

// path.normalize(p) 常规化的路径
// console.log(path.normalize(temp));

// path.parse(pathString)//将路径转换为一个字符串
// console.log();


// path.relative(from, to)//获取从from到to的相对路径
// console.log(path.relative(__dirname, 'E:\\github\\aboutnodejs\\node\\day03'));


// path.resolve([from ...], to)
// console.log(path.resolve('./date'));//与join不同


// path.sep
// console.log(path.sep);//获取路径中的成员分隔符，WIN中是\ Linux中是/

//允许在任何操作系统上使用Linux的方式操作路径
// path.posix
// console.log();

//允许在任何操作系统上使用windows的方式操作路径
// path.win32
// console.log(path.win32);


var p={
    win32:null
}
p.win32=p;

console.log(p===p.win32);

