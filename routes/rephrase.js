const express = require("express");
const rephraseController = require("../controller/rephrase");

const router = express.Router();

router.post("/rephrase", rephraseController.rephraseSentence);
module.exports = router;
