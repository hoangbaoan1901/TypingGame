const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random'
const wordDisplayElement = document.getElementById("words-display")
const wordInputElement = document.getElementById("words-input")


function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content)
}
async function renderNewQuote() {
    const quote = await getRandomQuote()
    wordDisplayElement.innerHTML = ''
    quote.split('').forEach(character => {
        const characterSpan = document.createElement("span")
        // characterSpan.classList.add('correct')
        characterSpan.innerText = character
        wordDisplayElement.appendChild(characterSpan)
        
    })
    wordInputElement.value = null

}

renderNewQuote()