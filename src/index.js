document.addEventListener('DOMContentLoaded', (e) => {
  fetch("http://localhost:3000/pups")
    .then(response => response.json())
    .then(json => {
      const dogBar = document.getElementById('dog-bar')

      json.forEach(pup => {
        dogBar.innerHTML += `<span>${pup.name}</span>`

        dogBar.addEventListener('click', (e) => {
          if(e.target.innerText === `${pup.name}`){
            const dogInfo = document.getElementById('dog-info')

            if(pup.isGoodDog === true){
              pup.good = "Good Dog!"
            } else {
              pup.good = "Bad Dog!"
            }

            dogInfo.innerHTML = `<img src="${pup.image}"><h2>${pup.name}</h2><button data-id="${pup.id}">${pup.good}</button>`
          }
        })
      })
      document.addEventListener('click', (e) => {
        if(e.target.tagName === "BUTTON" && e.target.innerText.includes("Dog!")){
          var isGood
          if(e.target.innerHTML === "Bad Dog!"){
            isGood = true
          } else {
            isGood = false
          }
          fetch(`http://localhost:3000/pups/${e.target.dataset.id}`,
          {
            method: "PATCH",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              isGoodDog: isGood
            })
          })
          .then(response => response.json())
          .then(pup => {
            const dogInfo = document.getElementById('dog-info')

            dogInfo.innerHTML = `<img src="${pup.image}"><h2>${pup.name}</h2><button data-id="${pup.id}">${pup.isGoodDog ? 'Good' : 'Bad'} Dog!</button>`

            

          })
        }
      })

      const filterButton = document.getElementById('good-dog-filter')
      filterButton.addEventListener('click', (e) => {
        dogBar.innerHTML = ""
        if(e.target.innerText.includes("OFF")){
          e.target.innerText = "Filter good dogs: ON"

          const goodPups = json.filter(pup => {
            if (pup.isGoodDog == true){
              console.log(pup)

              dogBar.innerHTML += `<span>${pup.name}</span>`
            }
          })
        } else {
          e.target.innerText = "Filter good dogs: OFF"
          json.forEach(pup => {
            dogBar.innerHTML += `<span>${pup.name}</span>`
          })
        }
      })
    })
})
