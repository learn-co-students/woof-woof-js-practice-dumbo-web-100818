const dogsURL = 'http://localhost:3000/pups'
const dogBar = document.querySelector('div#dog-bar')

document.addEventListener('DOMContentLoaded', function() {
	const dogBar = document.querySelector('div#dog-bar')
	fetchDogs(addPupHtml)

	dogBar.addEventListener('click', (e) => {
		if(e.target.tagName === 'SPAN') {
			fetchDog(e.target.dataset.id, showPupInfo)
		}
	})

	const dogInfo = document.querySelector('#dog-info')
	dogInfo.addEventListener('click', (e) => {
		if(e.target.tagName === 'BUTTON') {
			fetchDog(e.target.previousElementSibling.dataset.id, changePupButton)
		}
	})

	const dogFilter = document.querySelector('#good-dog-filter')
	dogFilter.addEventListener('click', (e) => {
		const dogBar = document.querySelector('div#dog-bar')
		dogBar.innerHTML = `<div class="dog-bar></div>"`
		
		if(e.target.innerText === "Filter good dogs: OFF") {
			e.target.innerText = "Filter good dogs: ON"
			fetchDogs(filterPups)
		} else {
			e.target.innerText = "Filter good dogs: OFF"
			fetchDogs(addPupHtml)
		}
	})

})

function fetchDogs(cb) {
	fetch(dogsURL)
	.then(resp => resp.json())
	.then(function(pups) {
		for(const pup of pups) {
			cb(pup)
		}
	})
}

function fetchDog(pupId, cb) {
	fetch(dogsURL+'/'+pupId)
	.then(resp => resp.json())
	.then(pup => cb(pup))
}

function addPupHtml(pup) {
	const span = document.createElement('span')
	const dogBar = document.querySelector('div#dog-bar')
	span.setAttribute('data-id', pup.id)
	span.innerText = pup.name
	dogBar.appendChild(span)
}

function showPupInfo(pup) {
	const dogInfo = document.querySelector('#dog-info')
	dogInfo.innerHTML = `<img src=${pup.image}>
	 						<h2 data-id="${pup.id}">${pup.name}</h2>
	 						<button></button>`

	showPupButton(pup)
}

function changePupButton(pup) {
	fetch(dogsURL+'/'+pup.id, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			isGoodDog: !pup.isGoodDog
		})
	})
	.then(resp => resp.json())
	.then(function(pup) {
		showPupButton(pup)
	})
}

function showPupButton(pup) {
	const dogInfo = document.querySelector('#dog-info')
	const button = dogInfo.querySelector('button')

	if(pup.isGoodDog) {
		button.innerText = `Good Dog!`
	} else {
		button.innerText = `Bad Dog!`
	}
}

function filterPups(pup) {
	if(pup.isGoodDog === true) {
		addPupHtml(pup)
	}
}



