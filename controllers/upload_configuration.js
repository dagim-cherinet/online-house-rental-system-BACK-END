const jwt = require("jsonwebtoken");
const JWT_STRING = "kfkjfkjfdkjakdjferuej#$#$#2u3@#@$@kfj";
const multer = require("multer");
const dbServices = require("../db/dbServices");
const path = require("path");
const fs = require("fs").promises;


// ------------Router & Switch configuration
// Multer configuration for file uploads
const uploadMiddleware = multer({
    dest: 'uploads/',
    fileFilter: (req, file, cb) => {
        if (path.extname(file.originalname) !== '.txt') {
            return cb(new Error('Only .txt files are allowed'));
        }
        cb(null, true);
    },
    limits: { fileSize: 1024 * 1024 * 5 } // 5MB limit
});

const uploadConfiguration = async (req, res) => {
    console.log("upload configuration")
    console.log(req.body)
    console.log(req.file)

    const { branch_id, model } = req.body;
    const label = req.file.originalname;
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    const configuration = await fs.readFile(req.file.path, 'utf-8');
    await fs.unlink(req.file.path); // Delete temp file

    const db = dbServices.getDbServiceInstance();
    const response = db.uploadConfigurationToDB({ label, configuration, branch_id, model });
    response
        .then((data) => res.json({ status: "upload is successful" }))
        .catch((err) => console.log(err));


    // const [result] = await db.query(
    //     'INSERT INTO router_configurations (label, configuration) VALUES (?, ?)',
    //     [label || 'Unnamed Config', configuration]
    // );
    // res.json({ id: result.insertId, label, configuration });







};


module.exports = { uploadMiddleware, uploadConfiguration };
