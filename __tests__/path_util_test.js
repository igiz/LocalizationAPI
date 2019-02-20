const path_util = require('../model/path_util');
const appRoot = require('app-root-path');

test("Full path test",() => {
    expect(path_util.resolve("C:\\Some\\Path\\somefile.js")).toBe("C:\\Some\\Path\\somefile.js");
});

test("Token {appDir} replacement test", () => {
    expect(path_util.resolve("{appDir}\\some\\other\\path")).toBe(appRoot.path + "\\some\\other\\path");
});