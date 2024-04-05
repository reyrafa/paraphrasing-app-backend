const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const rephraseRoute = require("./routes/rephrase.js");
const userRoutes = require("./routes/user.js");

mongoose.connect(
    "mongodb+srv://rafaelcostemiano05:admin@paraphrasing.grbgyix.mongodb.net/paraphrasingDB?retryWrites=true&w=majority&appName=paraphrasing"
);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection Error"));
db.once("open", () => {
    console.log(`The server is connected with the database`);
});

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/sentence", rephraseRoute);
app.use("/user", userRoutes);

const port = 4000;
app.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
});
