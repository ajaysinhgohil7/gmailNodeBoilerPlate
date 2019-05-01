"use strict";

const jQuery = require("jquery");
const $ = jQuery;
const GmailFactory = require("gmail-js");
const gmail = new GmailFactory.Gmail($);

window.gmail = gmail;
const serverURL = "https://74cabbbf.ngrok.io";
let dailyCheckedMailCountPieChart = 0;
let dailySentMailCountPieChart = 0;
let dailyReceivedMailCountPieChart = 0;

var div1 = document.createElement("div");
div1.id = "mainDiv";

(document.body || document.documentElement).appendChild(div1);

//<a class="expandHandle" href="javascript:void(0)"><i class="fa fa-line-chart" aria-hidden="true"></i></a>
$("body").append(
  `<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" type="text/css">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" type="text/css">
  <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>`
);
$("#mainDiv").append(
  `
  <a class="expandHandle" href="javascript:void(0)"><i class="fa fa-line-chart" aria-hidden="true"></i></a>
  <div class="headerWrap">
    <div class="container-fluid header">

      <div class="row">
        <div class="col-lg-6">
          <div class="title">
            Emailytics
          </div>
        </div>

        <div class="col-lg-6">
          
          <ul class="nav nav-pills pull-right" id="myPill2">

            <li role="presentation" class="active"><a data-target="#eee" data-toggle="tab" role="tab">Home</a></li>
            <li role="presentation"><a data-target="#fff" data-toggle="tab" role="tab">About</a></li>
            <li role="presentation"><a data-target="#ggg" data-toggle="tab" role="tab">settings</a></li>


            <li> 
              <a href="">
                <span class="user"> 
                  <i class="fa fa-user"></i>
                </span> 
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

<div class="tab-content" id="pills2"> 
  <div class="tab-pane active" id="eee" role="tabpanel">
    <div class="tabPanel">
      <div class="container homeTabs">
      <div class="row tabNav">
        <div class="col-lg-6">

          <ul class="nav nav-pills" id="myPill">
            <li role="presentation" class="active"><a data-target="#aaa" data-toggle="tab" role="tab">Daily</a></li>
            <li role="presentation"><a data-target="#bbb" data-toggle="tab" role="tab">Weekly</a></li>
            <li role="presentation"><a data-target="#ccc" data-toggle="tab" role="tab">Monthly</a></li>
            <li role="presentation"><a data-target="#ddd" data-toggle="tab" role="tab">Yearly</a></li>
            <li role="presentation" class="absolute">
              <a data-target="#hhh" data-toggle="tab" role="tab">absolute</a>
            </li>
          </ul>
        </div>

        <div class="col-lg-6">

          Date:
          
        </div>
      </div>
    </div>

    <div class="mainDiv">


      <div class="tab-content" id="pills"> 
        <div class="tab-pane active" id="aaa" role="tabpanel">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="info">
                  <div class="row">
                    <div class="col-lg-4">

                      <div class="gmail checked">
                        <i class="fa fa-google" aria-hidden="true"></i>
                        <p> Gmail checked in a day</p>
                        <div id="dailyCheckedMailCountLabel" class="count">
                          0
                        </div>
                      </div>
                    </div>

                    <div class="col-lg-4">
                      <div class="gmail sent">
                        <i class="fa fa-paper-plane" aria-hidden="true"></i>
                        <p> Email sent in a day</p>
                        <div id="dailySentMailCountLabel" class="count">
                          0
                        </div>
                      </div>
                    </div>
                    
                    <div class="col-lg-4">
                      <div class="gmail received">
                        <i class="fa fa-envelope" aria-hidden="true"></i>
                        <p> Email received in a day</p>
                        <div id="dailyReceivedMailCountLabel" class="count">
                          0
                        </div>
                      </div>
                    </div>    
                  </div>
                </div>
              </div>
            </div>


            <div class="row">
              <div class="col-lg-12">
                <div class="lineGraph">
                  <div class="row emailSent">
                    <div class="col-lg-4 legends">
                      <i class="fa fa-square sentSquare" aria-hidden="true"></i> <span> Sent</span>
                      <i class="fa fa-square receivedSquare" aria-hidden="true"></i> <span> Received </span>
                    </div>
                    <div class="col-lg-4">
                      <h2>
                        Email <span class="emailAction"> sent </span> by hour
                      </h2>
                    </div>
                    <div class=" col-lg-4">
                      <select class= "dropMenu">
                        <option value="sent">sent</option>
                        <option value="received">received</option>
                      </select>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-lg-12 graphDisplay">
                      Graph 
                    </div>
                  </div>
                </div>
              </div>
            </div>

            
            <div id="dailyCheckedMailPieChart" class="row pieChart">
              <div class="col-lg-6 ">
                <div id="dailyMailPieChartCanvasDiv" class="category">
                  <h2>
                    Email By Category
                  </h2>
                </div>
              </div>

              <div class="col-lg-6 ">
                <div class="emailReplied">
                  <h2>
                    Email Replied
                  </h2>
                  <div class="clearfix emailRepliedPane">
                    <div>
                      <div class="pull-left">
                        <div class="number">
                          60
                        </div>

                        <div class="fixText">
                          Sent
                        </div>
                      </div>
                    </div>

                    <div>
                      <div class="pull-right"> 
                        <div class="number">
                          20                        
                        </div>

                        <div class="fixText">
                          Replied
                        </div>
                      </div>
                    </div>

                    <div>
                      <div class="pull-left">
                        <div class="number"> 
                          100                     
                        </div>

                        <div class="fixText">
                          Received
                        </div>
                      </div>
                    </div>

                    <div>
                      <div class="pull-right"> 
                        <div class="number">
                          20                        
                        </div>

                        <div class="fixText">
                          Replied
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row pieChart2">
              <div class="col-lg-6">
                <div class="readAndUnread">
                  <h2>
                    Read & Unread Emails
                  </h2>
                </div>
              </div>

              <div class="col-lg-6">
                <div class="col-lg-12 averageResponse">
                  <h2>
                    Average Response Time
                  </h2>
                </div>
                
                <div class="col-lg-12 delayedResponse">
                  <h2>
                    Most Delayed Response
                  </h2>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-12">
                <div class="mostContactedPeople">
                  <h2>
                    Most Contaced People
                  </h2>
                  <div class="col-lg-4 commonHeading">
                    Email address
                  </div>
                  <div class="col-lg-4 commonHeading">
                    Message
                  </div>
                  <div class="col-lg-4 commonHeading">
                    Response Time
                  </div>

                  <div class="row">

                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- weekly tab -->
        <div class="tab-pane" id="bbb" role="tabpanel">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="info">
                  <div class="row">
                    <div class="col-lg-4">

                      <div class="gmail checked">
                        <i class="fa fa-google" aria-hidden="true"></i>
                        <p> Gmail checked per week</p>
                        <div class="count">
                          70
                        </div>
                      </div>
                    </div>

                    <div class="col-lg-4">
                      <div class="gmail sent">
                        <i class="fa fa-paper-plane" aria-hidden="true"></i>
                        <p> Email sent per week</p>
                        <div class="count">
                          70
                        </div>
                      </div>
                    </div>
                    
                    <div class="col-lg-4">
                      <div class="gmail received">
                        <i class="fa fa-envelope" aria-hidden="true"></i>
                        <p> Email received per week</p>
                        <div class="count">
                          70
                        </div>
                      </div>
                    </div>    
                  </div>
                </div>
              </div>
            </div>


            <div class="row">
              <div class="col-lg-12">
                <div class="lineGraph">
                  <div class="row emailSent">
                    <div class="col-lg-4 legends">
                      <i class="fa fa-square sentSquare" aria-hidden="true"></i> <span> Sent</span>
                      <i class="fa fa-square receivedSquare" aria-hidden="true"></i> <span> Received </span>
                    </div>
                    <div class="col-lg-4">
                      <h2>
                        Email <span class="emailAction"> sent </span> per day
                      </h2>
                    </div>
                    <div class=" col-lg-4">
                      <select class= "dropMenu">
                        <option value="sent">sent</option>
                        <option value="received">received</option>
                      </select>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-lg-12 graphDisplay">
                      Graph 
                    </div>
                  </div>
                </div>
              </div>
            </div>

            
            <div class="row pieChart">
              <div class="col-lg-6 ">
                <div class="category">
                  <h2>
                    Email By Category
                  </h2>
                </div>
              </div>

              <div class="col-lg-6 ">
                <div class="emailReplied">
                  <h2>
                    Email Replied
                  </h2>
                  <div class="clearfix emailRepliedPane">
                    <div>
                      <div class="pull-left">
                        <div class="number">
                          60
                        </div>

                        <div class="fixText">
                          Sent
                        </div>
                      </div>
                    </div>

                    <div>
                      <div class="pull-right"> 
                        <div class="number">
                          20                        
                        </div>

                        <div class="fixText">
                          Replied
                        </div>
                      </div>
                    </div>

                    <div>
                      <div class="pull-left">
                        <div class="number"> 
                          100                     
                        </div>

                        <div class="fixText">
                          Received
                        </div>
                      </div>
                    </div>

                    <div>
                      <div class="pull-right"> 
                        <div class="number">
                          20                        
                        </div>

                        <div class="fixText">
                          Replied
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row pieChart2">
              <div class="col-lg-6">
                <div class="readAndUnread">
                  <h2>
                    Read & Unread Emails
                  </h2>
                </div>
              </div>

              <div class="col-lg-6">
                <div class="col-lg-12 averageResponse">
                  <h2>
                    Average Response Time
                  </h2>
                </div>
                
                <div class="col-lg-12 delayedResponse">
                  <h2>
                    Most Delayed Response
                  </h2>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-12">
                <div class="mostContactedPeople">
                  <h2>
                    Most Contaced People
                  </h2>
                  <div class="col-lg-4 commonHeading">
                    Email address
                  </div>
                  <div class="col-lg-4 commonHeading">
                    Message
                  </div>
                  <div class="col-lg-4 commonHeading">
                    Response Time
                  </div>

                  <div class="row">

                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Monthly Report -->
        <div class="tab-pane" id="ccc" role="tabpanel">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="info">
                  <div class="row">
                    <div class="col-lg-4">

                      <div class="gmail checked">
                        <i class="fa fa-google" aria-hidden="true"></i>
                        <p> Gmail checked per month</p>
                        <div class="count">
                          70
                        </div>
                      </div>
                    </div>

                    <div class="col-lg-4">
                      <div class="gmail sent">
                        <i class="fa fa-paper-plane" aria-hidden="true"></i>
                        <p> Email sent per month</p>
                        <div class="count">
                          70
                        </div>
                      </div>
                    </div>
                    
                    <div class="col-lg-4">
                      <div class="gmail received">
                        <i class="fa fa-envelope" aria-hidden="true"></i>
                        <p> Email received per month</p>
                        <div class="count">
                          70
                        </div>
                      </div>
                    </div>    
                  </div>
                </div>
              </div>
            </div>


            <div class="row">
              <div class="col-lg-12">
                <div class="lineGraph">
                  <div class="row emailSent">
                    <div class="col-lg-4 legends">
                      <i class="fa fa-square sentSquare" aria-hidden="true"></i> <span> Sent</span>
                      <i class="fa fa-square receivedSquare" aria-hidden="true"></i> <span> Received </span>
                    </div>
                    <div class="col-lg-4">
                      <h2>
                        Email <span class="emailAction"> sent </span> per month
                      </h2>
                    </div>
                    <div class=" col-lg-4">
                      <select class="dropMenu">
                        <option value="sent">sent</option>
                        <option value="received">received</option>
                      </select>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-lg-12 graphDisplay">
                      Graph 
                    </div>
                  </div>
                </div>
              </div>
            </div>

            
            <div class="row pieChart">
              <div class="col-lg-6 ">
                <div class="category">
                  <h2>
                    Email By Category
                  </h2>
                </div>
              </div>

              <div class="col-lg-6 ">
                <div class="emailReplied">
                  <h2>
                    Email Replied
                  </h2>
                  <div class="clearfix emailRepliedPane">
                    <div>
                      <div class="pull-left">
                        <div class="number">
                          60
                        </div>

                        <div class="fixText">
                          Sent
                        </div>
                      </div>
                    </div>

                    <div>
                      <div class="pull-right"> 
                        <div class="number">
                          20                        
                        </div>

                        <div class="fixText">
                          Replied
                        </div>
                      </div>
                    </div>

                    <div>
                      <div class="pull-left">
                        <div class="number"> 
                          100                     
                        </div>

                        <div class="fixText">
                          Received
                        </div>
                      </div>
                    </div>

                    <div>
                      <div class="pull-right"> 
                        <div class="number">
                          20                        
                        </div>

                        <div class="fixText">
                          Replied
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row pieChart2">
              <div class="col-lg-6">
                <div class="readAndUnread">
                  <h2>
                    Read & Unread Emails
                  </h2>
                </div>
              </div>

              <div class="col-lg-6">
                <div class="col-lg-12 averageResponse">
                  <h2>
                    Average Response Time
                  </h2>
                </div>
                
                <div class="col-lg-12 delayedResponse">
                  <h2>
                    Most Delayed Response
                  </h2>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-12">
                <div class="mostContactedPeople">
                  <h2>
                    Most Contaced People
                  </h2>
                  <div class="col-lg-4 commonHeading">
                    Email address
                  </div>
                  <div class="col-lg-4 commonHeading">
                    Message
                  </div>
                  <div class="col-lg-4 commonHeading">
                    Response Time
                  </div>

                  <div class="row">

                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Yearly Report -->
        <div class="tab-pane" id="ddd" role="tabpanel">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="info">
                  <div class="row">
                    <div class="col-lg-4">

                      <div class="gmail checked">
                        <i class="fa fa-google" aria-hidden="true"></i>
                        <p> Gmail checked per year</p>
                        <div class="count">
                          70
                        </div>
                      </div>
                    </div>

                    <div class="col-lg-4">
                      <div class="gmail sent">
                        <i class="fa fa-paper-plane" aria-hidden="true"></i>
                        <p> Email sent per year</p>
                        <div class="count">
                          70
                        </div>
                      </div>
                    </div>
                    
                    <div class="col-lg-4">
                      <div class="gmail received">
                        <i class="fa fa-envelope" aria-hidden="true"></i>
                        <p> Email received per year</p>
                        <div class="count">
                          70
                        </div>
                      </div>
                    </div>    
                  </div>
                </div>
              </div>
            </div>


            <div class="row">
              <div class="col-lg-12">
                <div class="lineGraph">
                  <div class="row emailSent">
                    <div class="col-lg-4 legends">
                      <i class="fa fa-square sentSquare" aria-hidden="true"></i> <span> Sent</span>
                      <i class="fa fa-square receivedSquare" aria-hidden="true"></i> <span> Received </span>
                    </div>
                    <div class="col-lg-4">
                      <h2>
                        Email <span class="emailAction"> sent </span> per year
                      </h2>
                    </div>
                    <div class="col-lg-4">
                      <select class= "dropMenu">
                        <option value="sent">sent</option>
                        <option value="received">received</option>
                      </select>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-lg-12 graphDisplay">
                      Graph 
                    </div>
                  </div>
                </div>
              </div>
            </div>

            
            <div class="row pieChart">
              <div class="col-lg-6 ">
                <div class="category">
                  <h2>
                    Email By Category
                  </h2>
                </div>
              </div>

              <div class="col-lg-6 ">
                <div class="emailReplied">
                  <h2>
                    Email Replied
                  </h2>
                  <div class="clearfix emailRepliedPane">
                    <div>
                      <div class="pull-left">
                        <div class="number">
                          60
                        </div>

                        <div class="fixText">
                          Sent
                        </div>
                      </div>
                    </div>

                    <div>
                      <div class="pull-right"> 
                        <div class="number">
                          20                        
                        </div>

                        <div class="fixText">
                          Replied
                        </div>
                      </div>
                    </div>

                    <div>
                      <div class="pull-left">
                        <div class="number"> 
                          100                     
                        </div>

                        <div class="fixText">
                          Received
                        </div>
                      </div>
                    </div>

                    <div>
                      <div class="pull-right"> 
                        <div class="number">
                          20                        
                        </div>

                        <div class="fixText">
                          Replied
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row pieChart2">
              <div class="col-lg-6">
                <div class="readAndUnread">
                  <h2>
                    Read & Unread Emails
                  </h2>
                </div>
              </div>

              <div class="col-lg-6">
                <div class="col-lg-12 averageResponse">
                  <h2>
                    Average Response Time
                  </h2>
                </div>
                
                <div class="col-lg-12 delayedResponse">
                  <h2>
                    Most Delayed Response
                  </h2>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-12">
                <div class="mostContactedPeople">
                  <h2>
                    Most Contaced People
                  </h2>
                  <div class="col-lg-4 commonHeading">
                    Email address
                  </div>
                  <div class="col-lg-4 commonHeading">
                    Message
                  </div>
                  <div class="col-lg-4 commonHeading">
                    Response Time
                  </div>

                  <div class="row">

                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="tab-pane" id="hhh" role="tabpanel">
          <div class="dateWise">
            <div class="dateWiseDesc">Absolute</div>
            <div class="absoluteBox clearfix">
                <div class="absDate fromDate">
                <div class="dateCaption">From</div>
                  <input type="text" class="form-control">
                </div>
                <div class="absDate toDate">
                <div class="dateCaption">To</div>
                  <input type="text" class="form-control">
                </div>
                <div class="absDate">
                  <input class="btn btn-primary" type="button" value="Submit" />
                </div>
              </div>
          </div>
        </div>


      </div>

    </div>

    </div>
  </div>

  <div class="tab-pane" id="fff" role="tabpanel"> 
  <div class="tabPanel">
      <div class="about">
        <h2>About<h2>
      </div>
    </div>
  </div>

  <div class="tab-pane" id="ggg" role="tabpanel"> 
  <div class="tabPanel">
    <div class="settings">
      <h2>Settings</h2>
      <div class="settingsContent">
        <div class="dailyReport container">
            <div class="row">
              <div class="col-lg-10">
                <p class="heading"> Daily Report </p>
                <p class="description"> (By turning this off user will not get daily report of the gmail usage) </p> 
              </div>
              <div class="col-lg-2 toggleButton">
                <label class="switch">
                  <input type="checkbox" checked>
                  <span class="slider round"></span>
                </label>
              </div>
            </div>
          </div>

          <div class="weeklyReport container">
            <div class="row">
              <div class="col-lg-10">
                <p class="heading"> Weekly Report </p>
                <p class="description"> (By turning this off user will not get weekly report of the gmail usage) </p> 
              </div>
              <div class="col-lg-2 toggleButton">
                <label class="switch">
                  <input type="checkbox" checked>
                  <span class="slider round"></span>
                </label>
              </div>
            </div>
          </div>


          <div class="monthlyReport container">
            <div class="row">
              <div class="col-lg-10">
                <p class="heading"> Monthly Report </p>
                <p class="description"> (By turning this off user will not get monthly report of the gmail usage) </p> 
              </div>
              <div class="col-lg-2 toggleButton">
                <label class="switch">
                  <input type="checkbox" checked>
                  <span class="slider round"></span>
                </label>
              </div>
            </div>
          </div>

          <div class="yearlyReport container">
            <div class="row">
              <div class="col-lg-10">
                <p class="heading"> Yearly Report </p>
                <p class="description"> (By turning this off user will not get yearly report of the gmail usage) </p> 
              </div>
              <div class="col-lg-2 toggleButton">
                <label class="switch">
                  <input type="checkbox" checked>
                  <span class="slider round"></span>
                </label>
              </div>
            </div>
          </div>
      
          <div class="stop container">
            <div class="row">
              <div class="col-lg-10">
                <p class="heading"> Stop </p>
                <p class="description"> (By turning this off user will not be able to get analytics report of gmail activities) </p> 
              </div>
              <div class="col-lg-2 toggleButton">
                <label class="switch">
                  <input type="checkbox" checked>
                  <span class="slider round"></span>
                </label>
              </div>
            </div>
          </div>
        </div>        
      </div>
    </div>
  </div>
</div>

<div id="demo">
</div>
`
);

$(".nav-pill li a").click(function() {
  $(".nav-pill li").removeClass("active");
  $(this)
    .parent("li")
    .addClass("active");
  var activeTab = $(this).attr("data-target");
  $(".tab-content .tab-pane").removeClass("active");
  $(activeTab).show();
});

$(".expandHandle").click(function() {
  $(this)
    .parent("#mainDiv")
    .toggleClass("expanded");
});

$(".dropMenu").change(function() {
  $(".emailAction").html($(this).val());
});

// Command for get port for listening like 3000
// lsof -i -P -n | grep LISTEN

// ====================Daily====================
function getDailyCheckedMailCount() {
  return new Promise((resolve, reject) => {
    $.get(serverURL + "/mails/dailyChecked", function(data, status) {
      console.log("dailyCheckedMailCount");
      console.log(data.mailCount);
      document.getElementById("dailyCheckedMailCountLabel").innerText =
        data.mailCount;
      // dailyCheckedMailCountPieChart = data.mailCount;
      return resolve(data.mailCount);
    });
  });
}
function getDailySentMailCount() {
  return new Promise((resolve, reject) => {
    $.get(serverURL + "/mails/dailySent", function(data, status) {
      console.log("dailySentMailCountLabel");
      console.log(data.mailCount);
      document.getElementById("dailySentMailCountLabel").innerText =
        data.mailCount;
      return resolve(data.mailCount);
    });
  });
}
function getDailyReceivedMailCount() {
  return new Promise((resolve, reject) => {
    $.get(serverURL + "/mails/dailyReceived", function(data, status) {
      console.log("dailyReceivcedMailCountLabel");
      console.log(data.mailCount);
      document.getElementById("dailyReceivedMailCountLabel").innerText =
        data.mailCount;
      return resolve(data.mailCount);
    });
  });
}
// ====================Daily====================

// // DONE checked saved ============================

gmail.observe.on("view_email", domEmail => {
  // console.log("Looking at email:", domEmail);
  console.log("VIEW MAIL..................");
  const emailData = gmail.new.get.email_data(domEmail);
  console.log("Email data:", emailData);

  const emailDataToSend = {
    userMailId: gmail.get.user_email(),
    mailId: emailData.id,
    subject: emailData.subject,
    from: emailData.from,
    to: emailData.to,
    timestamp: parseInt(emailData.timestamp),
    timestampChecked: parseInt(Date.now())
  };

  $.ajax({
    url: serverURL + "/mails/checked",
    dataType: "json",
    type: "post",
    crossDomain: true,
    contentType: "application/json",
    data: JSON.stringify(emailDataToSend),
    processData: false,
    success: function(data, textStatus, jQxhr) {
      console.log("success CheckedMail saved");
      console.log(data);
      getDailyCheckedMailCount().then(dailyCheckedCount => {
        drawDailyMailsPiechart(
          dailyCheckedCount,
          dailySentMailCountPieChart,
          dailyReceivedMailCountPieChart
        );
      });
    },
    error: function(jqXhr, textStatus, errorThrown) {
      console.log("failure=============");
      console.log(errorThrown);
    }
  });
});

// DONE checked saved ============================

// // DONE checked saved ============================
gmail.observe.on("send_message", function(url, body, emailData, xhr) {
  console.log("email_data");
  console.log(emailData);

  const emailDataToSend = {
    userMailId: gmail.get.user_email(),
    mailId: emailData["1"],
    subject: emailData["8"],
    from: emailData["2"],
    to: emailData["3"],
    timestamp: parseInt(emailData["7"])
  };
  console.log("emailDataToSend");
  console.log(emailDataToSend);

  $.ajax({
    url: serverURL + "/mails/sent",
    dataType: "json",
    type: "post",
    crossDomain: true,
    contentType: "application/json",
    data: JSON.stringify(emailDataToSend),
    processData: false,
    success: function(data, textStatus, jQxhr) {
      console.log("success SentMail saved");
      console.log(data);
      getDailySentMailCount().then(dailySentCount => {
        drawDailyMailsPiechart(
          dailyCheckedMailCountPieChart,
          dailySentCount,
          dailyReceivedMailCountPieChart
        );
      });
    },
    error: function(jqXhr, textStatus, errorThrown) {
      console.log("failure=============");
      console.log(errorThrown);
    }
  });
});
// // DONE checked saved ============================
alert("QQQQQ");
gmail.observe.on("new_email", function(id, url, body, xhr) {
  console.log("new mail arrived");

  let aa = JSON.parse(body)["4"];
  let tempTimeStamp = aa["3"];

  const emailDataToSend = {
    userMailId: gmail.get.user_email(),
    mailId: xhr[0],
    timestamp: parseInt(tempTimeStamp)
  };
  console.log(emailDataToSend);

  $.ajax({
    url: serverURL + "/mails/received",
    dataType: "json",
    type: "post",
    crossDomain: true,
    contentType: "application/json",
    data: JSON.stringify(emailDataToSend),
    processData: false,
    success: function(data, textStatus, jQxhr) {
      console.log("success ReceivedMail saved");
      console.log(data);
      getDailyReceivedMailCount().then(dailyReceivedCount => {
        drawDailyMailsPiechart(
          dailyCheckedMailCountPieChart,
          dailySentMailCountPieChart,
          dailyReceivedCount
        );
      });
    },
    error: function(jqXhr, textStatus, errorThrown) {
      console.log("failure=============");
      console.log(errorThrown);
    }
  });
});

function drawDailyMailsPiechart(dailyChecked, dailySent, dailyReceived) {
  dailyCheckedMailCountPieChart = dailyChecked;
  dailySentMailCountPieChart = dailySent;
  dailyReceivedMailCountPieChart = dailyReceived;
  var ctx = document.getElementById("dailyMailPieChartCanvas").getContext("2d");
  const colors = ["#d0181a", "#0354cb", "#49e461"];
  const labels = ["Checked", "Sent", "Received"];
  var myPieChart = new Chart(ctx, {
    type: "pie",
    data: {
      datasets: [
        {
          data: [dailyChecked, dailySent, dailyReceived],
          backgroundColor: colors
        }
      ],
      labels: labels
    },
    responsive: true
  });
}

gmail.observe.on("load", function() {
  Promise.all([
    getDailyCheckedMailCount(),
    getDailySentMailCount(),
    getDailyReceivedMailCount()
  ]).then(results => {
    drawDailyMailsPiechart(results[0], results[1], results[2]);
  });
});
