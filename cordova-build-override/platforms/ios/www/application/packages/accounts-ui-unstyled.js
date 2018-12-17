//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var ServiceConfiguration = Package['service-configuration'].ServiceConfiguration;
var Accounts = Package['accounts-base'].Accounts;
var _ = Package.underscore._;
var Template = Package['templating-runtime'].Template;
var Session = Package.session.Session;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Spacebars = Package.spacebars.Spacebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var passwordSignupFields, displayName, getLoginServices, hasPasswordService, dropdown, validateUsername, validateEmail, validatePassword;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/accounts-ui-unstyled/accounts_ui.js                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
/**
 * @summary Accounts UI
 * @namespace
 * @memberOf Accounts
 * @importFromPackage accounts-base
 */
Accounts.ui = {};

Accounts.ui._options = {
  requestPermissions: {},
  requestOfflineToken: {},
  forceApprovalPrompt: {}
};

// XXX refactor duplicated code in this function

/**
 * @summary Configure the behavior of [`{{> loginButtons}}`](#accountsui).
 * @locus Client
 * @param {Object} options
 * @param {Object} options.requestPermissions Which [permissions](#requestpermissions) to request from the user for each external service.
 * @param {Object} options.requestOfflineToken To ask the user for permission to act on their behalf when offline, map the relevant external service to `true`. Currently only supported with Google. See [Meteor.loginWithExternalService](#meteor_loginwithexternalservice) for more details.
 * @param {Object} options.forceApprovalPrompt If true, forces the user to approve the app's permissions, even if previously approved. Currently only supported with Google.
 * @param {String} options.passwordSignupFields Which fields to display in the user creation form. One of '`USERNAME_AND_EMAIL`', '`USERNAME_AND_OPTIONAL_EMAIL`', '`USERNAME_ONLY`', or '`EMAIL_ONLY`' (default).
 * @importFromPackage accounts-base
 */
Accounts.ui.config = function(options) {
  // validate options keys
  var VALID_KEYS = ['passwordSignupFields', 'requestPermissions', 'requestOfflineToken', 'forceApprovalPrompt'];
  _.each(_.keys(options), function (key) {
    if (!_.contains(VALID_KEYS, key))
      throw new Error("Accounts.ui.config: Invalid key: " + key);
  });

  // deal with `passwordSignupFields`
  if (options.passwordSignupFields) {
    if (_.contains([
      "USERNAME_AND_EMAIL",
      "USERNAME_AND_OPTIONAL_EMAIL",
      "USERNAME_ONLY",
      "EMAIL_ONLY"
    ], options.passwordSignupFields)) {
      if (Accounts.ui._options.passwordSignupFields)
        throw new Error("Accounts.ui.config: Can't set `passwordSignupFields` more than once");
      else
        Accounts.ui._options.passwordSignupFields = options.passwordSignupFields;
    } else {
      throw new Error("Accounts.ui.config: Invalid option for `passwordSignupFields`: " + options.passwordSignupFields);
    }
  }

  // deal with `requestPermissions`
  if (options.requestPermissions) {
    _.each(options.requestPermissions, function (scope, service) {
      if (Accounts.ui._options.requestPermissions[service]) {
        throw new Error("Accounts.ui.config: Can't set `requestPermissions` more than once for " + service);
      } else if (!(scope instanceof Array)) {
        throw new Error("Accounts.ui.config: Value for `requestPermissions` must be an array");
      } else {
        Accounts.ui._options.requestPermissions[service] = scope;
      }
    });
  }

  // deal with `requestOfflineToken`
  if (options.requestOfflineToken) {
    _.each(options.requestOfflineToken, function (value, service) {
      if (service !== 'google')
        throw new Error("Accounts.ui.config: `requestOfflineToken` only supported for Google login at the moment.");

      if (Accounts.ui._options.requestOfflineToken[service]) {
        throw new Error("Accounts.ui.config: Can't set `requestOfflineToken` more than once for " + service);
      } else {
        Accounts.ui._options.requestOfflineToken[service] = value;
      }
    });
  }

  // deal with `forceApprovalPrompt`
  if (options.forceApprovalPrompt) {
    _.each(options.forceApprovalPrompt, function (value, service) {
      if (service !== 'google')
        throw new Error("Accounts.ui.config: `forceApprovalPrompt` only supported for Google login at the moment.");

      if (Accounts.ui._options.forceApprovalPrompt[service]) {
        throw new Error("Accounts.ui.config: Can't set `forceApprovalPrompt` more than once for " + service);
      } else {
        Accounts.ui._options.forceApprovalPrompt[service] = value;
      }
    });
  }
};

passwordSignupFields = function () {
  return Accounts.ui._options.passwordSignupFields || "EMAIL_ONLY";
};


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/accounts-ui-unstyled/template.login_buttons.js                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("loginButtons");
Template["loginButtons"] = new Template("Template.loginButtons", (function() {
  var view = this;
  return HTML.DIV({
    id: "login-buttons",
    class: function() {
      return [ "login-buttons-dropdown-align-", Spacebars.mustache(view.lookup("align")) ];
    }
  }, "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("currentUser"));
  }, function() {
    return [ "\n      ", Blaze.If(function() {
      return Spacebars.call(view.lookup("loggingInOrOut"));
    }, function() {
      return [ "\n        \n        ", Blaze.If(function() {
        return Spacebars.call(view.lookup("dropdown"));
      }, function() {
        return [ "\n          ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggingIn")), "\n        " ];
      }, function() {
        return [ "\n          ", HTML.DIV({
          class: "login-buttons-with-only-one-button"
        }, "\n            ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggingInSingleLoginButton")), "\n          "), "\n        " ];
      }), "\n      " ];
    }, function() {
      return [ "\n        ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedIn")), "\n      " ];
    }), "\n    " ];
  }, function() {
    return [ "\n      ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedOut")), "\n    " ];
  }), "\n  ");
}));

Template.__checkName("_loginButtonsLoggedIn");
Template["_loginButtonsLoggedIn"] = new Template("Template._loginButtonsLoggedIn", (function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.call(view.lookup("dropdown"));
  }, function() {
    return [ "\n    ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedInDropdown")), "\n  " ];
  }, function() {
    return [ "\n    ", HTML.DIV({
      class: "login-buttons-with-only-one-button"
    }, "\n      ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedInSingleLogoutButton")), "\n    "), "\n  " ];
  });
}));

Template.__checkName("_loginButtonsLoggedOut");
Template["_loginButtonsLoggedOut"] = new Template("Template._loginButtonsLoggedOut", (function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.call(view.lookup("services"));
  }, function() {
    return [ " \n    ", Blaze.If(function() {
      return Spacebars.call(view.lookup("configurationLoaded"));
    }, function() {
      return [ "\n      ", Blaze.If(function() {
        return Spacebars.call(view.lookup("dropdown"));
      }, function() {
        return [ " \n        ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedOutDropdown")), "\n      " ];
      }, function() {
        return [ "\n        ", Spacebars.With(function() {
          return Spacebars.call(view.lookup("singleService"));
        }, function() {
          return [ " \n          ", HTML.DIV({
            class: "login-buttons-with-only-one-button"
          }, "\n            ", Blaze.If(function() {
            return Spacebars.call(view.lookup("loggingIn"));
          }, function() {
            return [ "\n              ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggingInSingleLoginButton")), "\n            " ];
          }, function() {
            return [ "\n              ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedOutSingleLoginButton")), "\n            " ];
          }), "\n          "), "\n        " ];
        }), "\n      " ];
      }), "\n    " ];
    }), "\n  " ];
  }, function() {
    return [ "\n    ", HTML.DIV({
      class: "no-services"
    }, "No login services configured"), "\n  " ];
  });
}));

Template.__checkName("_loginButtonsMessages");
Template["_loginButtonsMessages"] = new Template("Template._loginButtonsMessages", (function() {
  var view = this;
  return [ Blaze.If(function() {
    return Spacebars.call(view.lookup("errorMessage"));
  }, function() {
    return [ "\n    ", HTML.DIV({
      class: "message error-message"
    }, Blaze.View("lookup:errorMessage", function() {
      return Spacebars.mustache(view.lookup("errorMessage"));
    })), "\n  " ];
  }), "\n  ", Blaze.If(function() {
    return Spacebars.call(view.lookup("infoMessage"));
  }, function() {
    return [ "\n    ", HTML.DIV({
      class: "message info-message"
    }, Blaze.View("lookup:infoMessage", function() {
      return Spacebars.mustache(view.lookup("infoMessage"));
    })), "\n  " ];
  }) ];
}));

Template.__checkName("_loginButtonsLoggingIn");
Template["_loginButtonsLoggingIn"] = new Template("Template._loginButtonsLoggingIn", (function() {
  var view = this;
  return [ Spacebars.include(view.lookupTemplate("_loginButtonsLoggingInPadding")), HTML.Raw('\n  <div class="loading">&nbsp;</div>\n  '), Spacebars.include(view.lookupTemplate("_loginButtonsLoggingInPadding")) ];
}));

Template.__checkName("_loginButtonsLoggingInPadding");
Template["_loginButtonsLoggingInPadding"] = new Template("Template._loginButtonsLoggingInPadding", (function() {
  var view = this;
  return Blaze.Unless(function() {
    return Spacebars.call(view.lookup("dropdown"));
  }, function() {
    return [ "\n    \n    ", HTML.DIV({
      class: "login-buttons-padding"
    }, "\n      ", HTML.DIV({
      class: "login-button single-login-button",
      style: "visibility: hidden;",
      id: "login-buttons-logout"
    }, HTML.CharRef({
      html: "&nbsp;",
      str: " "
    })), "\n    "), "\n  " ];
  }, function() {
    return [ "\n    \n    ", HTML.DIV({
      class: "login-buttons-padding"
    }), "\n  " ];
  });
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/accounts-ui-unstyled/template.login_buttons_single.js                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("_loginButtonsLoggedOutSingleLoginButton");
Template["_loginButtonsLoggedOutSingleLoginButton"] = new Template("Template._loginButtonsLoggedOutSingleLoginButton", (function() {
  var view = this;
  return HTML.DIV({
    class: "login-text-and-button"
  }, "\n    ", HTML.DIV({
    class: function() {
      return [ "login-button single-login-button ", Blaze.Unless(function() {
        return Spacebars.call(view.lookup("configured"));
      }, function() {
        return "configure-button";
      }) ];
    },
    id: function() {
      return [ "login-buttons-", Spacebars.mustache(view.lookup("name")) ];
    }
  }, "\n      ", Blaze.If(function() {
    return Spacebars.call(view.lookup("cannotConfigure"));
  }, function() {
    return [ "\n        ", HTML.SPAN({
      class: ""
    }, Blaze.View("lookup:capitalizedName", function() {
      return Spacebars.mustache(view.lookup("capitalizedName"));
    }), " not configured"), "\n      " ];
  }, function() {
    return [ "\n        ", HTML.DIV({
      class: "login-image",
      id: function() {
        return [ "login-buttons-image-", Spacebars.mustache(view.lookup("name")) ];
      }
    }), "\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("configured"));
    }, function() {
      return [ "\n          ", HTML.SPAN({
        class: function() {
          return [ "text-besides-image sign-in-text-", Spacebars.mustache(view.lookup("name")) ];
        }
      }, "Sign in with ", Blaze.View("lookup:capitalizedName", function() {
        return Spacebars.mustache(view.lookup("capitalizedName"));
      })), "\n        " ];
    }, function() {
      return [ "\n            ", HTML.SPAN({
        class: function() {
          return [ "text-besides-image configure-text-", Spacebars.mustache(view.lookup("name")) ];
        }
      }, "Configure ", Blaze.View("lookup:capitalizedName", function() {
        return Spacebars.mustache(view.lookup("capitalizedName"));
      }), " Login"), "\n        " ];
    }), "\n      " ];
  }), "\n    "), "\n  ");
}));

Template.__checkName("_loginButtonsLoggingInSingleLoginButton");
Template["_loginButtonsLoggingInSingleLoginButton"] = new Template("Template._loginButtonsLoggingInSingleLoginButton", (function() {
  var view = this;
  return HTML.DIV({
    class: "login-text-and-button"
  }, "\n    ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggingIn")), "\n  ");
}));

Template.__checkName("_loginButtonsLoggedInSingleLogoutButton");
Template["_loginButtonsLoggedInSingleLogoutButton"] = new Template("Template._loginButtonsLoggedInSingleLogoutButton", (function() {
  var view = this;
  return HTML.DIV({
    class: "login-text-and-button"
  }, "\n    ", HTML.DIV({
    class: "login-display-name"
  }, "\n      ", Blaze.View("lookup:displayName", function() {
    return Spacebars.mustache(view.lookup("displayName"));
  }), "\n    "), HTML.Raw('\n    <div class="login-button single-login-button" id="login-buttons-logout">Sign Out</div>\n  '));
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/accounts-ui-unstyled/template.login_buttons_dropdown.js                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.__checkName("_loginButtonsLoggedInDropdown");
Template["_loginButtonsLoggedInDropdown"] = new Template("Template._loginButtonsLoggedInDropdown", (function() {
  var view = this;
  return HTML.DIV({
    class: "login-link-and-dropdown-list"
  }, "\n    ", HTML.A({
    class: "login-link-text",
    id: "login-name-link"
  }, "\n      ", Blaze.View("lookup:displayName", function() {
    return Spacebars.mustache(view.lookup("displayName"));
  }), " ▾\n    "), "\n\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("dropdownVisible"));
  }, function() {
    return [ "\n      ", HTML.DIV({
      id: "login-dropdown-list",
      class: "accounts-dialog"
    }, "\n        ", HTML.A({
      class: "login-close-text"
    }, "Close"), "\n        ", HTML.DIV({
      class: "login-close-text-clear"
    }), "\n\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("inMessageOnlyFlow"));
    }, function() {
      return [ "\n          ", Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), "\n        " ];
    }, function() {
      return [ "\n          ", Blaze.If(function() {
        return Spacebars.call(view.lookup("inChangePasswordFlow"));
      }, function() {
        return [ "\n            ", Spacebars.include(view.lookupTemplate("_loginButtonsChangePassword")), "\n          " ];
      }, function() {
        return [ "\n            ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedInDropdownActions")), "\n          " ];
      }), "\n        " ];
    }), "\n      "), "\n    " ];
  }), "\n  ");
}));

Template.__checkName("_loginButtonsLoggedInDropdownActions");
Template["_loginButtonsLoggedInDropdownActions"] = new Template("Template._loginButtonsLoggedInDropdownActions", (function() {
  var view = this;
  return [ Blaze.If(function() {
    return Spacebars.call(view.lookup("allowChangingPassword"));
  }, function() {
    return [ "\n    ", HTML.DIV({
      class: "login-button",
      id: "login-buttons-open-change-password"
    }, "\n      Change password\n    "), "\n  " ];
  }), HTML.Raw('\n\n  <div class="login-button" id="login-buttons-logout">\n    Sign out\n  </div>\n\n  '), Spacebars.include(view.lookupTemplate("_loginButtonsMessages")) ];
}));

Template.__checkName("_loginButtonsLoggedOutDropdown");
Template["_loginButtonsLoggedOutDropdown"] = new Template("Template._loginButtonsLoggedOutDropdown", (function() {
  var view = this;
  return HTML.DIV({
    class: function() {
      return [ "login-link-and-dropdown-list ", Spacebars.mustache(view.lookup("additionalClasses")) ];
    }
  }, "\n    ", Blaze.If(function() {
    return Spacebars.call(view.lookup("dropdownVisible"));
  }, function() {
    return [ "\n      \n      ", HTML.A({
      class: "login-link-text",
      id: "login-sign-in-link"
    }, "Sign in ▾"), "\n      ", HTML.DIV({
      id: "login-dropdown-list",
      class: "accounts-dialog"
    }, "\n        ", HTML.A({
      class: "login-close-text"
    }, "Close"), "\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("loggingIn"));
    }, function() {
      return [ "\n          ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggingIn")), "\n        " ];
    }), "\n        ", HTML.DIV({
      class: "login-close-text-clear"
    }), "\n        ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedOutAllServices")), "\n      "), "\n    " ];
  }, function() {
    return [ "\n      ", Blaze.If(function() {
      return Spacebars.call(view.lookup("loggingIn"));
    }, function() {
      return [ "\n        \n        ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggingIn")), "\n      " ];
    }, function() {
      return [ "\n        ", HTML.A({
        class: "login-link-text",
        id: "login-sign-in-link"
      }, "Sign in ▾"), "\n      " ];
    }), "\n    " ];
  }), "\n  ");
}));

Template.__checkName("_loginButtonsLoggedOutAllServices");
Template["_loginButtonsLoggedOutAllServices"] = new Template("Template._loginButtonsLoggedOutAllServices", (function() {
  var view = this;
  return [ Blaze.Each(function() {
    return Spacebars.call(view.lookup("services"));
  }, function() {
    return [ "\n    ", Blaze.If(function() {
      return Spacebars.call(view.lookup("isPasswordService"));
    }, function() {
      return [ "\n      ", Blaze.If(function() {
        return Spacebars.call(view.lookup("hasOtherServices"));
      }, function() {
        return [ " \n        ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedOutPasswordServiceSeparator")), "\n      " ];
      }), "\n      ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedOutPasswordService")), "\n    " ];
    }, function() {
      return [ "\n      ", Spacebars.include(view.lookupTemplate("_loginButtonsLoggedOutSingleLoginButton")), "\n    " ];
    }), "\n  " ];
  }), "\n\n  ", Blaze.Unless(function() {
    return Spacebars.call(view.lookup("hasPasswordService"));
  }, function() {
    return [ "\n    ", Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), "\n  " ];
  }) ];
}));

Template.__checkName("_loginButtonsLoggedOutPasswordServiceSeparator");
Template["_loginButtonsLoggedOutPasswordServiceSeparator"] = new Template("Template._loginButtonsLoggedOutPasswordServiceSeparator", (function() {
  var view = this;
  return HTML.Raw('<div class="or">\n    <span class="hline">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>\n    <span class="or-text">or</span>\n    <span class="hline">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>\n  </div>');
}));

Template.__checkName("_loginButtonsLoggedOutPasswordService");
Template["_loginButtonsLoggedOutPasswordService"] = new Template("Template._loginButtonsLoggedOutPasswordService", (function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.call(view.lookup("inForgotPasswordFlow"));
  }, function() {
    return [ "\n    ", Spacebars.include(view.lookupTemplate("_forgotPasswordForm")), "\n  " ];
  }, function() {
    return [ "\n    ", HTML.FORM({
      class: "login-form login-password-form"
    }, "\n      ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("fields"));
    }, function() {
      return [ "\n        ", Spacebars.include(view.lookupTemplate("_loginButtonsFormField")), "\n      " ];
    }), "\n\n      ", Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), "\n\n      ", HTML.BUTTON({
      class: "login-button login-button-form-submit",
      id: "login-buttons-password"
    }, "\n        ", Blaze.If(function() {
      return Spacebars.call(view.lookup("inSignupFlow"));
    }, function() {
      return "\n          Create account\n        ";
    }, function() {
      return "\n          Sign in\n        ";
    }), "\n      "), "\n\n      ", Blaze.If(function() {
      return Spacebars.call(view.lookup("inLoginFlow"));
    }, function() {
      return [ "\n        ", Blaze.If(function() {
        return Spacebars.call(view.lookup("showCreateAccountLink"));
      }, function() {
        return [ "\n          ", HTML.DIV({
          class: "additional-link-container"
        }, "\n            ", HTML.A({
          id: "signup-link",
          class: "additional-link"
        }, "Create account"), "\n          "), "\n        " ];
      }), "\n\n        ", Blaze.If(function() {
        return Spacebars.call(view.lookup("showForgotPasswordLink"));
      }, function() {
        return [ "\n          ", HTML.DIV({
          class: "additional-link-container"
        }, "\n            ", HTML.A({
          id: "forgot-password-link",
          class: "additional-link"
        }, "Forgot password"), "\n          "), "\n        " ];
      }), "\n      " ];
    }), "\n\n      ", Blaze.If(function() {
      return Spacebars.call(view.lookup("inSignupFlow"));
    }, function() {
      return [ "\n        ", Spacebars.include(view.lookupTemplate("_loginButtonsBackToLoginLink")), "\n      " ];
    }), "\n    "), "\n  " ];
  });
}));

Template.__checkName("_forgotPasswordForm");
Template["_forgotPasswordForm"] = new Template("Template._forgotPasswordForm", (function() {
  var view = this;
  return HTML.DIV({
    class: "login-form"
  }, HTML.Raw('\n    <div id="forgot-password-email-label-and-input"> \n      <label id="forgot-password-email-label" for="forgot-password-email">Email</label>\n      <input id="forgot-password-email" type="email">\n    </div>\n\n    '), Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), HTML.Raw('\n\n    <div class="login-button login-button-form-submit" id="login-buttons-forgot-password">\n      Reset password\n    </div>\n\n    '), Spacebars.include(view.lookupTemplate("_loginButtonsBackToLoginLink")), "\n  ");
}));

Template.__checkName("_loginButtonsBackToLoginLink");
Template["_loginButtonsBackToLoginLink"] = new Template("Template._loginButtonsBackToLoginLink", (function() {
  var view = this;
  return HTML.Raw('<div class="additional-link-container">\n    <a id="back-to-login-link" class="additional-link">Sign in</a>\n  </div>');
}));

Template.__checkName("_loginButtonsFormField");
Template["_loginButtonsFormField"] = new Template("Template._loginButtonsFormField", (function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.call(view.lookup("visible"));
  }, function() {
    return [ "\n    ", HTML.DIV({
      id: function() {
        return [ "login-", Spacebars.mustache(view.lookup("fieldName")), "-label-and-input" ];
      }
    }, "\n      ", HTML.LABEL({
      id: function() {
        return [ "login-", Spacebars.mustache(view.lookup("fieldName")), "-label" ];
      },
      for: function() {
        return [ "login-", Spacebars.mustache(view.lookup("fieldName")) ];
      }
    }, "\n        ", Blaze.View("lookup:fieldLabel", function() {
      return Spacebars.mustache(view.lookup("fieldLabel"));
    }), "\n      "), "\n      ", HTML.INPUT({
      id: function() {
        return [ "login-", Spacebars.mustache(view.lookup("fieldName")) ];
      },
      type: function() {
        return Spacebars.mustache(view.lookup("inputType"));
      }
    }), "\n    "), "\n  " ];
  });
}));

Template.__checkName("_loginButtonsChangePassword");
Template["_loginButtonsChangePassword"] = new Template("Template._loginButtonsChangePassword", (function() {
  var view = this;
  return [ Blaze.Each(function() {
    return Spacebars.call(view.lookup("fields"));
  }, function() {
    return [ "\n    ", Spacebars.include(view.lookupTemplate("_loginButtonsFormField")), "\n  " ];
  }), "\n\n  ", Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), HTML.Raw('\n\n  <div class="login-button login-button-form-submit" id="login-buttons-do-change-password">\n    Change password\n  </div>') ];
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/accounts-ui-unstyled/template.login_buttons_dialogs.js                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //

Template.body.addContent((function() {
  var view = this;
  return [ Spacebars.include(view.lookupTemplate("_resetPasswordDialog")), "\n  ", Spacebars.include(view.lookupTemplate("_justResetPasswordDialog")), "\n  ", Spacebars.include(view.lookupTemplate("_enrollAccountDialog")), "\n  ", Spacebars.include(view.lookupTemplate("_justVerifiedEmailDialog")), "\n  ", Spacebars.include(view.lookupTemplate("_configureLoginServiceDialog")), "\n  ", Spacebars.include(view.lookupTemplate("_configureLoginOnDesktopDialog")), "\n\n  \n  ", Spacebars.include(view.lookupTemplate("_loginButtonsMessagesDialog")) ];
}));
Meteor.startup(Template.body.renderToDocument);

Template.__checkName("_resetPasswordDialog");
Template["_resetPasswordDialog"] = new Template("Template._resetPasswordDialog", (function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.call(view.lookup("inResetPasswordFlow"));
  }, function() {
    return [ "\n    ", HTML.DIV({
      class: "hide-background"
    }), "\n\n    ", HTML.DIV({
      class: "accounts-dialog accounts-centered-dialog"
    }, "\n      ", HTML.LABEL({
      id: "reset-password-new-password-label",
      for: "reset-password-new-password"
    }, "\n        New password\n      "), "\n\n      ", HTML.DIV({
      class: "reset-password-new-password-wrapper"
    }, "\n        ", HTML.INPUT({
      id: "reset-password-new-password",
      type: "password"
    }), "\n      "), "\n\n      ", Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), "\n\n      ", HTML.DIV({
      class: "login-button login-button-form-submit",
      id: "login-buttons-reset-password-button"
    }, "\n        Set password\n      "), "\n\n      ", HTML.A({
      class: "accounts-close",
      id: "login-buttons-cancel-reset-password"
    }, HTML.CharRef({
      html: "&times;",
      str: "×"
    })), "\n    "), "\n  " ];
  });
}));

Template.__checkName("_justResetPasswordDialog");
Template["_justResetPasswordDialog"] = new Template("Template._justResetPasswordDialog", (function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.call(view.lookup("visible"));
  }, function() {
    return [ "\n    ", HTML.DIV({
      class: "accounts-dialog accounts-centered-dialog"
    }, "\n      Password reset.\n      You are now logged in as ", Blaze.View("lookup:displayName", function() {
      return Spacebars.mustache(view.lookup("displayName"));
    }), ".\n      ", HTML.DIV({
      class: "login-button",
      id: "just-verified-dismiss-button"
    }, "Dismiss"), "\n    "), "\n  " ];
  });
}));

Template.__checkName("_enrollAccountDialog");
Template["_enrollAccountDialog"] = new Template("Template._enrollAccountDialog", (function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.call(view.lookup("inEnrollAccountFlow"));
  }, function() {
    return [ "\n    ", HTML.DIV({
      class: "hide-background"
    }), "\n\n    ", HTML.DIV({
      class: "accounts-dialog accounts-centered-dialog"
    }, "\n      ", HTML.LABEL({
      id: "enroll-account-password-label",
      for: "enroll-account-password"
    }, "\n        Choose a password\n      "), "\n\n      ", HTML.DIV({
      class: "enroll-account-password-wrapper"
    }, "\n        ", HTML.INPUT({
      id: "enroll-account-password",
      type: "password"
    }), "\n      "), "\n\n      ", Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), "\n\n      ", HTML.DIV({
      class: "login-button login-button-form-submit",
      id: "login-buttons-enroll-account-button"
    }, "\n        Create account\n      "), "\n\n      ", HTML.A({
      class: "accounts-close",
      id: "login-buttons-cancel-enroll-account"
    }, HTML.CharRef({
      html: "&times;",
      str: "×"
    })), "\n    "), "\n  " ];
  });
}));

Template.__checkName("_justVerifiedEmailDialog");
Template["_justVerifiedEmailDialog"] = new Template("Template._justVerifiedEmailDialog", (function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.call(view.lookup("visible"));
  }, function() {
    return [ "\n    ", HTML.DIV({
      class: "accounts-dialog accounts-centered-dialog"
    }, "\n      Email verified.\n      You are now logged in as ", Blaze.View("lookup:displayName", function() {
      return Spacebars.mustache(view.lookup("displayName"));
    }), ".\n      ", HTML.DIV({
      class: "login-button",
      id: "just-verified-dismiss-button"
    }, "Dismiss"), "\n    "), "\n  " ];
  });
}));

Template.__checkName("_configureLoginServiceDialog");
Template["_configureLoginServiceDialog"] = new Template("Template._configureLoginServiceDialog", (function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.call(view.lookup("visible"));
  }, function() {
    return [ "\n    ", HTML.DIV({
      id: "configure-login-service-dialog",
      class: "accounts-dialog accounts-centered-dialog"
    }, "\n      ", Spacebars.include(view.lookupTemplate("configurationSteps")), "\n\n      ", HTML.P("\n        Now, copy over some details.\n      "), "\n      ", HTML.P("\n        ", HTML.TABLE("\n          ", HTML.COLGROUP("\n            ", HTML.COL({
      span: "1",
      class: "configuration_labels"
    }), "\n            ", HTML.COL({
      span: "1",
      class: "configuration_inputs"
    }), "\n          "), "\n          ", Blaze.Each(function() {
      return Spacebars.call(view.lookup("configurationFields"));
    }, function() {
      return [ "\n            ", HTML.TR("\n              ", HTML.TD("\n                ", HTML.LABEL({
        for: function() {
          return [ "configure-login-service-dialog-", Spacebars.mustache(view.lookup("property")) ];
        }
      }, Blaze.View("lookup:label", function() {
        return Spacebars.mustache(view.lookup("label"));
      })), "\n              "), "\n              ", HTML.TD("\n                ", HTML.INPUT({
        id: function() {
          return [ "configure-login-service-dialog-", Spacebars.mustache(view.lookup("property")) ];
        },
        type: "text"
      }), "\n              "), "\n            "), "\n          " ];
    }), "\n        "), "\n      "), "\n      ", HTML.P({
      class: "new-section"
    }, "\n        Choose the login style:\n      "), "\n      ", HTML.P("\n        ", HTML.CharRef({
      html: "&emsp;",
      str: " "
    }), HTML.INPUT({
      id: "configure-login-service-dialog-popupBasedLogin",
      type: "radio",
      checked: "checked",
      name: "loginStyle",
      value: "popup"
    }), "\n        ", HTML.LABEL({
      for: "configure-login-service-dialog-popupBasedLogin"
    }, "Popup-based login (recommended for most applications)"), "\n\n        ", HTML.BR(), HTML.CharRef({
      html: "&emsp;",
      str: " "
    }), HTML.INPUT({
      id: "configure-login-service-dialog-redirectBasedLogin",
      type: "radio",
      name: "loginStyle",
      value: "redirect"
    }), "\n        ", HTML.LABEL({
      for: "configure-login-service-dialog-redirectBasedLogin"
    }, "\n          Redirect-based login (special cases explained\n          ", HTML.A({
      href: "https://github.com/meteor/meteor/wiki/OAuth-for-mobile-Meteor-clients#popup-versus-redirect-flow",
      target: "_blank"
    }, "here"), ")\n        "), "\n      "), "\n      ", HTML.DIV({
      class: "new-section"
    }, "\n        ", HTML.DIV({
      class: "login-button configure-login-service-dismiss-button"
    }, "\n          I'll do this later\n        "), "\n        ", HTML.A({
      class: "accounts-close configure-login-service-dismiss-button"
    }, HTML.CharRef({
      html: "&times;",
      str: "×"
    })), "\n\n        ", HTML.DIV({
      class: function() {
        return [ "login-button login-button-configure ", Blaze.If(function() {
          return Spacebars.call(view.lookup("saveDisabled"));
        }, function() {
          return "login-button-disabled";
        }) ];
      },
      id: "configure-login-service-dialog-save-configuration"
    }, "\n          Save Configuration\n        "), "\n      "), "\n    "), "\n  " ];
  });
}));

Template.__checkName("_loginButtonsMessagesDialog");
Template["_loginButtonsMessagesDialog"] = new Template("Template._loginButtonsMessagesDialog", (function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.call(view.lookup("visible"));
  }, function() {
    return [ "\n    ", HTML.DIV({
      class: "accounts-dialog accounts-centered-dialog",
      id: "login-buttons-message-dialog"
    }, "\n      ", Spacebars.include(view.lookupTemplate("_loginButtonsMessages")), "\n      ", HTML.DIV({
      class: "login-button",
      id: "messages-dialog-dismiss-button"
    }, "Dismiss"), "\n    "), "\n  " ];
  });
}));

Template.__checkName("_configureLoginOnDesktopDialog");
Template["_configureLoginOnDesktopDialog"] = new Template("Template._configureLoginOnDesktopDialog", (function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.call(view.lookup("visible"));
  }, function() {
    return [ "\n    ", HTML.DIV({
      class: "accounts-dialog accounts-centered-dialog",
      id: "configure-on-desktop-dialog"
    }, "\n      ", HTML.P("\n        Please configure login on a desktop browser.\n      "), "\n      ", HTML.DIV({
      class: "login-button",
      id: "configure-on-desktop-dismiss-button"
    }, "Dismiss"), "\n    "), "\n  " ];
  });
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/accounts-ui-unstyled/login_buttons_session.js                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var VALID_KEYS = [
  'dropdownVisible',

  // XXX consider replacing these with one key that has an enum for values.
  'inSignupFlow',
  'inForgotPasswordFlow',
  'inChangePasswordFlow',
  'inMessageOnlyFlow',

  'errorMessage',
  'infoMessage',

  // dialogs with messages (info and error)
  'resetPasswordToken',
  'enrollAccountToken',
  'justVerifiedEmail',
  'justResetPassword',

  'configureLoginServiceDialogVisible',
  'configureLoginServiceDialogServiceName',
  'configureLoginServiceDialogSaveDisabled',
  'configureOnDesktopVisible'
];

var validateKey = function (key) {
  if (!_.contains(VALID_KEYS, key))
    throw new Error("Invalid key in loginButtonsSession: " + key);
};

var KEY_PREFIX = "Meteor.loginButtons.";

// XXX This should probably be package scope rather than exported
// (there was even a comment to that effect here from before we had
// namespacing) but accounts-ui-viewer uses it, so leave it as is for
// now
Accounts._loginButtonsSession = {
  set: function(key, value) {
    validateKey(key);
    if (_.contains(['errorMessage', 'infoMessage'], key))
      throw new Error("Don't set errorMessage or infoMessage directly. Instead, use errorMessage() or infoMessage().");

    this._set(key, value);
  },

  _set: function(key, value) {
    Session.set(KEY_PREFIX + key, value);
  },

  get: function(key) {
    validateKey(key);
    return Session.get(KEY_PREFIX + key);
  },

  closeDropdown: function () {
    this.set('inSignupFlow', false);
    this.set('inForgotPasswordFlow', false);
    this.set('inChangePasswordFlow', false);
    this.set('inMessageOnlyFlow', false);
    this.set('dropdownVisible', false);
    this.resetMessages();
  },

  infoMessage: function(message) {
    this._set("errorMessage", null);
    this._set("infoMessage", message);
    this.ensureMessageVisible();
  },

  errorMessage: function(message) {
    this._set("errorMessage", message);
    this._set("infoMessage", null);
    this.ensureMessageVisible();
  },

  // is there a visible dialog that shows messages (info and error)
  isMessageDialogVisible: function () {
    return this.get('resetPasswordToken') ||
      this.get('enrollAccountToken') ||
      this.get('justVerifiedEmail');
  },

  // ensure that somethings displaying a message (info or error) is
  // visible.  if a dialog with messages is open, do nothing;
  // otherwise open the dropdown.
  //
  // notably this doesn't matter when only displaying a single login
  // button since then we have an explicit message dialog
  // (_loginButtonsMessageDialog), and dropdownVisible is ignored in
  // this case.
  ensureMessageVisible: function () {
    if (!this.isMessageDialogVisible())
      this.set("dropdownVisible", true);
  },

  resetMessages: function () {
    this._set("errorMessage", null);
    this._set("infoMessage", null);
  },

  configureService: function (name) {
    if (Meteor.isCordova) {
      this.set('configureOnDesktopVisible', true);
    } else {
      this.set('configureLoginServiceDialogVisible', true);
      this.set('configureLoginServiceDialogServiceName', name);
      this.set('configureLoginServiceDialogSaveDisabled', true);
    }
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/accounts-ui-unstyled/login_buttons.js                                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// for convenience
var loginButtonsSession = Accounts._loginButtonsSession;

// shared between dropdown and single mode
Template.loginButtons.events({
  'click #login-buttons-logout': function() {
    Meteor.logout(function () {
      loginButtonsSession.closeDropdown();
    });
  }
});

Template.registerHelper('loginButtons', function () {
  throw new Error("Use {{> loginButtons}} instead of {{loginButtons}}");
});

//
// helpers
//

displayName = function () {
  var user = Meteor.user();
  if (!user)
    return '';

  if (user.profile && user.profile.name)
    return user.profile.name;
  if (user.username)
    return user.username;
  if (user.emails && user.emails[0] && user.emails[0].address)
    return user.emails[0].address;

  return '';
};

// returns an array of the login services used by this app. each
// element of the array is an object (eg {name: 'facebook'}), since
// that makes it useful in combination with handlebars {{#each}}.
//
// don't cache the output of this function: if called during startup (before
// oauth packages load) it might not include them all.
//
// NOTE: It is very important to have this return password last
// because of the way we render the different providers in
// login_buttons_dropdown.html
getLoginServices = function () {
  var self = this;

  // First look for OAuth services.
  var services = Package['accounts-oauth'] ? Accounts.oauth.serviceNames() : [];

  // Be equally kind to all login services. This also preserves
  // backwards-compatibility. (But maybe order should be
  // configurable?)
  services.sort();

  // Add password, if it's there; it must come last.
  if (hasPasswordService())
    services.push('password');

  return _.map(services, function(name) {
    return {name: name};
  });
};

hasPasswordService = function () {
  return !!Package['accounts-password'];
};

dropdown = function () {
  return hasPasswordService() || getLoginServices().length > 1;
};

// XXX improve these. should this be in accounts-password instead?
//
// XXX these will become configurable, and will be validated on
// the server as well.
validateUsername = function (username) {
  if (username.length >= 3) {
    return true;
  } else {
    loginButtonsSession.errorMessage("Username must be at least 3 characters long");
    return false;
  }
};
validateEmail = function (email) {
  if (passwordSignupFields() === "USERNAME_AND_OPTIONAL_EMAIL" && email === '')
    return true;

  if (email.indexOf('@') !== -1) {
    return true;
  } else {
    loginButtonsSession.errorMessage("Invalid email");
    return false;
  }
};
validatePassword = function (password) {
  if (password.length >= 6) {
    return true;
  } else {
    loginButtonsSession.errorMessage("Password must be at least 6 characters long");
    return false;
  }
};

//
// loginButtonLoggedOut template
//

Template._loginButtonsLoggedOut.helpers({
  dropdown: dropdown,
  services: getLoginServices,
  singleService: function () {
    var services = getLoginServices();
    if (services.length !== 1)
      throw new Error(
        "Shouldn't be rendering this template with more than one configured service");
    return services[0];
  },
  configurationLoaded: function () {
    return Accounts.loginServicesConfigured();
  }
});


//
// loginButtonsLoggedIn template
//

  // decide whether we should show a dropdown rather than a row of
  // buttons
Template._loginButtonsLoggedIn.helpers({
  dropdown: dropdown
});



//
// loginButtonsLoggedInSingleLogoutButton template
//

Template._loginButtonsLoggedInSingleLogoutButton.helpers({
  displayName: displayName
});



//
// loginButtonsMessage template
//

Template._loginButtonsMessages.helpers({
  errorMessage: function () {
    return loginButtonsSession.get('errorMessage');
  }
});

Template._loginButtonsMessages.helpers({
  infoMessage: function () {
    return loginButtonsSession.get('infoMessage');
  }
});


//
// loginButtonsLoggingInPadding template
//

Template._loginButtonsLoggingInPadding.helpers({
  dropdown: dropdown
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/accounts-ui-unstyled/login_buttons_single.js                                                               //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// for convenience
var loginButtonsSession = Accounts._loginButtonsSession;


var loginResultCallback = function (serviceName, err) {
  if (!err) {
    loginButtonsSession.closeDropdown();
  } else if (err instanceof Accounts.LoginCancelledError) {
    // do nothing
  } else if (err instanceof ServiceConfiguration.ConfigError) {
    if (Template._configureLoginServiceDialog.templateForService(serviceName)) {
      loginButtonsSession.configureService(serviceName);
    } else {
      loginButtonsSession.errorMessage(
        "No configuration for " + capitalize(serviceName) + ".\n" +
        "Use `ServiceConfiguration` to configure it or " +
        "install the `" +serviceName + "-config-ui` package."
      );
    }
  } else {
    loginButtonsSession.errorMessage(err.reason || "Unknown error");
  }
};


// In the login redirect flow, we'll have the result of the login
// attempt at page load time when we're redirected back to the
// application.  Register a callback to update the UI (i.e. to close
// the dialog on a successful login or display the error on a failed
// login).
//
Accounts.onPageLoadLogin(function (attemptInfo) {
  // Ignore if we have a left over login attempt for a service that is no longer registered.
  if (_.contains(_.pluck(getLoginServices(), "name"), attemptInfo.type))
    loginResultCallback(attemptInfo.type, attemptInfo.error);
});


Template._loginButtonsLoggedOutSingleLoginButton.events({
  'click .login-button': function () {
    var serviceName = this.name;
    loginButtonsSession.resetMessages();

    // XXX Service providers should be able to specify their
    // `Meteor.loginWithX` method name.
    var loginWithService = Meteor["loginWith" +
                                  (serviceName === 'meteor-developer' ?
                                   'MeteorDeveloperAccount' :
                                   capitalize(serviceName))];

    var options = {}; // use default scope unless specified
    if (Accounts.ui._options.requestPermissions[serviceName])
      options.requestPermissions = Accounts.ui._options.requestPermissions[serviceName];
    if (Accounts.ui._options.requestOfflineToken[serviceName])
      options.requestOfflineToken = Accounts.ui._options.requestOfflineToken[serviceName];
    if (Accounts.ui._options.forceApprovalPrompt[serviceName])
      options.forceApprovalPrompt = Accounts.ui._options.forceApprovalPrompt[serviceName];

    loginWithService(options, function (err) {
      loginResultCallback(serviceName, err);
    });
  }
});

Template._loginButtonsLoggedOutSingleLoginButton.helpers({
  // not configured and has no config UI
  cannotConfigure: function() {
    return !ServiceConfiguration.configurations.findOne({service: this.name})
      && !Template._configureLoginServiceDialog.templateForService(this.name);
  },
  configured: function () {
    return !!ServiceConfiguration.configurations.findOne({service: this.name});
  },
  capitalizedName: function () {
    if (this.name === 'github')
      // XXX we should allow service packages to set their capitalized name
      return 'GitHub';
    else if (this.name === 'meteor-developer')
      return 'Meteor';
    else
      return capitalize(this.name);
  }
});

// XXX from http://epeli.github.com/underscore.string/lib/underscore.string.js
var capitalize = function(str){
  str = str == null ? '' : String(str);
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/accounts-ui-unstyled/login_buttons_dropdown.js                                                             //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// for convenience
var loginButtonsSession = Accounts._loginButtonsSession;

// events shared between loginButtonsLoggedOutDropdown and
// loginButtonsLoggedInDropdown
Template.loginButtons.events({
  'click #login-name-link, click #login-sign-in-link': function () {
    loginButtonsSession.set('dropdownVisible', true);
  },
  'click .login-close-text': function () {
    loginButtonsSession.closeDropdown();
  }
});


//
// loginButtonsLoggedInDropdown template and related
//

Template._loginButtonsLoggedInDropdown.events({
  'click #login-buttons-open-change-password': function() {
    loginButtonsSession.resetMessages();
    loginButtonsSession.set('inChangePasswordFlow', true);
  }
});

Template._loginButtonsLoggedInDropdown.helpers({
  displayName: displayName,

  inChangePasswordFlow: function () {
    return loginButtonsSession.get('inChangePasswordFlow');
  },

  inMessageOnlyFlow: function () {
    return loginButtonsSession.get('inMessageOnlyFlow');
  },

  dropdownVisible: function () {
    return loginButtonsSession.get('dropdownVisible');
  }
});

Template._loginButtonsLoggedInDropdownActions.helpers({
  allowChangingPassword: function () {
    // it would be more correct to check whether the user has a password set,
    // but in order to do that we'd have to send more data down to the client,
    // and it'd be preferable not to send down the entire service.password document.
    //
    // instead we use the heuristic: if the user has a username or email set.
    var user = Meteor.user();
    return user.username || (user.emails && user.emails[0] && user.emails[0].address);
  }
});


//
// loginButtonsLoggedOutDropdown template and related
//

Template._loginButtonsLoggedOutDropdown.events({
  'click #login-buttons-password': function (event) {
    event.preventDefault();
    loginOrSignup();
  },

  'keypress #forgot-password-email': function (event) {
    if (event.keyCode === 13)
      forgotPassword();
  },

  'click #login-buttons-forgot-password': function () {
    forgotPassword();
  },

  'click #signup-link': function () {
    loginButtonsSession.resetMessages();

    // store values of fields before swtiching to the signup form
    var username = trimmedElementValueById('login-username');
    var email = trimmedElementValueById('login-email');
    var usernameOrEmail = trimmedElementValueById('login-username-or-email');
    // notably not trimmed. a password could (?) start or end with a space
    var password = elementValueById('login-password');

    loginButtonsSession.set('inSignupFlow', true);
    loginButtonsSession.set('inForgotPasswordFlow', false);
    // force the ui to update so that we have the approprate fields to fill in
    Tracker.flush();

    // update new fields with appropriate defaults
    if (username !== null)
      document.getElementById('login-username').value = username;
    else if (email !== null)
      document.getElementById('login-email').value = email;
    else if (usernameOrEmail !== null)
      if (usernameOrEmail.indexOf('@') === -1)
        document.getElementById('login-username').value = usernameOrEmail;
    else
      document.getElementById('login-email').value = usernameOrEmail;

    if (password !== null)
      document.getElementById('login-password').value = password;

    // Force redrawing the `login-dropdown-list` element because of
    // a bizarre Chrome bug in which part of the DIV is not redrawn
    // in case you had tried to unsuccessfully log in before
    // switching to the signup form.
    //
    // Found tip on how to force a redraw on
    // http://stackoverflow.com/questions/3485365/how-can-i-force-webkit-to-redraw-repaint-to-propagate-style-changes/3485654#3485654
    var redraw = document.getElementById('login-dropdown-list');
    redraw.style.display = 'none';
    redraw.offsetHeight; // it seems that this line does nothing but is necessary for the redraw to work
    redraw.style.display = 'block';
  },
  'click #forgot-password-link': function () {
    loginButtonsSession.resetMessages();

    // store values of fields before swtiching to the signup form
    var email = trimmedElementValueById('login-email');
    var usernameOrEmail = trimmedElementValueById('login-username-or-email');

    loginButtonsSession.set('inSignupFlow', false);
    loginButtonsSession.set('inForgotPasswordFlow', true);
    // force the ui to update so that we have the approprate fields to fill in
    Tracker.flush();

    // update new fields with appropriate defaults
    if (email !== null)
      document.getElementById('forgot-password-email').value = email;
    else if (usernameOrEmail !== null)
      if (usernameOrEmail.indexOf('@') !== -1)
        document.getElementById('forgot-password-email').value = usernameOrEmail;

  },
  'click #back-to-login-link': function () {
    loginButtonsSession.resetMessages();

    var username = trimmedElementValueById('login-username');
    var email = trimmedElementValueById('login-email')
          || trimmedElementValueById('forgot-password-email'); // Ughh. Standardize on names?
    // notably not trimmed. a password could (?) start or end with a space
    var password = elementValueById('login-password');

    loginButtonsSession.set('inSignupFlow', false);
    loginButtonsSession.set('inForgotPasswordFlow', false);
    // force the ui to update so that we have the approprate fields to fill in
    Tracker.flush();

    if (document.getElementById('login-username') && username !== null)
      document.getElementById('login-username').value = username;
    if (document.getElementById('login-email') && email !== null)
      document.getElementById('login-email').value = email;

    var usernameOrEmailInput = document.getElementById('login-username-or-email');
    if (usernameOrEmailInput) {
      if (email !== null)
        usernameOrEmailInput.value = email;
      if (username !== null)
        usernameOrEmailInput.value = username;
    }

    if (password !== null)
      document.getElementById('login-password').value = password;
  },
  'keypress #login-username, keypress #login-email, keypress #login-username-or-email, keypress #login-password, keypress #login-password-again': function (event) {
    if (event.keyCode === 13)
      loginOrSignup();
  }
});

Template._loginButtonsLoggedOutDropdown.helpers({
  // additional classes that can be helpful in styling the dropdown
  additionalClasses: function () {
    if (!hasPasswordService()) {
      return false;
    } else {
      if (loginButtonsSession.get('inSignupFlow')) {
        return 'login-form-create-account';
      } else if (loginButtonsSession.get('inForgotPasswordFlow')) {
        return 'login-form-forgot-password';
      } else {
        return 'login-form-sign-in';
      }
    }
  },

  dropdownVisible: function () {
    return loginButtonsSession.get('dropdownVisible');
  },

  hasPasswordService: hasPasswordService
});

// return all login services, with password last
Template._loginButtonsLoggedOutAllServices.helpers({
  services: getLoginServices,

  isPasswordService: function () {
    return this.name === 'password';
  },

  hasOtherServices: function () {
    return getLoginServices().length > 1;
  },

  hasPasswordService: hasPasswordService
});

Template._loginButtonsLoggedOutPasswordService.helpers({
  fields: function () {
    var loginFields = [
      {fieldName: 'username-or-email', fieldLabel: 'Username or Email',
       visible: function () {
         return _.contains(
           ["USERNAME_AND_EMAIL", "USERNAME_AND_OPTIONAL_EMAIL"],
           passwordSignupFields());
       }},
      {fieldName: 'username', fieldLabel: 'Username',
       visible: function () {
         return passwordSignupFields() === "USERNAME_ONLY";
       }},
      {fieldName: 'email', fieldLabel: 'Email', inputType: 'email',
       visible: function () {
         return passwordSignupFields() === "EMAIL_ONLY";
       }},
      {fieldName: 'password', fieldLabel: 'Password', inputType: 'password',
       visible: function () {
         return true;
       }}
    ];

    var signupFields = [
      {fieldName: 'username', fieldLabel: 'Username',
       visible: function () {
         return _.contains(
           ["USERNAME_AND_EMAIL", "USERNAME_AND_OPTIONAL_EMAIL", "USERNAME_ONLY"],
           passwordSignupFields());
       }},
      {fieldName: 'email', fieldLabel: 'Email', inputType: 'email',
       visible: function () {
         return _.contains(
           ["USERNAME_AND_EMAIL", "EMAIL_ONLY"],
           passwordSignupFields());
       }},
      {fieldName: 'email', fieldLabel: 'Email (optional)', inputType: 'email',
       visible: function () {
         return passwordSignupFields() === "USERNAME_AND_OPTIONAL_EMAIL";
       }},
      {fieldName: 'password', fieldLabel: 'Password', inputType: 'password',
       visible: function () {
         return true;
       }},
      {fieldName: 'password-again', fieldLabel: 'Password (again)',
       inputType: 'password',
       visible: function () {
         // No need to make users double-enter their password if
         // they'll necessarily have an email set, since they can use
         // the "forgot password" flow.
         return _.contains(
           ["USERNAME_AND_OPTIONAL_EMAIL", "USERNAME_ONLY"],
           passwordSignupFields());
       }}
    ];

    return loginButtonsSession.get('inSignupFlow') ? signupFields : loginFields;
  },

  inForgotPasswordFlow: function () {
    return loginButtonsSession.get('inForgotPasswordFlow');
  },

  inLoginFlow: function () {
    return !loginButtonsSession.get('inSignupFlow') && !loginButtonsSession.get('inForgotPasswordFlow');
  },

  inSignupFlow: function () {
    return loginButtonsSession.get('inSignupFlow');
  },

  showCreateAccountLink: function () {
    return !Accounts._options.forbidClientAccountCreation;
  },

  showForgotPasswordLink: function () {
    return _.contains(
      ["USERNAME_AND_EMAIL", "USERNAME_AND_OPTIONAL_EMAIL", "EMAIL_ONLY"],
      passwordSignupFields());
  }
});

Template._loginButtonsFormField.helpers({
  inputType: function () {
    return this.inputType || "text";
  }
});


//
// loginButtonsChangePassword template
//

Template._loginButtonsChangePassword.events({
  'keypress #login-old-password, keypress #login-password, keypress #login-password-again': function (event) {
    if (event.keyCode === 13)
      changePassword();
  },
  'click #login-buttons-do-change-password': function () {
    changePassword();
  }
});

Template._loginButtonsChangePassword.helpers({
  fields: function () {
    return [
      {fieldName: 'old-password', fieldLabel: 'Current Password', inputType: 'password',
       visible: function () {
         return true;
       }},
      {fieldName: 'password', fieldLabel: 'New Password', inputType: 'password',
       visible: function () {
         return true;
       }},
      {fieldName: 'password-again', fieldLabel: 'New Password (again)',
       inputType: 'password',
       visible: function () {
         // No need to make users double-enter their password if
         // they'll necessarily have an email set, since they can use
         // the "forgot password" flow.
         return _.contains(
           ["USERNAME_AND_OPTIONAL_EMAIL", "USERNAME_ONLY"],
           passwordSignupFields());
       }}
    ];
  }
});


//
// helpers
//

var elementValueById = function(id) {
  var element = document.getElementById(id);
  if (!element)
    return null;
  else
    return element.value;
};

var trimmedElementValueById = function(id) {
  var element = document.getElementById(id);
  if (!element)
    return null;
  else
    return element.value.replace(/^\s*|\s*$/g, ""); // trim() doesn't work on IE8;
};

var loginOrSignup = function () {
  if (loginButtonsSession.get('inSignupFlow'))
    signup();
  else
    login();
};

var login = function () {
  loginButtonsSession.resetMessages();

  var username = trimmedElementValueById('login-username');
  var email = trimmedElementValueById('login-email');
  var usernameOrEmail = trimmedElementValueById('login-username-or-email');
  // notably not trimmed. a password could (?) start or end with a space
  var password = elementValueById('login-password');

  var loginSelector;
  if (username !== null) {
    if (!validateUsername(username))
      return;
    else
      loginSelector = {username: username};
  } else if (email !== null) {
    if (!validateEmail(email))
      return;
    else
      loginSelector = {email: email};
  } else if (usernameOrEmail !== null) {
    // XXX not sure how we should validate this. but this seems good enough (for now),
    // since an email must have at least 3 characters anyways
    if (!validateUsername(usernameOrEmail))
      return;
    else
      loginSelector = usernameOrEmail;
  } else {
    throw new Error("Unexpected -- no element to use as a login user selector");
  }

  Meteor.loginWithPassword(loginSelector, password, function (error, result) {
    if (error) {
      loginButtonsSession.errorMessage(error.reason || "Unknown error");
    } else {
      loginButtonsSession.closeDropdown();
    }
  });
};

var signup = function () {
  loginButtonsSession.resetMessages();

  var options = {}; // to be passed to Accounts.createUser

  var username = trimmedElementValueById('login-username');
  if (username !== null) {
    if (!validateUsername(username))
      return;
    else
      options.username = username;
  }

  var email = trimmedElementValueById('login-email');
  if (email !== null) {
    if (!validateEmail(email))
      return;
    else
      options.email = email;
  }

  // notably not trimmed. a password could (?) start or end with a space
  var password = elementValueById('login-password');
  if (!validatePassword(password))
    return;
  else
    options.password = password;

  if (!matchPasswordAgainIfPresent())
    return;

  Accounts.createUser(options, function (error) {
    if (error) {
      loginButtonsSession.errorMessage(error.reason || "Unknown error");
    } else {
      loginButtonsSession.closeDropdown();
    }
  });
};

var forgotPassword = function () {
  loginButtonsSession.resetMessages();

  var email = trimmedElementValueById("forgot-password-email");
  if (email.indexOf('@') !== -1) {
    Accounts.forgotPassword({email: email}, function (error) {
      if (error)
        loginButtonsSession.errorMessage(error.reason || "Unknown error");
      else
        loginButtonsSession.infoMessage("Email sent");
    });
  } else {
    loginButtonsSession.errorMessage("Invalid email");
  }
};

var changePassword = function () {
  loginButtonsSession.resetMessages();

  // notably not trimmed. a password could (?) start or end with a space
  var oldPassword = elementValueById('login-old-password');

  // notably not trimmed. a password could (?) start or end with a space
  var password = elementValueById('login-password');
  if (!validatePassword(password))
    return;

  if (!matchPasswordAgainIfPresent())
    return;

  Accounts.changePassword(oldPassword, password, function (error) {
    if (error) {
      loginButtonsSession.errorMessage(error.reason || "Unknown error");
    } else {
      loginButtonsSession.set('inChangePasswordFlow', false);
      loginButtonsSession.set('inMessageOnlyFlow', true);
      loginButtonsSession.infoMessage("Password changed");
    }
  });
};

var matchPasswordAgainIfPresent = function () {
  // notably not trimmed. a password could (?) start or end with a space
  var passwordAgain = elementValueById('login-password-again');
  if (passwordAgain !== null) {
    // notably not trimmed. a password could (?) start or end with a space
    var password = elementValueById('login-password');
    if (password !== passwordAgain) {
      loginButtonsSession.errorMessage("Passwords don't match");
      return false;
    }
  }
  return true;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/accounts-ui-unstyled/login_buttons_dialogs.js                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// for convenience
var loginButtonsSession = Accounts._loginButtonsSession;

// since we don't want to pass around the callback that we get from our event
// handlers, we just make it a variable for the whole file
var doneCallback;

Accounts.onResetPasswordLink(function (token, done) {
  loginButtonsSession.set("resetPasswordToken", token);
  doneCallback = done;
});

Accounts.onEnrollmentLink(function (token, done) {
  loginButtonsSession.set("enrollAccountToken", token);
  doneCallback = done;
});

Accounts.onEmailVerificationLink(function (token, done) {
  Accounts.verifyEmail(token, function (error) {
    if (! error) {
      loginButtonsSession.set('justVerifiedEmail', true);
    }

    done();
    // XXX show something if there was an error.
  });
});


//
// resetPasswordDialog template
//

Template._resetPasswordDialog.events({
  'click #login-buttons-reset-password-button': function () {
    resetPassword();
  },
  'keypress #reset-password-new-password': function (event) {
    if (event.keyCode === 13)
      resetPassword();
  },
  'click #login-buttons-cancel-reset-password': function () {
    loginButtonsSession.set('resetPasswordToken', null);
    if (doneCallback)
      doneCallback();
  }
});

var resetPassword = function () {
  loginButtonsSession.resetMessages();
  var newPassword = document.getElementById('reset-password-new-password').value;
  if (!validatePassword(newPassword))
    return;

  Accounts.resetPassword(
    loginButtonsSession.get('resetPasswordToken'), newPassword,
    function (error) {
      if (error) {
        loginButtonsSession.errorMessage(error.reason || "Unknown error");
      } else {
        loginButtonsSession.set('resetPasswordToken', null);
        loginButtonsSession.set('justResetPassword', true);
        if (doneCallback)
          doneCallback();
      }
    });
};

Template._resetPasswordDialog.helpers({
  inResetPasswordFlow: function () {
    return loginButtonsSession.get('resetPasswordToken');
  }
});

//
// justResetPasswordDialog template
//

Template._justResetPasswordDialog.events({
  'click #just-verified-dismiss-button': function () {
    loginButtonsSession.set('justResetPassword', false);
  }
});

Template._justResetPasswordDialog.helpers({
  visible: function () {
    return loginButtonsSession.get('justResetPassword');
  },
  displayName: displayName
});



//
// enrollAccountDialog template
//

Template._enrollAccountDialog.events({
  'click #login-buttons-enroll-account-button': function () {
    enrollAccount();
  },
  'keypress #enroll-account-password': function (event) {
    if (event.keyCode === 13)
      enrollAccount();
  },
  'click #login-buttons-cancel-enroll-account': function () {
    loginButtonsSession.set('enrollAccountToken', null);
    if (doneCallback)
      doneCallback();
  }
});

var enrollAccount = function () {
  loginButtonsSession.resetMessages();
  var password = document.getElementById('enroll-account-password').value;
  if (!validatePassword(password))
    return;

  Accounts.resetPassword(
    loginButtonsSession.get('enrollAccountToken'), password,
    function (error) {
      if (error) {
        loginButtonsSession.errorMessage(error.reason || "Unknown error");
      } else {
        loginButtonsSession.set('enrollAccountToken', null);
        if (doneCallback)
          doneCallback();
      }
    });
};

Template._enrollAccountDialog.helpers({
  inEnrollAccountFlow: function () {
    return loginButtonsSession.get('enrollAccountToken');
  }
});


//
// justVerifiedEmailDialog template
//

Template._justVerifiedEmailDialog.events({
  'click #just-verified-dismiss-button': function () {
    loginButtonsSession.set('justVerifiedEmail', false);
  }
});

Template._justVerifiedEmailDialog.helpers({
  visible: function () {
    return loginButtonsSession.get('justVerifiedEmail');
  },
  displayName: displayName
});


//
// loginButtonsMessagesDialog template
//

Template._loginButtonsMessagesDialog.events({
  'click #messages-dialog-dismiss-button': function () {
    loginButtonsSession.resetMessages();
  }
});

Template._loginButtonsMessagesDialog.helpers({
  visible: function () {
    var hasMessage = loginButtonsSession.get('infoMessage') || loginButtonsSession.get('errorMessage');
    return !dropdown() && hasMessage;
  }
});


//
// configureLoginServiceDialog template
//

Template._configureLoginServiceDialog.events({
  'click .configure-login-service-dismiss-button': function () {
    loginButtonsSession.set('configureLoginServiceDialogVisible', false);
  },
  'click #configure-login-service-dialog-save-configuration': function () {
    if (loginButtonsSession.get('configureLoginServiceDialogVisible') &&
        ! loginButtonsSession.get('configureLoginServiceDialogSaveDisabled')) {
      // Prepare the configuration document for this login service
      var serviceName = loginButtonsSession.get('configureLoginServiceDialogServiceName');
      var configuration = {
        service: serviceName
      };

      // Fetch the value of each input field
      _.each(configurationFields(), function(field) {
        configuration[field.property] = document.getElementById(
          'configure-login-service-dialog-' + field.property).value
          .replace(/^\s*|\s*$/g, ""); // trim() doesnt work on IE8;
      });

      Array.prototype.some.call(
        document.getElementById("configure-login-service-dialog")
          .getElementsByTagName("input"),
        function (input) {
          if (input.getAttribute("name") === "loginStyle" &&
              input.checked) {
            configuration.loginStyle = input.value;
            return true;
          }
        }
      );

      // Configure this login service
      Accounts.connection.call(
        "configureLoginService", configuration, function (error, result) {
          if (error)
            Meteor._debug("Error configuring login service " + serviceName,
                          error);
          else
            loginButtonsSession.set('configureLoginServiceDialogVisible',
                                    false);
        });
    }
  },
  // IE8 doesn't support the 'input' event, so we'll run this on the keyup as
  // well. (Keeping the 'input' event means that this also fires when you use
  // the mouse to change the contents of the field, eg 'Cut' menu item.)
  'input, keyup input': function (event) {
    // if the event fired on one of the configuration input fields,
    // check whether we should enable the 'save configuration' button
    if (event.target.id.indexOf('configure-login-service-dialog') === 0)
      updateSaveDisabled();
  }
});

// check whether the 'save configuration' button should be enabled.
// this is a really strange way to implement this and a Forms
// Abstraction would make all of this reactive, and simpler.
var updateSaveDisabled = function () {
  var anyFieldEmpty = _.any(configurationFields(), function(field) {
    return document.getElementById(
      'configure-login-service-dialog-' + field.property).value === '';
  });

  loginButtonsSession.set('configureLoginServiceDialogSaveDisabled', anyFieldEmpty);
};

// Returns the appropriate template for this login service.  This
// template should be defined in the service's package
Template._configureLoginServiceDialog.templateForService = function(serviceName) {
  serviceName = serviceName || loginButtonsSession.get('configureLoginServiceDialogServiceName');
  // XXX Service providers should be able to specify their configuration
  // template name.
  return Template['configureLoginServiceDialogFor' +
                  (serviceName === 'meteor-developer' ?
                   'MeteorDeveloper' :
                   capitalize(serviceName))];
};

var configurationFields = function () {
  var template = Template._configureLoginServiceDialog.templateForService();
  return template.fields();
};

Template._configureLoginServiceDialog.helpers({
  configurationFields: function () {
    return configurationFields();
  },
  visible: function () {
    return loginButtonsSession.get('configureLoginServiceDialogVisible');
  },
  configurationSteps: function () {
    // renders the appropriate template
    return Template._configureLoginServiceDialog.templateForService();
  },
  saveDisabled: function () {
    return loginButtonsSession.get('configureLoginServiceDialogSaveDisabled');
  }
});

// XXX from http://epeli.github.com/underscore.string/lib/underscore.string.js
var capitalize = function(str){
  str = str == null ? '' : String(str);
  return str.charAt(0).toUpperCase() + str.slice(1);
};

Template._configureLoginOnDesktopDialog.helpers({
  visible: function () {
    return loginButtonsSession.get('configureOnDesktopVisible');
  }
});

Template._configureLoginOnDesktopDialog.events({
  'click #configure-on-desktop-dismiss-button': function () {
    loginButtonsSession.set('configureOnDesktopVisible', false);
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("accounts-ui-unstyled");

})();
