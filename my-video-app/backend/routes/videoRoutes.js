const express = require("express");
const router = express.Router();

const twoja_zajebista_baza_danych = [];

// Get all videos
router.get("/", async (req, res) => {
    // const videos = await Video.find();
    res.json(twoja_zajebista_baza_danych);
});

// Add a new video
router.post("/", async (req, res) => {
    const { title, url, addedBy } = req.body;
    const newVideo = { title, url, addedBy };
    twoja_zajebista_baza_danych.push(newVideo);
    res.json(newVideo);
});

module.exports = router;
