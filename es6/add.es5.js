var $__initTailRecursiveFunction = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("traceur/dist/commonjs/runtime/modules/initTailRecursiveFunction.js", "add.js")).default;
var $__continuation = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("traceur/dist/commonjs/runtime/modules/continuation.js", "add.js")).default;
var $__call = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("traceur/dist/commonjs/runtime/modules/call.js", "add.js")).default;
var $__createClass = $traceurRuntime.getModule($traceurRuntime.normalizeModuleName("traceur/dist/commonjs/runtime/modules/createClass.js", "add.js")).default;
var Obj = $__initTailRecursiveFunction(function() {
  return $__call(function() {
    "use strict";
    function Obj() {}
    return $__continuation($__createClass, null, [Obj, {add: function(a, b) {
        return a + b;
      }}, {}]);
  }, this, arguments);
})();
var s = new Obj();
console.log(s.add(5, 10));
