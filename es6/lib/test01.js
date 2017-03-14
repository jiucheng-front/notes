"use strict";

var obj = {
    name: '馬雲',
    age: 40,
    said: function said() {
        console.log(this.name + "今年" + this.age);
    }
};
obj.said();