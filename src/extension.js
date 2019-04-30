"use strict";

const jQuery = require("jquery");
const $ = jQuery;
const GmailFactory = require("gmail-js");
const gmail = new GmailFactory.Gmail($);

window.gmail = gmail;

const saveCounts = function() {
  alert("saving counts");
};

gmail.observe.on("load", () => {
  const userEmail = gmail.get.user_email();
  const is_new_ui = gmail.check.is_new_gui();

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
});
gmail.observe.on("new_email", function(id, url, body, xhr) {
  console.log("New Mail Arrived....................");
  console.log("body");
  console.log(body);
});

gmail.observe.on("send_message", () => {
  console.log("MAIL SENT ..........");
});
// gmail.observe.on("recipient_change", function(match, recipients) {
//   console.log("recipients changed", match, recipients);
// });
// alert("updated");

gmail.observe.on("view_email", domEmail => {
  // console.log("Looking at email:", domEmail);
  console.log("VIEW MAIL..................");
  const emailData = gmail.new.get.email_data(domEmail);
  console.log("Email data:", emailData);

  const emailDataToSend = {
    subject: emailData.subject,
    from: emailData.from,
    to: emailData.to,
    timestamp: emailData.timestamp
  };

  $.ajax({
    url: "https://8dfd9e19.ngrok.io/mails",
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
      console.log("failure=============");
      console.log(errorThrown);
    }
  });
});
