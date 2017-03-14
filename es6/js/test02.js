let map=new Map();
map.set("name","馬化騰");
map.set("age",50);
map.set("job","CEO");
for(let [key,value] of map){
    console.log(key+" is "+value);
}