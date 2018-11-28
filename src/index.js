
document.addEventListener("DOMContentLoaded",() =>{


    fetchAllDogs().then(json => displayPups(json))

    const dogbar = document.getElementById("dog-bar")
    const dogDiv = document.getElementById('dog-info')
    const goodDogFilter = document.getElementById("good-dog-filter")

      dogbar.addEventListener("click", (event)=>{
        if(event.target.className ==="pups"){
          displayPup(event)
        }
    })

    dogDiv.addEventListener("click", (event)=>{
        if(event.target.className === "goodDogButton"){
          changeGoodDogStatus(event)
        }
    })

    goodDogFilter.addEventListener("click",(event)=>{
      filterGoodDogs(event)
    })
})

function fetchAllDogs() {
  return fetch("http://localhost:3000/pups")
    .then(res => res.json())
}


function displayPups(givenPups) {
  const div = document.getElementById("dog-bar")
  div.innerHTML=""
  givenPups.forEach((pup)=>{
    let pupName = `<span data-id="${pup.id}" class="pups">${pup.name}</span>`
    div.innerHTML += pupName
  })
}

function getSinglePup(id){
  return fetch(`http://localhost:3000/pups/${id}`)
         .then(res => res.json())
}

function displayPup(pupEvent) {
  let div = document.getElementById("dog-info")
  let id = pupEvent.target.dataset.id
  let getPup = getSinglePup(id).then((pup)=>{
    let pupDisplay = `<img src="${pup.image}"></img>
                      <h2>${pup.name}</h2>
                      <button data-id="${pup.id}" class="goodDogButton">${pup.isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>`
    div.innerHTML=pupDisplay
  })
}

function changeGoodDogStatus(givenEvent) {
  let button = document.querySelector(`button[data-id="${givenEvent.target.dataset.id}"]`)
    let isGood;
     if (button.innerText === "Good Dog"){
       button.innerText = "Bad Dog"
       isGood = false
     }else {
       button.innerText = "Good Dog"
       isGood = true
     }
  updateDog(button.dataset.id, isGood)
}

function updateDog(id, isGood) {
    fetch(`http://localhost:3000/pups/${id}`,{method:"PATCH",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({"isGoodDog":isGood})
      })
}

function filterGoodDogs(givenEvent) {
  if(givenEvent.target.innerText === "Filter good dogs: OFF" ){
    givenEvent.target.innerText ="Filter good dogs: ON"
    fetchAllDogs().then((dogs)=>{
      let goodDogs = dogs.filter((dog)=>{
        return dog.isGoodDog===true
      })
      displayPups(goodDogs)
    })
  }else{
    givenEvent.target.innerText = "Filter good dogs: OFF"
    fetchAllDogs().then((dogs)=>displayPups(dogs))
  }
}
