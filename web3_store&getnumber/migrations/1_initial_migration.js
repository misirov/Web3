const number = artifacts.require("number");

module.exports = function (deployer) {
  deployer.deploy(number);
};
