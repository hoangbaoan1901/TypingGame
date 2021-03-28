// Typing scripts
const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random'
const wordDisplayElement = document.getElementById("words-display")
const wordInputElement = document.getElementById("words-input")
const timerElement = document.getElementById("timer")
var typed = 0;


wordInputElement.addEventListener('input', () => {
    typed += 1
    if (typed == 1){
        startTimer()
    }


    const arrayWord = wordDisplayElement.querySelectorAll('span')
    const arrayValue = wordInputElement.value.split('')

    let correct = true
    arrayWord.forEach((characterSpan, index) => {
        const character = arrayValue[index]
        if (character == null){
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')

            correct = false
        }
        else if (character == characterSpan.innerText){
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        }
        else{
            characterSpan.classList.add('incorrect')
            characterSpan.classList.remove('correct')
            correct = false
        }
        wordInputElement.innerHTML = null
    })

    if (correct) {
        stopTimer()
        // renderNewQuote()
    }
})

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content)
}
async function renderNewQuote() {
    typed = 0
    timerElement.innerText = 0
    const quote = await getRandomQuote()
    wordDisplayElement.innerHTML = ''
    quote.split('').forEach(character => {
        const characterSpan = document.createElement("span")
        characterSpan.innerText = character
        wordDisplayElement.appendChild(characterSpan)        
    })
    wordInputElement.value = null

}

let startTime
function startTimer() {
  timerElement.innerText.value += 1
  startTime = new Date()
  setInterval(() => {
    timer.innerText = getTimerTime()
  }, 1000)
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000)
}

function stopTimer(){
    timerElement.innerText.value = 0
    
}
renderNewQuote()