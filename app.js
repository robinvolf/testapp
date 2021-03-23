const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.static('public'))

app.get('/data',function(req,res){
	res.json(
        [
            {
              question: "Cupidatat id ea irure eu officia?",
              answers: [
                "Veniam deserunt ut laboris deserunt pariatur irure voluptate enim exercitation ad consequat.",
                "Et veniam dolor praesentium voluptates doloremque.",
                "Do voluptate est do est aliquip incididunt incididunt consequat velit dolor veniam incididunt eiusmod.",
                "Anim adipisicing minim cillum aliquip officia esse cillum non sint commodo irure amet aliqua.",
              ],
            },
            {
              question: "Cillum irure et id laboris nulla aliquip esse sint ex nisi.?",
              answers: [
                "Modi quidem tenetur blanditiis",
                "Excepteur fugiat commodo in ullamco minim.",
                "Reprehenderit accusamus qui sed illum quo.",
                "Consequatur ratione officia ea officiis.",
              ],
            },
            {
              question: "Vestibulum tincidunt faucibus placerat.?",
              answers: [
                "Debitis consequatur explicabo ut..",
                "Delectus reiciendis amet omnis sunt.",
                "Do voluptate est do est aliquip incididunt incididunt consequat velit dolor veniam incididunt eiusmod.",
                "Quos illum et est fugit veritatis ipsam.",
              ],
            },
            {
              question: "Proin dignissim vehicula vulputate.?",
              answers: [
                "Impedit perspiciatis deserunt cumque sapiente consequatur..",
                "Omnis et in asperiores quam tempora non.",
                "Laboriosam commodi maiores aut nihil est.",
                "Cumque et dicta neque quia. ",
              ],
            },
        ]
    );
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})