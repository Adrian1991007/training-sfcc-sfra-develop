"use strict";

var server = require("server");

server.get("Test", function(req, res, next) {
    var myvariable = "Test";
    res.render("training/testRenderTemplate", { myvariable: myvariable });
    return next();
});

module.exports = server.exports();
