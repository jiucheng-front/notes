class Obj{
    add(a,b){
        return a+b;
    }
}
let s=new Obj();
console.log(s.add(5,10));

// //
// var Obj={
//     name:'馬雲',
//     said:function(){
//         return this.name;
//     }
// }
// // var m=new Obj();
// console.log(Obj.said());