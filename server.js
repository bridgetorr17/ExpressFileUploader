const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

app.use(fileUpload());

app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files) === 0){
        return res.status(400).send('No files were uploaded');
    }

    const uploadedFile = req.files.myFile;
    const uploadPath = __dirname + '/uploads/' + uploadedFile.name;

    console.log('upload path will be ' + uploadPath);

    uploadedFile.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).send(err);
        }

        res.send('file uploaded successfully');
    })
})

app.listen(3000, () => {
    console.log('server started on port 3000')
})