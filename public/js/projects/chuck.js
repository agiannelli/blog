const chuckNorrisForm = document.querySelector('form')
const joke = document.querySelector('#joke')

const fetchJoke = () => {
    joke.textContent = 'Loading...'
    fetch('https://api.icndb.com/jokes/random').then((response) => {
        response.json().then((data) => {
            joke.textContent = data.value.joke
        })
    })
}

chuckNorrisForm.addEventListener('submit', (e) => {
    e.preventDefault() //prevents page from refreshing
    fetchJoke()
})

fetchJoke()
