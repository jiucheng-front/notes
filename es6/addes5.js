"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Obj = function () {
    function Obj() {
        _classCallCheck(this, Obj);
    }

    _createClass(Obj, [{
        key: "add",
        value: function add(a, b) {
            return a + b;
        }
    }]);

    return Obj;
}();

var s = new Obj();
console.log(s.add(5, 10));

// //
// var Obj={
//     name:'馬雲',
//     said:function(){
//         return this.name;
//     }
// }
// // var m=new Obj();
// console.log(Obj.said());
