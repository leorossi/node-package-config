var should = require('should');
var path = require('path');

describe("Package Config Loader", function() {
  it("should throw exception if no package.json file is found", function() {
    should(function() {
      var config = require('../index.js').load();
    }).throw(/ENOENT/);
  });
  it("should throw exception if package.json does not have a config entry", function() {
    should(function() {
      var config = require('../index.js').load(path.resolve("./test/fixtures/packageWithoutConfig.json"));
    }).throw(/config information/);
  });
  it("should throw exception if package.json does not have a config entry", function() {
    should(function() {
      var config = require('../index.js').load(path.resolve("./test/fixtures/packageWithoutEnv.json"));
    }).throw(/config information/);
  });
  it("should throw exception if package.json does not have a config entry", function() {
    should(function() {
      var config = require('../index.js').load(path.resolve("./test/fixtures/packageWithoutEnv2.json"));
    }).throw(/config information/);
  });

  it("should load correct config", function() {
    var config_dev = require('../index.js').load(path.resolve("./test/fixtures/validPackage.json"));
    config_dev.name.should.be.equal('dev');

    process.env.NODE_ENV = "production";
    var config_prod = require('../index.js').load(path.resolve("./test/fixtures/validPackage.json"));
    config_prod.name.should.be.equal('prod');
  });
});