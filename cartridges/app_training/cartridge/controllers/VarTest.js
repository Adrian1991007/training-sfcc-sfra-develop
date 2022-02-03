"use strict";

var server = require("server");

server.get("varTest", function(req, res, next) {
    var myvariable = "Just a string";
    res.render("training/vartest", { myvariable: myvariable });
    return next();
});

module.exports = server.exports();
