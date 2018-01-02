var projectDir = __dirname;

module.exports = GLOBAL.ev3Require = function(module) {
  return require(projectDir + module);
}