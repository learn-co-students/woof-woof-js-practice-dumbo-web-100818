// variables & constants
let dogsArray = []
const goodDogFilter = document.getElementById("good-dog-filter")
const dogBar = document.getElementById('dog-bar')
const dogInfo = document.getElementById('dog-info')

//Event Listeners
document.addEventListener('DOMContentLoaded', getDogs)
goodDogFilter.addEventListener('click', getGoodDogs)


// Functions to display dogs on the "dogBar"
// Making sure when the dog span is clicked, the corresponding dog's information shows up on the page

function getDogs() {
  dogBar.innerHTML = ''
    dogInfo.innerHTML = ''
  fetch('http://localhost:3000/pups')
    .then(response => response.json())
      .then(addDogs)
    }

function addDogs(dogs) {
  dogs.forEach(displayDogs)
}

function displayDogs(dog) {
  dogsArray.push(dog)
  dogBar.innerHTML += `<span data-id=${dog.id} > ${dog.name} </span>`
  dogBar.addEventListener('click', showDog)
}

function showDog(e) {
  dogsArray.forEach( dog => {
    if  (e.target.dataset.id === `${dog.id}`) {
        dogInfo.innerHTML = ` <img src=${dog.image}> <h2> ${dog.name} </h2>
        <button data-id= ${dog.id} class= 'goodOrBadBttn'> ${goodOrBad(dog)} </button>`
    }
  })
  dogInfo.addEventListener('click', fetchDogInfo)
}

// To show the specific dog you can also make a fetch request to 'dogs/:id' to get the information for the dog with the e.target.dataset.id instead of creating an array of dogs in the global scope and pulling from there. That's actually the better way of doing it, cuz youre updating to the database.


// Update dog's "good boy status" when Good/Bad button is clicked
function fetchDogInfo(e) {
  fetch(`http://localhost:3000/pups/${e.target.dataset.id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      isGoodDog: updateDogStatus(e)
    })
  }).then(resp => resp.json())
      .then(updateButton)
}

function updateDogStatus(e) {
  return e.target.innerText === "Good Dog!"? false : true
}

function updateButton(dog) {
  const goodButton = document.querySelector(".goodOrBadBttn")
  goodButton.innerHTML = goodOrBad(dog)
  updateDogBar(dog)
}

function goodOrBad(dog){
    return dog.isGoodDog? "Good Dog!" : "Bad Dog!"
}

// Good Dog Filter

function getGoodDogs() {
  if (goodDogFilter.innerText === "Filter good dogs: OFF") {
    fetch('http://localhost:3000/pups')
      .then(response => response.json())
        .then(searchForGoodDogs)
          .then(updateFilterButton)}
  else if (goodDogFilter.innerText === "Filter good dogs: ON"){
    console.log("filter now OFF")
    updateFilterButton()
    getDogs()
  }
}

function searchForGoodDogs(dogs) {
  dogBar.innerHTML = ''
  dogInfo.innerHTML = ''
  dogs.forEach(displayGoodDogs)
}

function displayGoodDogs(dog) {
  if (dog.isGoodDog === true) {
    displayDogs(dog)
}
}

function updateFilterButton() {
  if (isFilterOn() === true) {
    goodDogFilter.innerText ="Filter good dogs: OFF"
  }
  else if (isFilterOn() === false) {
    goodDogFilter.innerText = "Filter good dogs: ON"
  }
}

function isFilterOn() {
  if (goodDogFilter.innerText === "Filter good dogs: ON") {
    return true
  }
  else {
    return false
  }
}


function updateDogBar(dog){
  const dogSpan = document.querySelector(`[data-id='${dog.id}']`)
    if (isFilterOn() === true) {
      dogSpan.remove()
    }
}
