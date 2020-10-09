const express = require('express');
const path = require('path');
const app = express();

// app.use(express.static(path.join(__dirname, 'frontend/build')));
// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
// app.listen(port);

const port = process.env.PORT || 9000;

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
} else {
    app.use(express.static(path.join(__dirname, 'frontend/build')));
}

app.listen(port, () => console.log(`Server is running on port ${port}`));
