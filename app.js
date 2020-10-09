const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 9000;
// app.listen(port, () => console.log(`Server is running on port ${port}`));

app.use(express.static(path.join(__dirname, 'frontend/build')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port);