document.addEventListener('DOMContentLoaded',function(){
  getDogs().then(dispayDogs)

  let dogBar = document.querySelector('#dog-bar')
  let dogInfo = document.querySelector('#dog-info')
  let toggle = document.querySelector('#filter-div')

    toggle.addEventListener('click', handleFilter)

    dogBar.addEventListener('click', handleDogClick)

    dogInfo.addEventListener('click', handleGoodOrBadClick)

  function getDogs() {
    return fetch(`http://localhost:3000/pups`)
    .then(res => res.json())
  }

  function singledog(dogId) {
    return fetch(`http://localhost:3000/pups/${dogId}`)
    .then(res => res.json())
  }

  function changeTitle(dogId, boolean) {
     return fetch(`http://localhost:3000/pups/${dogId}`,{
       method: "PATCH",
       body: JSON.stringify({isGoodDog: boolean}),
       headers: {
         'Content-Type': 'application/json'
       }
     }).then(res => res.json())
  }


  function dispayDogs(dogs) {
     let dogBar = document.querySelector('#dog-bar')
     dogBar.innerHTML = ""
      dogs.forEach((dog) => {
      let dogSpan = `<span id="${dog.id}">${dog.name}</span>`
      dogBar.innerHTML += dogSpan
    })
}
  function handleDogClick(e) {
    let infoContainer = document.querySelector('#dog-info')
    if(e.target.tagName === "SPAN"){
      let dogId = e.target.id
      singledog(dogId).then(showDog)
    }
    }
  function showDog(dog) {
    let dogInfo = document.querySelector('#dog-info')
    let info = `<img src=${dog.image}>
<h2>${dog.name}</h2>
<button class="G-B" id="${dog.id}">${dog.isGoodDog ? 'Good': 'Bad'} Dog!</button>`
    dogInfo.innerHTML = info
  }
  
  function handleGoodOrBadClick(e) {
    if (e.target.className === "G-B"){
      let dogId = e.target.id
      let boolean = e.target.innerHTML === "Good Dog!" ? false : true
      changeTitle(dogId, boolean).then(dog => showDog(dog))
    }
  }

  function handleFilter(e) {
    let text = e.target.innerText
    if (text === "Filter good dogs: OFF"){
    e.target.innerText = 'Filter good dogs: On'
    getDogs().then((dogs)=>{
    let goodDogs = dogs.filter((dog)=>{
        return dog.isGoodDog === true
      })
      dispayDogs(goodDogs)
    })
  } else{
    e.target.innerText= "Filter good dogs: OFF"
    getDogs().then(dispayDogs)
  }
}
})
