const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const fs = require("fs")
const path = require("path");


app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.static('public'))

app.get('/data',function(req,res){
  fs.readFile(path.join(__dirname, 'test1.json'), function(err,data){
    res.json(JSON.parse(data.toString()));
    if (err) {
      return console.error(err);
    }
  })
});


app.post('/data', function(req,res)
  {

    let receivedAnswers = req.body;
    let pointsIfRight = 2;
    let pointsIfWrong = 1;
    let recievedPoints = 0;
    let maxPoints = 0;
    let Result = 0;
    
    let correctAnswers = [
      [true, false, false, false],
      [false, true, false, false],
      [false, false, true, false],
      [false, false, false, true],
    ]; 

    for (i = 0; i < receivedAnswers.length; i++){
      for (j = 0; j < receivedAnswers[i].length; j++){
        if (Boolean(correctAnswers[i][j]) == true){
          maxPoints += pointsIfRight;
          if (Boolean(receivedAnswers[i][j]) == correctAnswers[i][j]){
            recievedPoints += pointsIfRight;
          }
        }
        else if (Boolean(receivedAnswers[i][j]) == true) {
          recievedPoints -= pointsIfWrong;
        }
      }
    }

    if (recievedPoints >= 0){
      Result = recievedPoints/maxPoints;
    }
    else{
      Result = recievedPoints;
    }

    console.log("maxPoints: " + maxPoints);
    console.log("recievedPoints: " + recievedPoints);
    console.log("Result: " + Result); 
    
    res.json(correctAnswers);
  }
)
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})