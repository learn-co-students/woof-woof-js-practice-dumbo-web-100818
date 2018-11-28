const pupsUrl = 'http://localhost:3000/pups'
const dogBary =  document.querySelector('#dog-bar')
const dogInfo = document.querySelector('#dog-info')
const goodDog = document.querySelector('#good-dog-filter')
let showAllDogs = true

function dogBar(dog) {
  if (showAllDogs) {
  dogBary.innerHTML += `<span class="dog" data-id="${dog.id}">${dog.name}</span>`
} else {
  if (dog.isGoodDog === true) {
    dogBary.innerHTML += `<span class="dog" data-id="${dog.id}">${dog.name}</span>`
  }
}
}
function getPups() {
  fetch(pupsUrl).then(r => r.json()).then(json => json.forEach(dog => dogBar(dog)))
}

function filterDog() {
  if (goodDog.innerText === 'Filter good dogs: OFF') {
    showAllDogs = false
    dogBary.innerHTML = ''
    goodDog.innerText = 'Filter good dogs: ON'
    getPups()
   console.log('lalala')
  } else {
    showAllDogs = true
    dogBary.innerHTML = ''
    goodDog.innerText = 'Filter good dogs: OFF'
    getPups()
  }
}

function toggleDog(e) {
e.preventDefault()
if (e.target.className === "change"){
  let id = e.target.dataset.setId
  let goodDoggy
  if (e.target.innerText === "Bad Dog!") {
     goodDoggy = true
} else {
   goodDoggy = false
}

fetch(`${pupsUrl}/${id}`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({isGoodDog: goodDoggy})
}).then(r => r.json()).then(json => showDog(json.id))
}
}

function dogAction(e) {
  e.preventDefault()
  if (e.target.className === "dog"){
  showDog(e.target.dataset.id)
}
}

function showDog(dogId){
fetch(`${pupsUrl}/${dogId}`).then(r => r.json()).then(dog => {
  dogInfo.innerHTML = ''
  let doggy = ``
  let image = dog.image
  let name = dog.name
  let goodButton = ''
  let isGoodDog = dog.isGoodDog

  if (dog.isGoodDog) {
    goodButton = 'Good Dog!'
  } else {
    goodButton = 'Bad Dog!'
  }

  let newInfo =
  `<img src=${image}>
  <h2>${name}</h2>
  <button class="change" data-set-id="${dog.id}">${goodButton}</button>
  `
  dogInfo.innerHTML = newInfo
})
}

document.addEventListener('DOMContentLoaded', ()=> {
getPups()
dogBary.addEventListener('click', dogAction)
dogInfo.addEventListener('click', toggleDog)
goodDog.addEventListener('click', filterDog)
})
