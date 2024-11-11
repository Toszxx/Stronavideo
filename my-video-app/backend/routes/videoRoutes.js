const express = require("express");
const router = express.Router();
const Video = require("../models/Video");

// Get all videos
router.get("/", async (req, res) => {
    const videos = await Video.find();
    res.json(videos);
});

// Add a new video
router.post("/", async (req, res) => {
    const { title, url, addedBy } = req.body;
    const newVideo = new Video({ title, url, addedBy });
    await newVideo.save();
    res.json(newVideo);
});

module.exports = router;
