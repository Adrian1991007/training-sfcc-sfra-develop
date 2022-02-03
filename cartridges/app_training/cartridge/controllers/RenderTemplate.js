"use strict";

var server = require("server");

server.get("rand", function(req, res, next) {
    var myvariable = "Showed by RenderTemplate endpoint";
    res.render("training/RenderTemplate", { myvariable: myvariable });
    return next();
});

server.get("TestDecorator", function(req, res, next) {
    var myvariable = "Showed by TestDecorator endpoint";
    res.render("training/testDecorator", { myvariable: myvariable });
    return next();
});

module.exports = server.exports();
