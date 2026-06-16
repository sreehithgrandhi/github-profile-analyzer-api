

const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
    res.send("test route works");
});

const {
    getProfile,
    getAllProfiles,
    getSingleProfile
} = require("../controllers/profileController");

router.get("/", getAllProfiles);

router.get("/:username", getSingleProfile);

router.post("/:username", getProfile);

module.exports = router;