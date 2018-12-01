var express = require("express");
var app = express();
var router = express.Router();

router.post('/v1', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

app.use('/api', router);


app.listen(3000, () => {
 console.log("Server running on port 3000");
});