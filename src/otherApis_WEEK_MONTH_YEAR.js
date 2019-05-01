// ====================Weekly====================

// Hitting Apis for Daily Counts
function getWeeklyCheckedMailCount() {
  $.get(serverURL + "/mails/weeklyChecked", function(data, status) {
    console.log("weeklyCheckedMailCount");
    console.log(data.mailCount);
    document.getElementById("weeklyCheckedMailCountLabel").innerText =
      data.mailCount;
  });
}
function getWeeklySentMailCount() {
  $.get(serverURL + "/mails/weeklySent", function(data, status) {
    console.log("weeklySentMailCountLabel");
    console.log(data.mailCount);
    document.getElementById("weeklySentMailCountLabel").innerText =
      data.mailCount;
  });
}
function getWeeklyReceivedMailCount() {
  $.get(serverURL + "/mails/weeklyReceived", function(data, status) {
    console.log("weeklyReceivcedMailCountLabel");
    console.log(data.mailCount);
    document.getElementById("weeklyReceivedMailCountLabel").innerText =
      data.mailCount;
  });
}

// ====================Weekly====================

// ====================Monthly====================

// Hitting Apis for Daily Counts
function getMonthlyCheckedMailCount() {
  $.get(serverURL + "/mails/monthlyChecked", function(data, status) {
    console.log("monthlyCheckedMailCount");
    console.log(data.mailCount);
    document.getElementById("monthlyCheckedMailCountLabel").innerText =
      data.mailCount;
  });
}
function getMonthlySentMailCount() {
  $.get(serverURL + "/mails/monthlySent", function(data, status) {
    console.log("monthlySentMailCountLabel");
    console.log(data.mailCount);
    document.getElementById("monthlySentMailCountLabel").innerText =
      data.mailCount;
  });
}
function getMonthlyReceivedMailCount() {
  $.get(serverURL + "/mails/monthlyReceived", function(data, status) {
    console.log("monthlyReceivcedMailCountLabel");
    console.log(data.mailCount);
    document.getElementById("monthlyReceivedMailCountLabel").innerText =
      data.mailCount;
  });
}

// ====================Monthly====================

// ====================Yearly====================

// Hitting Apis for Daily Counts
function getYearlyCheckedMailCount() {
  $.get(serverURL + "/mails/yearlyChecked", function(data, status) {
    console.log("yearlyCheckedMailCount");
    console.log(data.mailCount);
    document.getElementById("yearlyCheckedMailCountLabel").innerText =
      data.mailCount;
  });
}
function getYearlySentMailCount() {
  $.get(serverURL + "/mails/yearlySent", function(data, status) {
    console.log("yearlySentMailCountLabel");
    console.log(data.mailCount);
    document.getElementById("yearlySentMailCountLabel").innerText =
      data.mailCount;
  });
}
function getYearlyReceivedMailCount() {
  $.get(serverURL + "/mails/yearlyReceived", function(data, status) {
    console.log("yearlyReceivcedMailCountLabel");
    console.log(data.mailCount);
    document.getElementById("yearlyReceivedMailCountLabel").innerText =
      data.mailCount;
  });
}

// ====================Yearly====================
