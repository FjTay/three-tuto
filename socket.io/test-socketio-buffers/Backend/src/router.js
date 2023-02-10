const express = require("express");
const multer = require("multer");
const fs = require('fs')
const uuid = require('uuid')

const router = express.Router();

const upload = multer({ dest: "uploads/" });


router.post("/api/avatar/:uid", upload.single("avatar"), (req, res) => {
	const { originalname } = req.file;
	console.log(originalname)
	console.log(req.params.uid)

	const { filename } = req.file;

	fs
	.rename(`uploads/${filename}`, `uploads/${req.params.uid}.png`, (err) => {
		if (err) throw err;
		res.send("File uploaded");
	});
});

module.exports = router;
