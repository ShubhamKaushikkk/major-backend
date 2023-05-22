const express = require("express");
const router = express.Router();
const controller = require("../Controllers/appcontroller");
router.post("/signup", controller.signup);
router.get("/registeredusers", controller.getRegisteredUsers);
router.post("/vote", controller.vote);
router.get("/getvotes", controller.getVotesCasted);
router.get("/recentregistrations", controller.getRecentRegistrations);
router.get("/getFingerprintId", controller.getfingerprintId);
router.get("/isRegistered", controller.isRegistered);
router.post("/postRegistered", controller.postRegistered);
router.get("/getVoted", controller.get_voted);
router.post("/negVoted", controller.negVoted);
// router.patch("/updateFingerPrint", controller.updateFingerPrint);
module.exports = router;
