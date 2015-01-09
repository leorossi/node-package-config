var path = require('path');
var fs = require('fs');
var  PackageConfig = {
  load: function(packageFile) {
    if (packageFile === undefined) {
      packageFile = this.getStandardPackageFile();
    }
    // sets default NODE_ENV to development if not defined
    if (process.env.NODE_ENV === undefined) {
      process.env.NODE_ENV = 'development';
    }
    try {
      var packageContent = fs.readFileSync(packageFile);
      var parsed = JSON.parse(packageContent);
      
      if (typeof parsed.config === "object") {
        var expectedConfig = parsed.config[process.env.NODE_ENV];
        if (expectedConfig !== undefined && typeof expectedConfig === "object") {
          return expectedConfig;
        } else {
          throw new Error('package.json does not have config information');
        }
      } else {
        throw new Error('package.json does not have config information');
      }
    } catch(err) {
      throw new Error('Error loading package.json file: ' + err.message);
    }
  },
  /**
   * Returns the package.json that is in the same dir of the file that required fhis module
   * @return {String} the expected package.json file location.
   */
  getStandardPackageFile: function () {
    var requester = module.parent.filename;
    return path.dirname(requester) + "/package.json";

  }
};
module.exports = PackageConfig;