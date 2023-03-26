const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const commentsEndpoint = require("./routes/comment");
const customersEndpoint = require("./routes/customer");
const internalUsersEndpoint = require("./routes/internalUser");
const tasksEndpoint = require("./routes/task");
const notificationsEndpoint = require("./routes/notification");
const filesEndpoint = require("./routes/files");
const cors = require("cors");

dotenv.config();

const port = process.env.PORT || 4000;

// CONNECTION TO MONGODB
mongoose
  .connect(process.env.DATABASE_ACCESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`successfully connected`);
  })
  .catch((e) => {
    console.log(e, `not connected`);
  });

// MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use("/uploaded-files", express.static("uploaded-files"));

// ROUTES
app.use("/api/comment", commentsEndpoint);
app.use("/api/customer", customersEndpoint);
app.use("/api/internalUser", internalUsersEndpoint);
app.use("/api/task", tasksEndpoint);
app.use("/api/notification", notificationsEndpoint);
app.use("/api/files", filesEndpoint);

if (process.env.NODE_ENV == "production") {
  app.use(express.static("frontend-work/build"));
}

app.listen(port, () => console.log("server is running"));
