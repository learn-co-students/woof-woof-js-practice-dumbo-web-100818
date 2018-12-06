document.addEventListener('DOMContentLoaded', function () {
  console.log("loaded!!!");

  const dogs_bar = document.querySelector("#dog-bar")
  const dog_info = document.querySelector("#dog-info")
  const filterBtn = document.querySelector("#good-dog-filter")
let dogList;

  dogs_bar.addEventListener('click', handleDogClick)
  dog_info.addEventListener('click', hadleDogBtn)
  filterBtn.addEventListener('click', handleFilter)

getAllDogs()

function getAllDogs(){
  fetch('http://localhost:3000/pups')
  .then( res => res.json())
  .then(displayAllDogs)
}
  function getDogInfo(dogId){
    fetch(`http://localhost:3000/pups/${dogId}`)
    .then(res => res.json())
    .then(displaySingleDog)
  }

  function updateDogBtn(edit_dog, dogId) {
    fetch(`http://localhost:3000/pups/${dogId}`, {
      method: 'PATCH',
      headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({isGoodDog: edit_dog})
    })
  }

  function displayAllDogs(dogs){
    dogs_bar.innerHTML = ""
    dogList = dogs
    dogList.forEach( dog => {
      dogs_bar.innerHTML +=
      `<span class="span" data-id="${dog.id}">${dog.name}</span>`
    })
  }

  function displaySingleDog(dog){

    dog_info.innerHTML =
    `<img src="${dog.image}">
      <h2>${dog.name}</h2>
      <button data-id=${dog.id} class="dog-btn">${dog.isGoodDog ? "Good" : "Bad" } Dog!</button>`
  }

  function handleDogClick(e){
    let dogId;
    if (e.target.className === "span"){
      dogId = e.target.dataset.id
    }

    getDogInfo(dogId)
  }

  function hadleDogBtn(e){
    let edit_dog, dogId;
    if (e.target.className === "dog-btn"){
      dogId = e.target.dataset.id
      if (e.target.innerText === "Good Dog!"){
        e.target.innerText = "Bad Dog!"
      } else {
        e.target.innerText = "Good Dog!"
        }
        if (e.target.innerText === "Good Dog!") {
          edit_dog = true

        } else {
          edit_dog = false
        }
        updateDogBtn(edit_dog, dogId)
      }
    }

    function filterDog(){
      let filterList = dogList.filter(dog => dog.isGoodDog)
      displayAllDogs(filterList)
    }

    function handleFilter(e){

      if (e.target.innerText === "Filter good dogs: OFF"){
        e.target.innerText = "Filter good dogs: ON"
        filterDog()
      } else {
        e.target.innerText = "Filter good dogs: OFF"
        getAllDogs()
      }


    }


})
