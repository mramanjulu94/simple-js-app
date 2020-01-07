var pokemonRepository = (function() {
  var repository = [];

  var $pokemonList = $("ul");
  var $modalContainer = $("#modal-container");
  var apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  // Adds new Pokemon to const repository
  function add(pokemon) {
    repository.push(pokemon);
  }


  function getAll() {
    return repository;
  }

  // Function to search repository for Pokemon
  function search(searchName) {
    repository.filter(function(pokemon) {
      if (pokemon.name === searchName) {
        return pokemon;
      }
    });
  }


  function addListItem(pokemon) {



    var listItem = document.createElement('li');

    var button = document.createElement('button');

    button.innerText = pokemon.name;

    button.classList.add('pokemon-name');

    listItem.appendChild(button);

    $pokemonList.appendChild(listItem);

    button.addEventListener('click', function() {

      showDetails(pokemon);
    });
  }

  // // Function to show details of each Pokemon
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function() {
      showModal(pokemon);
    });
  }

  // Function to load Pokemon list from API
  function loadList() {

    return fetch(apiUrl).then(function(response) {

      return response.json();
    }).then(function (json) {
      json.results.forEach(function(item) {
        var pokemon = {

          name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
          detailsUrl: item.url
        };
        add(pokemon);
      });
    })
    .catch(function(error) {
      console.write(error);
    });
}

  // Load details of each Pokemon that is clicked
  function loadDetails(item) {
    const url = item.detailsUrl;

    return fetch(url).then(function(response) {

        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;

        if (details.types.length == 2) {
          item.types = [details.types[0].type.name, details.types[1].type.name];
        } else {
          item.types = [details.types[0].type.name];
        }
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  // Function to show modal for Pokemon data
  function showModal(item) {

    $modalContainer.innerHTML = '';

    var modal = document.createElement('div');
    modal.classList.add('modal');


    var closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    var nameElement = document.createElement('h1');
    nameElement.innerText = item.name.charAt(0).toUpperCase() + item.name.slice(1);

    var imageElement = document.createElement('img');
    imageElement.src - item.imageUrl;
    imageElement.classList.add("modal-img");

    var heightElement = document.createElement('p');
    heightElement.innerText = 'Height: ' + item.height + 'm';



    var typesElement = document.createElement('p');
    typesElement.innerText = 'Type(s): ' + item.types;

    modal.append(closeButtonElement);
    modal.append(nameElement);
    modal.append(imageElement);
    modal.append(heightElement);
    modal.append(typesElement);
    $modalContainer.append(modal);


    $modalContainer.addClass("is-visible");
  }

  // Function to close the modal
  function hideModal() {
    $modalContainer.classList.remove("is-visible");
  }

  // Press escape key to close modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && $modalContainer.classList.contains("is-visible")) {
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
