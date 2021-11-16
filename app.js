const searchInput = document.querySelector('#poke-input');
const searchBtn = document.querySelector('.btn-search');
const pokeContainer = document.querySelector('.poke-container');

const colors = {

	Fire: '#FFC6C2',
	Grass: '#b7e4c7',
	Electric: '#EFEBCE',
	Water: '#def3fd',
	Ground: '#BABAA0',
	Rock: '#ACAEAF',
	Fairy:'#C2F0FF',
	Poison:'#d6b3ff',
	Bug:'#f8d5a3',
	Dragon:'#97b3e6',
	Psychic:'#eaeda1',
	Flying:'#f5f5f5',
	Fighting:'#e6e0d4',
	Normal:'#f5f5f5',
	Ice: '#A1CECB',
}

const pokeCount = 151;

const initPokemon = async () => {
	for(let i = 1;  i <= pokeCount; i++){
		await getPokemon(i);
	}


};

const getPokemon = async (id) => {

	let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	let res = await fetch(url);

	let data = await res.json();

	createPokemonBox(data);
};

const createPokemonBox = (pokemon) => {

	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const id = pokemon.id.toString().padStart (3, '0');

	const type = pokemon.types[0].type.name[0].toUpperCase()+ pokemon.types[0].type.name.slice(1);
	const color = colors[type];

	const pokemonElement= document.createElement('div');
	pokemonElement.classList.add('poke-box');
	pokemonElement.style.backgroundColor =`${color}`;

	pokemonElement.innerHTML = `

            <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png" alt="${name} image" />
            <h3 class="poke-name">${name}</h3>
            <p class="poke-id">${id}</p>
            <p class="poke-type">Type: ${type}</p>
	`;

	pokeContainer.appendChild(pokemonElement)


};



initPokemon();

searchInput.addEventListener("input", function(e){

	const pokeNames = document.querySelectorAll('.poke-name');

	console.log(pokeNames);
	const search = searchInput.value.toLowerCase();

	pokeNames.forEach(pokeName => {

		pokeName.parentElement.style.display = 'block';


		if(!pokeName.innerHTML.toLowerCase().includes(search)){

			pokeName.parentElement.style.display = 'none';

		}
	});

	console.log(search);
});