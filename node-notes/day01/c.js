//控制台字符画，动画，不断的切换显示图形(字符画)
//删除重绘
var frames=[];
//数组里的每个成员就是一个帧
frames[frames.length]=`
    Y(^o^)Y
`;
frames[frames.length]=`
    \(^o^)/
`;
frames[frames.length]=`
    \(^o^)/~
`;
frames[frames.length]=`
    \(^o^)/YES!
`;
var fps=30;
var current=0;
//1、es6定义函数
var render=()=>{
    // //1、将当前控制台清空
    // var height=process.stdout.getWindowSize()[1];
    // for(var i=0;i<height;i++){
    //     process.stdout.write('\n');
    // }
    process.stdout.write('\033[2J');
    process.stdout.write('\033[0f');
    //2、输出新的内容
    if(current===frames.length){current=0;}
    process.stdout.write(frames[current++]);
};
setInterval(render,1000/fps);

// // //
// var size=process.stdout.getWindowSize();
// console.log(size);