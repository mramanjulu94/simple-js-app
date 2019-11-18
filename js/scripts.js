
var pokemonRepository = (function () {
	var repository = [
		{
			name: 'Bulbasaur',
			height: 2.4,
			types: ['grass', 'poison']
		},
		{
			name: 'Charmander',
			height: 2.0,
			types: ['fire']
		},
		{
			name: 'Squirtle',
			height: 5.7,
			types: ['water']
		},
	];
	function add (pokemon) {
		repository.push (pokemon)
	}

	function getall() {
		return repository;
	}

	function addListItem(pokemon) {
		let $ul = document.querySelector('.pokemon-list');

		const $li = document.createElement('li');
		const $button = document.createElement('button');
		$button.setAttribute('id', `${pokemon.name}`);
		$button.innerText = `${pokemon.name}`;
		$button.classList.add(`${pokemon.name}`);


		$li.appendChild($button);
		$ul.appendChild($li);


	}

	function showDetails(pokemon) {
		console.log(`${pokemon.name}`);
	}


	return {
		add: add,
		getall: getall,
		addListItem: addListItem,
		showDetails: showDetails
	};
})();



document.write ('<h3> Pokemon Names</h3>');

pokemonRepository.add ({
	name: 'Pikachu',
	height: 1.7,
	types: ['electirc']
});


pokemonRepository.getall().forEach(function(pokemon) {
	document.write(pokemon.name + '<br>' + 'Height: ' + pokemon.height + '<br>' + 'Type: ' + pokemon.types + '<br>' + '<br>');

	pokemonRepository.addListItem(pokemon);
	var $button = document.querySelector(`.${pokemon.name}`);


	$button.addEventListener('click', function(event) {
		pokemonRepository.showDetails((pokemon));
	});

});

var $button = document.querySelector('button');
$button.addEventListener('click', function (event) {
	console.log(event);
});
