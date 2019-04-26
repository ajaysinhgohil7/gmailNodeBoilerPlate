"use strict";

const jQuery = require("jquery");
const $ = jQuery;
const GmailFactory = require("gmail-js");
const gmail = new GmailFactory.Gmail($);

window.gmail = gmail;

const saveCounts = function() {
  alert("saving counts");
};

document.addEventListener("DOMContentLoaded", function() {
  var checkPageButton = document.getElementById("saveCountBtn");
  checkPageButton.addEventListener("click", () => {
    saveCounts();
  });
});

gmail.observe.on("load", () => {
  const userEmail = gmail.get.user_email();
  const is_new_ui = gmail.check.is_new_gui();
  console.log("Hello, " + userEmail + ". This is your extension talking!");
  if (is_new_ui) {
    console.log("You are using Gmail 2018");
  } else {
    console.log("You are using Old Gmails");
  }
  console.log("ASDASDASDDSAS");
  console.log("Unread All = ", gmail.get.unread_emails());
  console.log("unread_inbox_emails = " + gmail.get.unread_inbox_emails());
  //   console.log("unread_draft_emails = " + gmail.get.unread_draft_emails());
  //   console.log("unread_spam_emails = " + gmail.get.unread_spam_emails());
  //   console.log("unread_forum_emails = " + gmail.get.unread_forum_emails());
  //   console.log("unread_update_emails = " + gmail.get.unread_update_emails());
  //   console.log(
  //     "unread_promotion_emails = " + gmail.get.unread_promotion_emails()
  //   );
  //   console.log("unread_social_emails = " + gmail.get.unread_social_emails());
  //   console.log("gmail.get.last_active = " + gmail.get.last_active());
  //   }, 6000);
  //   View Email
  gmail.observe.on("view_email", domEmail => {
    // console.log("Looking at email:", domEmail);
    console.log("VIEW MAIL..................");
    const emailData = gmail.new.get.email_data(domEmail);
    console.log("Email data:", emailData);

    const emailDataToSend = {
      subject: emailData.subject,
      from: emailData.from,
      to: emailData.to
    };
    // date: emailData.date

    $.ajax({
      url: "https://ede260eb.ngrok.io/mails",
      dataType: "json",
      type: "post",
      crossDomain: true,
      contentType: "application/json",
      data: JSON.stringify(emailDataToSend),
      processData: false,
      success: function(data, textStatus, jQxhr) {
        console.log("success");
        console.log(data);
      },
      error: function(jqXhr, textStatus, errorThrown) {
        console.log("failure");
        console.log(errorThrown);
      }
    });
  });

  // Any CRUD happends on mail
  gmail.observe.on("http_event", function(params) {
    console.log(params.method);
    console.log("url data:", params);
  });

  //  when mail is read
  gmail.observe.on("read", function(id, url, body, xhr) {
    console.log("READING....................");
    console.log("id:", id, "url:", url, "body", body, "xhr", xhr);
  });

  // when mail is delete
  gmail.observe.on("delete", function(id, url, body, xhr) {
    console.log("DELETING....................");
    console.log("id:", id, "url:", url, "body", body, "xhr", xhr);
  });

  // when mail is starred
  gmail.observe.on("star", function(id, url, body, xhr) {
    console.log("STARRING....................");
    console.log("id:", id, "url:", url, "body", body, "xhr", xhr);
  });

  gmail.observe.on("unstar", function(id, url, body, xhr) {
    console.log("UNSTARRING....................");
    console.log("id:", id, "url:", url, "body", body, "xhr", xhr);
  });

  gmail.observe.on("poll", function(url, body, data, xhr) {
    console.log("POLLING....................");
    console.log("url:", url, "body", body, "data", data, "xhr", xhr);
  });

  gmail.observe.on("new_email", function(id, url, body, xhr) {
    console.log("New Mail Arrived....................");
    console.log("id:", id, "url:", url, "body", body, "xhr", xhr);
  });

  gmail.observe.on("refresh", function(url, body, data, xhr) {
    console.log("Refreshings....................");
    console.log("url:", url, "body", body, "data", data, "xhr", xhr);
  });

  gmail.observe.on("open_email", function(id, url, body, xhr) {
    console.log("Opening Mail....................");
    console.log("id:", id, "url:", url, "body", body, "xhr", xhr);
    console.log(gmail.get.email_data(id));
  });

  gmail.observe.on("compose", () => {
    console.log("COMPOSING............");
  });
});
