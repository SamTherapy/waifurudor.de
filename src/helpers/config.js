const fs = require("fs");


function readConfig(configPath, callBack) {
  fs.readFile(configPath, (err, configData) =>{
    if (err){
      return callBack && callBack(err);
    }
    try {
      const configObject = JSON.parse(configData);
      return callBack && callBack(null, configObject);
    } catch (err) {
      return callBack && callBack(err)
    }
  });
}

module.exports = { readConfig };
