document.addEventListener('DOMContentLoaded', () => {
  dogsData()
})

const dogsData = () => {
  fetch('http://localhost:3000/pups')
  .then(res => res.json())
  .then(show_dogs);
}

const pupData = (dogId) => {
  fetch(`http://localhost:3000/pups/${dogId}`)
  .then(res => res.json())
  .then(showPupData)
}

const show_dogs = data => {
  let div = document.querySelector('#dog-bar');
  let filterDiv = document.querySelector('#filter-div');
  data.forEach( (dog) => {
    div.innerHTML += `
    <span data-id="${dog.id}">${dog.name}</span>
    `
  });
  div.addEventListener('click', fetchPupInfo);
  filterDiv.addEventListener('click', filterPups);
}

const fetchPupInfo = e => {
  if (e.target.tagName === 'SPAN') {
    let dogId = e.target.dataset.id
    pupData(dogId)
  }
}

const showPupData = pup => {
  let div = document.querySelector('#dog-info');
  div.addEventListener('click', toggleDog);
  let goodOrBad = '';
  if (pup.isGoodDog === true) {
    goodOrBad = 'Good Dog!'
  } else {
    goodOrBad = 'Bad Dog!'
  }
  div.innerHTML = `
    <img src=${pup.image}><br>
    <h2>${pup.name}</h2><br>
    <button class="goodBad" data-id="${pup.id}">${goodOrBad}</button>
  `
}

const toggleDog = e => {
  if (e.target.className === 'goodBad') {
    let dogId = e.target.dataset.id;
    let button = e.target
    let trueOrFalse;
    if (button.innerHTML === 'Good Dog!') {
      trueOrFalse = true;
    } else {
      trueOrFalse = false;
    }
    let dog = {"isGoodDog": !trueOrFalse}
    changeDog(dogId, dog);
  }
}

const changeDog = (dogId, dog) => {
  fetch(`http://localhost:3000/pups/${dogId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dog)
  }).then(res => res.json()).then(dog => {
    let button = document.querySelector('button.goodBad')
    if (dog.isGoodDog === true) {
      button.innerHTML = 'Good Dog!'
    } else {
      button.innerHTML = 'Bad Dog!'
    }
  })
}

const filterPups = e => {
  if (e.target.id === 'good-dog-filter') {
    let button = document.querySelector('#good-dog-filter')
    let buttonText = button.innerHTML
    if (buttonText === 'Filter good dogs: OFF') {
      buttonText = 'Filter good dogs: ON'
    } else {
      buttonText = 'Filter good dogs: OFF'
    }
    deleteDogData()
  }
}



