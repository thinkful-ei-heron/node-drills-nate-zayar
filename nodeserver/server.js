const express = require('express');
const app = express();

app.get('/sum', (req, res) => {
  if (req.query.a && req.query.b) {
    let a = req.query.a
    let b = req.query.b
    res.send(`The sum of a and b is ${a+b}`)
  } else {
    res.send('invalid')
  }

});

app.get('/cipher', (req, res) => {
  let text = req.query.text;
  let shift = req.query.shift;

  let processedText = text.split(' ');

  let result = processedText.map(word => {
    let processedWord = ''

      for(let x=0; x < word.length; x++){
        let charCode = word[x].charCodeAt(0)
        let shifted = charCode - shift
        processedWord = processedWord + String.fromCharCode(shifted)
    }
    return processedWord
  })

  res.send(result.join(' '));
});

app.get('/lotto', (req , res) => {
  let numbers = req.query.numbers;

  if (numbers.length === 6) {
    let winningNumbers = []
    for (let i = 0; i < 6; i++){
      winningNumbers.push(Math.ceil(Math.random() * 20).toString())
    }

    let matched = 0
    for (let i = 0; i < numbers.length; i++){
      for (let j = 0; j < winningNumbers.length; j++){
        if (numbers[i] === winningNumbers[j]) {
          matched = matched + 1
          break
        }
      }

    }
    if(matched < 4){
      res.send("Sorry, you lose")
    }
    else if(matched === 4){
      res.send("Congratulations, you win a free ticket")
    }

    else if(matched === 5){
      res.send("Congratulations, you win $100!")
    }
    else if (matched === 6) {
      res.send("Wow! Unbelievable! You could have won the mega millions!")
    }
  }
})



app.listen(8000, () => {
  console.log('running...')
})
