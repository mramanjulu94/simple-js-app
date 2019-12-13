const pokemonRepository = (function () {
    const $container = document.querySelector('.container');
    const $pokemonList = document.querySelector('ul');
    const repository = [];
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


    function add(pokemon) {
        repository.push(pokemon);
    }



    function getAll() {
        return repository;
    }


    function search(searchName) {
        repository.filter(function(pokemon) {
            if (pokemon.name === searchName) {
                return pokemon;
            }
        });
    }


    function addListItem(pokemon) {
        const listItem = document.createElement('li');
        const button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemon-name');
        listItem.appendChild(button);
        $pokemonList.appendChild(listItem);
        button.addEventListener('click', function(event) {
            showDetails(pokemon)
        });
    }


    function showDetails(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
    }


    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                const pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(item) {
        const url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) { 
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = Object.keys(details.types);
        }).catch(function (e) {
            console.error(e);
        });
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        search: search,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();


pokemonRepository.loadList().then(function() {

    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
