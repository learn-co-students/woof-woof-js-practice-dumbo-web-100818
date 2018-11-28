document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/pups")
    .then(res => res.json())
    .then(json => renderBar(json))
    .then(json => passTheBar());
});

function renderBar(data) {
  // debugger

  const array = data;
  const bar = document.getElementById("dog-bar");
  bar.innerHTML = "";
  data.forEach(dog => {
    bar.innerHTML += `<span class="doggo" data-id="${dog.id}" data-dog-good="${
      dog.isGoodDog
    }">${dog.name}</span>`;
  });
  // debugger
  document.addEventListener("click", e => {
    if (e.target.className === "doggo") {
      let dogId = e.target.dataset.id;
      fetch(`http://localhost:3000/pups/${dogId}`)
        .then(res => res.json())
        .then(json => showDog(json));
    }
  });
}
// function heyListen(json){
//   document.addEventListener("click", e => handleClick(e, json))
// }
//
// function handleClick(e, json){
//   // debugger
//   if (e.target.className === "doggo"){
//     showDog(e.target.dataset.id, json)
//     // console.log(e.target.dataset.id)
//   }
// }
//
// function showDog(id, json){
//   // debugger
// }

function showDog(dog) {
  // debugger
  const dogInfo = document.getElementById("dog-info");
  dogInfo.innerHTML = `<img src=${dog.image}>
    <h2>${dog.name}</h2>
    <button id=${dog.id}>${dog.isGoodDog ? "Good" : "Bad"} Dog!</button>`;

  dogInfo.addEventListener("click", e => {
    // console.log(e.target.classname)
    let isGood = true
    if (e.target.tagName === "BUTTON") {
      let currentText = e.target.innerText;
      if (currentText === "Good Dog!") {
        e.target.innerText = "Bad Dog!";
        isGood = false
      } else {
        e.target.innerText = "Good Dog!";
      }
      // debugger
      fetch(`http://localhost:3000/pups/${e.target.id}`, {
   method: 'PATCH',
   headers: {
     "Content-Type": "application/json"
   },
   body: JSON.stringify({
     isGoodDog: isGood
   })
 })
        .then(res => res.json())
        .then(json => console.log(json));

  };
})}

function passTheBar() {
  let filter = document.getElementById("good-dog-filter");
  filter.addEventListener("click", e => {
    if (e.target.innerText === "Filter good dogs: OFF") {
      filter.innerText = "Filter good dogs: ON";
      let dogs = document.querySelectorAll("span");
      dogs.forEach(dog => {
        if (dog.dataset.dogGood === "false") {
          dog.remove();
        }
      });
    } else {
      filter.innerText = "Filter good dogs: OFF";

      fetch("http://localhost:3000/pups")
        .then(res => res.json())
        .then(json => renderBar(json));
    }
  });
}
