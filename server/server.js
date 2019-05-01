const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/myapp",
  { useNewUrlParser: true },
  function(err) {
    if (err) throw err;
    console.log("Successfully connected");
  }
);

const CheckedMailSchema = mongoose.Schema({
  userMailId: String,
  mailId: String,
  from: Object,
  subject: String,
  to: [
    {
      type: Object
    }
  ],
  timestamp: Number,
  timestampChecked: Number
});

const SentMailSchema = mongoose.Schema({
  userMailId: String,
  mailId: String,
  from: Object,
  subject: String,
  to: [
    {
      type: Object
    }
  ],
  timestamp: Number
});

const ReceivedMailSchema = mongoose.Schema({
  userMailId: String,
  mailId: String,
  timestamp: Number
});

const CheckedMail = mongoose.model("CheckedMail", CheckedMailSchema);
const SentMail = mongoose.model("SentMail", SentMailSchema);
const ReceivedMail = mongoose.model("ReceivedMail", ReceivedMailSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "mail.google.com");
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept"
  // );

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "content-type, accept");
  res.header("Access-Control-Max-Age", 1000);
  res.header("Content-Length", 0);

  next();
});

app.post("/mails/checked", (req, res) => {
  console.log(req.body);

  CheckedMail.find(
    { mailId: req.body.mailId, userMailId: req.body.userMailId },
    (err, mail) => {
      if (err) return res.status(500).send("Internal server Error");

      if (mail.length > 0) {
        console.log("Mail already Exist");
        console.log(mail);
        return res.status(409).send("Mail already Exist");
      }

      const mailToSave = new CheckedMail();
      mailToSave.userMailId = req.body.userMailId;
      mailToSave.mailId = req.body.mailId;
      mailToSave.subject = req.body.subject;
      mailToSave.from = req.body.from;
      mailToSave.to = req.body.to;
      mailToSave.timestamp = req.body.timestamp;
      mailToSave.timestampChecked = req.body.timestampChecked;
      mailToSave.save(err => {
        console.log("Saving....");
        if (err) return res.status(500).send("Internal Server Error");
        return res.send({ message: "CheckedMail saved" });
      });
    }
  );
});

// // Sent Mail
app.post("/mails/sent", (req, res) => {
  console.log(req.body);
  const mailToSave = new SentMail();
  mailToSave.userMailId = req.body.userMailId;
  mailToSave.mailId = req.body.mailId;
  mailToSave.subject = req.body.subject;
  mailToSave.from = req.body.from;
  mailToSave.to = req.body.to;
  mailToSave.timestamp = req.body.timestamp;
  mailToSave.save(err => {
    console.log("Saving....");
    if (err) return res.status(500).send("Internal Server Error");
    return res.send({ message: "SentMail saved" });
  });
});

app.post("/mails/received", (req, res) => {
  ReceivedMail.find(
    { userMailId: req.body.userMailId, mailId: req.body.mailId },
    (err, mail) => {
      if (err) return res.status(500).send("Internal server Error");

      if (mail.length > 0) {
        console.log("Mail already Exist");
        console.log(mail);
        return res.status(409).send("Mail already Exist");
      }
      const mailToSave = new ReceivedMail();
      mailToSave.userMailId = req.body.userMailId;
      mailToSave.mailId = req.body.mailId;
      mailToSave.timestamp = req.body.timestamp;
      mailToSave.save(err => {
        console.log("Saving....");
        if (err) return res.status(500).send("Internal Server Error");
        return res.send({ message: "ReceivedMail saved" });
      });
    }
  );
});

app.get("/mails/dailyChecked", (req, res) => {
  console.log("Daily Server");
  CheckedMail.find(
    {
      timestampChecked: {
        $lt: Date.now(),
        $gte: Date.now() - 24 * 60 * 60 * 1000
      }
    },
    (err, mails) => {
      if (err) return res.status(500).send(err);
      console.log("mails");
      console.log(mails.length);
      return res.send({ mailCount: mails.length });
    }
  );
});

app.get("/mails/dailySent", (req, res) => {
  console.log("Daily Server");
  SentMail.find(
    {
      timestamp: {
        $lt: Date.now(),
        $gte: Date.now() - 24 * 60 * 60 * 1000
      }
    },
    (err, mails) => {
      if (err) return res.status(500).send(err);
      console.log("mails");
      console.log(mails.length);
      return res.send({ mailCount: mails.length });
    }
  );
});
app.get("/mails/dailyReceived", (req, res) => {
  console.log("Daily Server");
  ReceivedMail.find(
    {
      timestamp: {
        $lt: Date.now(),
        $gte: Date.now() - 24 * 60 * 60 * 1000
      }
    },
    (err, mails) => {
      if (err) return res.status(500).send(err);
      console.log("mails");
      console.log(mails.length);
      return res.send({ mailCount: mails.length });
    }
  );
});

// ============Weekly========================

app.get("/mails/weeklyChecked", (req, res) => {
  console.log("Daily Server");
  CheckedMail.find(
    {
      timestampChecked: {
        $lt: Date.now(),
        $gte: Date.now() - 7 * 24 * 60 * 60 * 1000
      }
    },
    (err, mails) => {
      if (err) return res.status(500).send(err);
      console.log("mails");
      console.log(mails.length);
      return res.send({ mailCount: mails.length });
    }
  );
});

app.get("/mails/weeklySent", (req, res) => {
  console.log("Daily Server");
  SentMail.find(
    {
      timestamp: {
        $lt: Date.now(),
        $gte: Date.now() - 7 * 24 * 60 * 60 * 1000
      }
    },
    (err, mails) => {
      if (err) return res.status(500).send(err);
      console.log("mails");
      console.log(mails.length);
      return res.send({ mailCount: mails.length });
    }
  );
});
app.get("/mails/weeklyReceived", (req, res) => {
  console.log("Daily Server");
  ReceivedMail.find(
    {
      timestamp: {
        $lt: Date.now(),
        $gte: Date.now() - 7 * 24 * 60 * 60 * 1000
      }
    },
    (err, mails) => {
      if (err) return res.status(500).send(err);
      console.log("mails");
      console.log(mails.length);
      return res.send({ mailCount: mails.length });
    }
  );
});

// ============Weekly========================

// ============Monthly========================

app.get("/mails/monthlyChecked", (req, res) => {
  console.log("Daily Server");
  CheckedMail.find(
    {
      timestampChecked: {
        $lt: Date.now(),
        $gte: Date.now() - 30 * 24 * 60 * 60 * 1000
      }
    },
    (err, mails) => {
      if (err) return res.status(500).send(err);
      console.log("mails");
      console.log(mails.length);
      return res.send({ mailCount: mails.length });
    }
  );
});

app.get("/mails/monthlySent", (req, res) => {
  console.log("Daily Server");
  SentMail.find(
    {
      timestamp: {
        $lt: Date.now(),
        $gte: Date.now() - 30 * 24 * 60 * 60 * 1000
      }
    },
    (err, mails) => {
      if (err) return res.status(500).send(err);
      console.log("mails");
      console.log(mails.length);
      return res.send({ mailCount: mails.length });
    }
  );
});
app.get("/mails/monthlyReceived", (req, res) => {
  console.log("Daily Server");
  ReceivedMail.find(
    {
      timestamp: {
        $lt: Date.now(),
        $gte: Date.now() - 30 * 24 * 60 * 60 * 1000
      }
    },
    (err, mails) => {
      if (err) return res.status(500).send(err);
      console.log("mails");
      console.log(mails.length);
      return res.send({ mailCount: mails.length });
    }
  );
});

// ============Monthly========================

// ============Yearly========================

app.get("/mails/yearlyChecked", (req, res) => {
  console.log("Daily Server");
  CheckedMail.find(
    {
      timestampChecked: {
        $lt: Date.now(),
        $gte: Date.now() - 365 * 24 * 60 * 60 * 1000
      }
    },
    (err, mails) => {
      if (err) return res.status(500).send(err);
      console.log("mails");
      console.log(mails.length);
      return res.send({ mailCount: mails.length });
    }
  );
});

app.get("/mails/yearlySent", (req, res) => {
  console.log("Daily Server");
  SentMail.find(
    {
      timestamp: {
        $lt: Date.now(),
        $gte: Date.now() - 365 * 24 * 60 * 60 * 1000
      }
    },
    (err, mails) => {
      if (err) return res.status(500).send(err);
      console.log("mails");
      console.log(mails.length);
      return res.send({ mailCount: mails.length });
    }
  );
});
app.get("/mails/yearlyReceived", (req, res) => {
  console.log("Daily Server");
  ReceivedMail.find(
    {
      timestamp: {
        $lt: Date.now(),
        $gte: Date.now() - 365 * 24 * 60 * 60 * 1000
      }
    },
    (err, mails) => {
      if (err) return res.status(500).send(err);
      console.log("mails");
      console.log(mails.length);
      return res.send({ mailCount: mails.length });
    }
  );
});

// ============Yearly========================

app.listen(3000, () => {
  console.log("listening on 3000");
});
