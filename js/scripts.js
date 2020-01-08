// Wraps repository within IIFE
const pokemonRepository = (function () {
const repository = [];

// Creates variable for index 'ul' with pokemonList
const $pokemonList = document.querySelector('ul');
const $modalContainer = document.querySelector('#modal-container');
const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

// Adds new Pokemon to var repository
function add(pokemon) {
repository.push(pokemon);
}

// Function used to return Pokemon object array
function getAll() {
return repository;
}

// Function to search repository for Pokemon
function search(searchName) {
repository.filter(function (pokemon) {
if (pokemon.name === searchName) {
return pokemon;
}
});
}

// Create a function 'addListItem' for each Pokemon object
function addListItem(pokemon) {
let listItem = document.createElement('li'); // create li element that contains a button for each Pokémon
const button = document.createElement('button'); // Adds Pokemon name to text within button
button.innerText = pokemon.name;// Set the innerText of the button to be the Pokémon's name
button.classList.add('pokemon-name'); // Adds a CSS class to button using classList.add method
listItem.appendChild(button); // Adds the button element to the 'li'// append the button to the list item as its child.
$pokemonList.appendChild(listItem); // Adds the 'li' to 'ul' with pokemonList class in index file //append the list item to the unordered list as its child
button.addEventListener('click', function () {
showDetails(pokemon) // Calls showDetails function when button is clicked
});
}

// Function to show details of each Pokemon
function showDetails(pokemon) {
pokemonRepository.loadDetails(pokemon).then(function () {
showModal(pokemon);
});
}

// Loading data from an external API
function loadList() {
return fetch(apiUrl).then(function (response) {
return response.json();
}).then(function (json) {
json.results.forEach(function (item) {
const pokemon = {
name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
detailsUrl: item.url
};
add(pokemon);
});
}).catch(function (e) {
/* eslint-disable no-console */
console.error(e);
})
}

// Load details of each Pokemon when clicked
function loadDetails(item) {
const url = item.detailsUrl;
return fetch(url).then(function (response) {
return response.json();
}).then(function (details) {
// Now we add details to the item
item.imageUrl = details.sprites.front_default;
item.height = details.height;
item.weight = details.weight;
item.types = Object.keys(details.types);
if (details.types.length == 2) {
item.types = [details.types[0].type.name, details.types[1].type.name];
} else {
item.types = [details.types[0].type.name];
}
}).catch(function (e) {
console.error(e);
});
}

// Function to show modal for Pokemon data
function showModal(item) {

$modalContainer.innerHTML = '';

const modal = document.createElement('div');
modal.classList.add('modal');


const nameElement = document.createElement('h3');
nameElement.innerText = item.name.charAt(0).toUpperCase() + item.name.slice(1);

const imageElement = document.createElement('img');
imageElement.src = item.imageUrl;
imageElement.classList.add('modal-img');

const heightElement = document.createElement('p');
heightElement.innerText = 'Height: ' + item.height + '';

const weightElement = document.createElement('p');
weightElement.innerText = 'Weight: ' + item.weight + '';

const typesElement = document.createElement('p');
typesElement.innerText = 'Types: ' + item.types;

const closeButtonElement = document.createElement('button');
closeButtonElement.classList.add('modal-close');
closeButtonElement.innerText = 'Close';
closeButtonElement.addEventListener('click', hideModal);

modal.appendChild(nameElement);
modal.appendChild(imageElement);
modal.appendChild(heightElement);
modal.appendChild(weightElement);
modal.appendChild(typesElement);
$modalContainer.appendChild(modal);
modal.appendChild(closeButtonElement);

$modalContainer.classList.add('is-visible');
}

// Function to close the modal
function hideModal() {
$modalContainer.classList.remove('is-visible');
}

// Press escape key to close modal
window.addEventListener('keydown', (e) => {
if (e.key === 'Escape' && $modalContainer.classList.contains('is-visible')) {
hideModal();
}
})

// Click outside of the modal to close the modal
$modalContainer.addEventListener('click', (e) => {

var target = e.target;
if (target === $modalContainer) {
hideModal();
}
})

// return all data
return {
add: add,
getAll: getAll,
addListItem: addListItem,
search: search,
showDetails: showDetails,
loadList: loadList,
loadDetails: loadDetails,
showModal: showModal,
hideModal: hideModal
};
})();

// forEach Used To cycle through addListItem function properties
pokemonRepository.loadList().then(function() {
pokemonRepository.getAll().forEach(function(pokeList) {
pokemonRepository.addListItem(pokeList);
});
});
