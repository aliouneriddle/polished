"use strict";

var auth = firebase.auth();

var auth_main = function auth_main(ns_prefix) {
  var send_token_to_shiny = function send_token_to_shiny(user) {
    return user.getIdToken(true).then(function (firebase_token) {
      var polished_cookie = "p" + Math.random();
      Cookies.set('polished', polished_cookie, {
        expires: 365
      } // set cookie to expire in 1 year
      );
      Shiny.setInputValue("".concat(ns_prefix, "check_jwt"), {
        jwt: firebase_token,
        cookie: polished_cookie
      }, {
        event: "priority"
      });
    });
  };

  var sign_in = function sign_in(email, password) {
    var polished_cookie = "p" + Math.random();
    Cookies.set('polished', polished_cookie, {
      expires: 365
    } // set cookie to expire in 1 year
    );
    Shiny.setInputValue("".concat(ns_prefix, "check_jwt"), {
      email: email,
      password: password,
      cookie: polished_cookie
    }, {
      event: "priority"
    });
  };

  $(document).on("click", "#".concat(ns_prefix, "register_submit"), function () {
    var email = $("#".concat(ns_prefix, "register_email")).val().toLowerCase();
    var password = $("#".concat(ns_prefix, "register_password")).val();
    var password_2 = $("#".concat(ns_prefix, "register_password_verify")).val();

    if (password !== password_2) {
      // Event to reset Register loading button from loading state back to ready state
      loadingButtons.resetLoading("".concat(ns_prefix, "register_submit"));
      toastr.error("The passwords do not match", null, toast_options);
      console.log("the passwords do not match");
      return;
    }

    var polished_cookie = "p" + Math.random();
    Cookies.set('polished', polished_cookie, {
      expires: 365
    } // set cookie to expire in 1 year
    );
    Shiny.setInputValue("".concat(ns_prefix, "register_js"), {
      email: email,
      password: password,
      cookie: polished_cookie
    }, {
      event: "priority"
    });
  });
  $(document).on("click", "#".concat(ns_prefix, "sign_in_submit"), function () {
    var email = $("#".concat(ns_prefix, "sign_in_email")).val().toLowerCase();
    var password = $("#".concat(ns_prefix, "sign_in_password")).val();
    debugger;
    sign_in(email, password);
  }); // Google Sign In

  var provider_google = new firebase.auth.GoogleAuthProvider();
  $(document).on("click", "#".concat(ns_prefix, "sign_in_with_google"), function () {
    auth.signInWithPopup(provider_google).then(function (result) {
      return send_token_to_shiny(result.user);
    })["catch"](function (err) {
      console.log(err);
      toastr.error("Sign in Error: ".concat(err.message), null, toast_options);
    });
  }); // Microsoft Sign In

  var provider_microsoft = new firebase.auth.OAuthProvider('microsoft.com');
  $(document).on("click", "#".concat(ns_prefix, "sign_in_with_microsoft"), function () {
    auth.signInWithPopup(provider_microsoft).then(function (result) {
      return send_token_to_shiny(result.user);
    })["catch"](function (err) {
      console.log(err);
      toastr.error("Sign in Error: ".concat(err.message), null, toast_options);
    });
  }); // Facebook Sign In

  var provider_facebook = new firebase.auth.FacebookAuthProvider();
  $(document).on("click", "#".concat(ns_prefix, "sign_in_with_facebook"), function () {
    auth.signInWithPopup(provider_facebook).then(function (result) {
      return send_token_to_shiny(result.user);
    })["catch"](function (err) {
      console.log(err);
      toastr.error("Sign in Error: ".concat(err.message), null, toast_options);
    });
  });
};