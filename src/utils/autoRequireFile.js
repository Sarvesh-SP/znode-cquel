const fs = require('fs');
const path = require('path');

const subRouters = {};

// Scan the directory for files
const getAllSubroutes = (dir) => {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      getAllSubroutes(fullPath);
    } else {
      if (fullPath !== __filename) {
        const tempFileName = fullPath.split('/')[9].split('.');
        // const customPath = './' + fullPath.split('/')[9].toString();
        let fileName = tempFileName[0] + (tempFileName[1].charAt(0).toUpperCase() + tempFileName[1].slice(1)).toString();
        subRouters[fileName] = require(fullPath);
        // subRouters.push(require(fullPath));
      }
    }
    return subRouters;
  });
};

module.exports = {
  getAllSubroutes,
};
