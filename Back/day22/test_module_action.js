// let module2 = require("./test_module");
// let partModule = module2.partModule;
// let moduleName = module2.moduleName;
const {partModule, moduleName} = require("./test_module");

partModule.func(); // 실행
console.log("moduleName : ", moduleName);