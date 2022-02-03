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
        title: Resource.msg("training.form.title.submit", "forms", null),
        profileForm: profileForm,
        actionUrl: URLUtils.url("TrainingwithObject-SubmitRegistration").toString()
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
        var CustomObjectMgr = require("dw/object/CustomObjectMgr");
        var Transaction = require("dw/system/Transaction");

        var id = "MyCustomObject";
        var object = CustomObjectMgr.getCustomObject("NewsletterSubscription", id);

        if (!object) {
            // Remember, object creation, modification and deletion must be done inside transactions
            Transaction.wrap(function() {
                object = CustomObjectMgr.createCustomObject("NewsletterSubscription", id);
                object.custom.firstName = profileForm.custom.firstname.value;
                object.custom.lastName = profileForm.custom.firstname.value;
                object.custom.email = profileForm.custom.email.value;
                object.custom.age = profileForm.custom.age.value;
                object.custom.country = profileForm.custom.country.value;
                object.custom.customaddress = profileForm.custom.customaddress.value;
            });
        }

        res.render("myOwntrainingform", {
            title: Resource.msg("training.form.title.edit", "forms", null),
            profileForm: profileForm,
            actionUrl: URLUtils.url("TrainingwithObject-SubmitRegistration").toString()
        });

        next();
    }
);

module.exports = server.exports();
