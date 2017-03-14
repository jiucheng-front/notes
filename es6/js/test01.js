let obj={
    name:'馬雲',
    age:40,
    said:function(){
        console.log(this.name+"今年"+this.age);
    }
}
obj.said();