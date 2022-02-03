"use strict";

var server = require("server");
var csrfProtection = require("*/cartridge/scripts/middleware/csrf");
var consentTracking = require("*/cartridge/scripts/middleware/consentTracking");

server.get("Show", consentTracking.consent, server.middleware.https, csrfProtection.generateToken, function(
    req,
    res,
    next
) {
    var URLUtils = require("dw/web/URLUtils");
    var Resource = require("dw/web/Resource");

    var profileForm = server.forms.getForm("myOwnForm");
    profileForm.clear();

    res.render("myOwntrainingform", {
        title: Resource.msg("myOwnForm.form.title.submit", "forms", null),
        profileForm: profileForm,
        actionUrl: URLUtils.url("MyForm-SubmitRegistration").toString()
    });

    next();
});

server.post(
    "SubmitRegistration",
    server.middleware.https,
    consentTracking.consent,
    csrfProtection.generateToken,
    function(req, res, next) {
        var Resource = require("dw/web/Resource");
        var URLUtils = require("dw/web/URLUtils");
        var profileForm = server.forms.getForm("myOwnForm");
        res.render("myOwntrainingform", {
            title: Resource.msg("myOwnForm.form.title.edit", "forms", null),
            profileForm: profileForm,
            actionUrl: URLUtils.url("MyForm-SubmitRegistration").toString()
        });

        next();
    }
);

module.exports = server.exports();
