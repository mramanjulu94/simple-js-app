var pokemonRepository = (function () {

var repository = [
  {name: 'Bulbasaur', height: 7, type: ['grass', 'posion']},
  {name: 'Charmander', height: 11, type: ['fire']},
  {name: 'Squirtle', height: 9, type: ['water']}
];

function add(pokemon)
  {
    repository.push(pokemon);
  }

  function getAll()
  {
    return repository;
  }

  return {
    add: add,
    getAll: getAll
  };
})();

pokemonRepository.add({
    name: "Pikachu",
    height: 0.4,
    types: "electr"
});
console.log(pokemonRepository.getAll());


const array1 = pokemonRepository.getAll();

array1.forEach(function(element) {
    console.log(element);

    });

    
