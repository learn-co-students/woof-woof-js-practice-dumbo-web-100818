document.addEventListener('DOMContentLoaded', ()=> {
  getAllDogs()
})


function getAllDogs(){
  const dogDiv = document.querySelector('#dog-bar')
  dogDiv.innerHTML = ''
  fetch('http://localhost:3000/pups')
  .then(response => response.json())
  .then(dogs => {
    dogs.forEach((dog)=> {
      dogDiv.innerHTML += `<span data-id='${dog.id}'>${dog.name}</span>`
    })
  })
}



window.addEventListener('click', ()=> {
  if (event.target.tagName === "SPAN"){
    showDog(event.target)
  } else if (event.target.id === 'good-dog-filter') {
    filterButtonChange()
  }
})

function showDog(dog){
  const dogInfoContainer = document.querySelector('#dog-info')
  fetch(`http://localhost:3000/pups/${dog.dataset.id}`)
  .then(response => response.json())
  .then(dog => {
      dogInfoContainer.innerHTML = `<img src=${dog.image}>
      <h2>${dog.name}</h2>
      <button class='doggy-btn' data-id='${dog.id}'>${dog.isGoodDog? 'Good Dog!': 'Bad Dog!'}</button>`
      document.querySelector('.doggy-btn').addEventListener('click', () => {changeDogStatus(event.target)})
})
}





function changeDogStatus(dog){
  dogId = dog.dataset.id
  dogStatusButton = document.querySelector('.doggy-btn')

  console.log(`This dog was a ${dogStatusButton.innerHTML}`)

  dogStatusButton.innerHTML === 'Good Dog!' ? dogStatusButton.innerHTML = 'Bad Dog!' : dogStatusButton.innerHTML = 'Good Dog!'

  console.log(`This dog is now a ${dogStatusButton.innerHTML}`)

  fetch(`http://localhost:3000/pups/${dogId}`, {
    method: "PATCH",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      isGoodDog: returnStatus()

    })
  })
  .then(response => response.json())
}

function returnStatus(){
  return dogStatusButton.innerHTML === 'Good Dog!' ?  true :  false
}

function filterButtonChange(){
  const filterButton = document.querySelector('#good-dog-filter')
  let filterButtonStatus = filterButton.innerHTML
  let x = filterButtonStatus.split(": ")
  x[1] === "OFF" ? x[1] = "ON" :  x[1] = "OFF"
  x[1] === "OFF" ? getAllDogs() : filterDogs()
  filterButton.innerHTML = x.join(": ")

}

function filterDogs(){
  let dogDiv = document.querySelector('#dog-bar')
  dogDiv.innerHTML = ''
  fetch('http://localhost:3000/pups')
  .then(response => response.json())
  .then(dogs => {
    console.log(dogs)
    dogs.forEach((dog) => {
      if (dog.isGoodDog === true) {
        dogDiv.innerHTML += `<span data-id='${dog.id}'>${dog.name}</span>`
      }
    })
  })
}
