let offset = 0;
const limit = 12;

const typeColors = {
  grass: 'bg-green-600',
  fire: 'bg-red-600',
  water: 'bg-blue-600',
  bug: 'bg-green-500',
};
const typeTabColors = {
  grass: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  bug: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  poison: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  flying: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  water: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  fire: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  normal: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
  electric: 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  ground: 'bg-yellow-300 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  fairy: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
  psychic: 'bg-pink-200 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
  rock: 'bg-yellow-400 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  fighting: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  ghost: 'bg-purple-200 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  ice: 'bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  dragon: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
  dark: 'bg-gray-700 text-gray-300 dark:bg-gray-800 dark:text-gray-400',
  steel: 'bg-gray-400 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
};
const filterOption = {
  2: 'All',
  1: 'Caught',
  0: 'Uncaught'
};

const fetchPokemon = async (offset, limit) => {
  let data;
  let caughtPokemon = JSON.parse(localStorage.getItem('caughtPokemons')) || [];
  const resultMessage = document.getElementById('resultMessage');
  try {
    if(localStorage.getItem('pokemonListData') !== null){
      data = JSON.parse(localStorage.getItem('pokemonListData'));
    }else{
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=2000`);
      data = await response.json();
      localStorage.setItem('pokemonListData', JSON.stringify(data));
    }
    const option = localStorage.getItem('selectedFilterOption');
    if(option == 1){
      console.log('Caught');
      data = showCaughtPokemons(caughtPokemon, data.results);
    }else if(option == 0){
      console.log('Not Caught');
      data = showNotCaughtPokemons(caughtPokemon, data.results);
    }else{
      data = data.results;
    }
    data = getPokemonFromLocalStorage(data, offset, limit);
    if(data.length === 0){
      const loadMore = document.getElementById('loadMore');
      loadMore.style.display = 'none';
      resultMessage.style.display = 'block';
      resultMessage.textContent = "Sorry! Can’t find any Pokémon with the "+ filterOption[option] + " filter! \n Please select a different filter to find more Pokémon.";
    }else{
      resultMessage.style.display = 'none';
      loadMore.style.display = 'block';
    }
    return data;
  } catch (error) {
    console.error('Error fetching Pokémon:', error);
  }
};

const getPokemonFromLocalStorage = (data, offset, limit) => { 
  console.log("getPokemonFromLocalStorage");
  let storedData = data.slice(offset, offset + limit);
  console.log('Stored Data:', storedData);
  offset += limit;
  return storedData;
};

const showCaughtPokemons = (caughtIds, allPokemon) => {
  return allPokemon.filter(pokemon => caughtIds.includes(pokemon.name));
};

const showNotCaughtPokemons = (caughtIds, allPokemon) => {
  return allPokemon.filter(pokemon => !caughtIds.includes(pokemon.name));
};

const fetchPokemonDetails = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return {
      order: data.order,
      id: data.id,
      name: data.name,
      image: data.sprites.versions['generation-v']['black-white'].animated.front_shiny || data.sprites.versions['generation-v']['black-white'].front_shiny || data.sprites.front_default,
      types: data.types.map((type) => type.type.name)
    };
  } catch (error) {
    console.error('Error fetching Pokémon details:', error);
  }
};

const addCardsToContainer = (pokemonList) => {
  const container = document.querySelector('#content');
  if (!Array.isArray(pokemonList)) {
    console.error('pokemonList is not an array');
    return;
  }

  pokemonList.forEach((pokemon) => {
    const card = document.createElement('div');
    card.className = 'p-6 rounded-lg shadow-xl flex flex-col justify-center items-center bg-fixed bg-center cursor-pointer'; // Added cursor-pointer for better UX
    card.style.backgroundSize = 'cover';

    // Set background color based on Pokémon type
    const primaryType = pokemon.types[0]; // Assuming the first type is the primary type
    card.classList.add(typeColors[primaryType] || 'bg-gray-600'); // Default to gray if type is not in the map

    const title = document.createElement('h2');
    title.className = 'text-white font-bold mb-2 text-lg';
    title.textContent = `#${pokemon.id.toString().padStart(3, '0')} ${pokemon.name}`;

    const caughtImg = document.createElement('img');
    if(checkIfExistInLocalStorage(pokemon.name)){
      caughtImg.src = 'imgs/caught.png';
    }else{
      caughtImg.src = 'imgs/uncaught.png';
    }
    caughtImg.width = 20;
    caughtImg.alt = '';

    const pokemonImg = document.createElement('img');
    pokemonImg.src = pokemon.image;
    pokemonImg.style.width = '30%';
    pokemonImg.alt = pokemon.name;

    const typesDiv = document.createElement('div');
    typesDiv.className = 'mt-4 flex justify-between items-center';

    pokemon.types.forEach((type) => {
      const typeSpan = document.createElement('span');
      typeSpan.className = 'text-sm font-medium me-2 px-2.5 py-0.5 rounded';
      const classes = (typeTabColors[type] || 'bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-300').split(' ');
      classes.forEach(cls => typeSpan.classList.add(cls)); // Add each class separately
      typeSpan.textContent = type;
      typesDiv.appendChild(typeSpan);
    });

    card.appendChild(title);
    card.appendChild(caughtImg);
    card.appendChild(pokemonImg);
    card.appendChild(typesDiv);

    // Add click event listener to the card
    card.addEventListener('click', () => {
      showPokemonDetails(pokemon.id);
    });

    container.appendChild(card);
  });
  offset += limit;
};

const loopRecords = async () => {
  const records = await fetchPokemon(offset, limit);
  const pokemonList = [];
  for (const pokemon of records) {
    const details = await fetchPokemonDetails(pokemon.url);
    pokemonList.push(details);
  }
  console.log(pokemonList);
  addCardsToContainer(pokemonList);
};

const showHomeRecords = (name, allPokemon) => {
  const pokemonList = [];
  for (const pokemon of records) {
    const details = fetchPokemonDetails(pokemon.url);
    pokemonList.push(details);
  }
};

document.getElementById('searchPokemonByName').addEventListener('input', async (event) => {
  let allPokemon = JSON.parse(localStorage.getItem('pokemonListData'));
  const searchTerm = event.target.value;
  const records = searchPokemonByName(searchTerm, allPokemon.results);
  try {
    const pokemonDetails = await getPokemonDetails(records);
    const container = document.querySelector('#content');
    container.innerHTML = ''; 
    console.log(pokemonDetails);
    addCardsToContainer(pokemonDetails);
  } catch (error) {
    console.error('Error fetching Pokémon details:', error);
  }
});

const getPokemonDetails = async (records) => {
  const pokemonList = [];
  for (const pokemon of records) {
    const details = await fetchPokemonDetails(pokemon.url);
    pokemonList.push(details);
  }
  return pokemonList;
};

const searchPokemonByName = (name, allPokemon) => {
  return allPokemon.filter(pokemon => pokemon.name.toLowerCase().includes(name.toLowerCase())); 
};

const fetchTypeDetails = async (typeUrl) => {
  const response = await fetch(typeUrl);
  const typeData = await response.json();
  return typeData.damage_relations.double_damage_from.map(type => type.name);
};

const fetchEvolutionChain = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  const evolutions = [];

  let current = data.chain;
  while (current) {
    const speciesResponse = await fetch(current.species.url.replace('pokemon-species', 'pokemon'));
    const speciesData = await speciesResponse.json();
    evolutions.push({
      name: current.species.name,
      image: speciesData.sprites.versions['generation-v']['black-white'].animated.front_shiny || speciesData.sprites.versions['generation-v']['black-white'].front_shiny || speciesData.sprites.front_default
    });
    current = current.evolves_to[0];
  }
  return evolutions;
};

const fetchPokemonData = async (id) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const data = await response.json();

    // Fetch additional data from the species endpoint
    const speciesResponse = await fetch(data.species.url);
    const speciesData = await speciesResponse.json();

    // Fetch weaknesses for each type
    const weaknesses = [];
    for (const typeInfo of data.types) {
      const typeWeaknesses = await fetchTypeDetails(typeInfo.type.url);
      weaknesses.push(...typeWeaknesses);
    }

    // Get the English description
    const descriptionEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en');
    const description = descriptionEntry ? descriptionEntry.flavor_text : 'No description available';

    // Fetch evolution chain
    const evolutions = await fetchEvolutionChain(speciesData.evolution_chain.url);

    const pokemonData = {
      id: data.id,
      order: data.order,
      name: data.name,
      stats: {
        hp: data.stats.find(stat => stat.stat.name === 'hp').base_stat,
        attack: data.stats.find(stat => stat.stat.name === 'attack').base_stat,
        defense: data.stats.find(stat => stat.stat.name === 'defense').base_stat,
        specialAttack: data.stats.find(stat => stat.stat.name === 'special-attack').base_stat,
        specialDefense: data.stats.find(stat => stat.stat.name === 'special-defense').base_stat,
        speed: data.stats.find(stat => stat.stat.name === 'speed').base_stat,
      },
      types: data.types.map(typeInfo => typeInfo.type.name),
      moves: data.moves.map(moveInfo => moveInfo.move.name),
      sprites: data.sprites,
      abilities: data.abilities.map(abilityInfo => abilityInfo.ability.name),
      genera: speciesData.genera.find(genus => genus.language.name === 'en').genus,
      weaknesses: weaknesses.filter((value, index, self) => self.indexOf(value) === index), // Remove duplicates
      description: description,
      evolutions: evolutions,
    };
    console.log(pokemonData);
    return pokemonData;
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
  }
};

const updateModal = (pokemon) => {
  const pokemonIdElement = document.querySelector('#pokemon-id');
  const pokemonNameElement = document.querySelector('#pokemon-name');
  const pokemonImageElement = document.querySelector('#detailModal img');
  const pokemonDescriptionElement = document.querySelector('#pokemon-description p');
  const statsContainer = document.querySelector('#pokemon-stats');
  const typesContainer = document.querySelector('#pokemon-type p');
  const weaknessesContainer = document.querySelector('#pokemon-weaknesses p');
  const evolutionsContainer = document.querySelector('#pokemon-evolutions');
  const catchButton = document.getElementById('catchButton');

  if (pokemonIdElement) {
    pokemonIdElement.textContent = `#${pokemon.id.toString().padStart(3, '0')}`;
  }

  if (pokemonNameElement) {
    pokemonNameElement.textContent = pokemon.name;
  }

  if (pokemonImageElement) {
    pokemonImageElement.src = pokemon.sprites.versions['generation-v']['black-white'].animated.front_shiny || pokemon.sprites.versions['generation-v']['black-white'].front_shiny || pokemon.sprites.front_default;
  }

  if (pokemonDescriptionElement) {
    pokemonDescriptionElement.textContent = pokemon.description;
  }

  if (statsContainer) {
    document.getElementById('pokemon-hp').style.width = `${pokemon.stats.hp / 2}%`;
    document.getElementById('pokemon-attack').style.width = `${pokemon.stats.attack / 2}%`;
    document.getElementById('pokemon-defense').style.width = `${pokemon.stats.defense / 2}%`;
    document.getElementById('pokemon-special-attack').style.width = `${pokemon.stats.specialAttack / 2}%`;
    document.getElementById('pokemon-special-defence').style.width = `${pokemon.stats.specialDefense / 2}%`;
    document.getElementById('pokemon-speed').style.width = `${pokemon.stats.speed / 2}%`;
  }

  if (typesContainer) {
    typesContainer.innerHTML = ''; // Clear previous types
    pokemon.types.forEach(type => {
      const typeSpan = document.createElement('span');
      const classes = (typeTabColors[type] || 'bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-300').split(' ');
      classes.forEach(cls => typeSpan.classList.add(cls));
      typeSpan.classList.add('text-sm', 'font-medium', 'mr-2', 'mb-2', 'px-2.5', 'py-0.5', 'rounded');
      typeSpan.textContent = type;
      typesContainer.appendChild(typeSpan);
    });
  }

  if (weaknessesContainer) {
    weaknessesContainer.innerHTML = ''; // Clear previous weaknesses
    pokemon.weaknesses.forEach(weakness => {

      const weaknessSpan = document.createElement('span');
      const classes = (typeTabColors[weakness] || 'bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-300').split(' ');
      classes.forEach(cls => weaknessSpan.classList.add(cls));
      weaknessSpan.classList.add('text-sm', 'font-medium', 'mr-2', 'mb-2', 'px-2.5', 'py-0.5', 'rounded');
      weaknessSpan.textContent = weakness;

      weaknessesContainer.appendChild(weaknessSpan);
      console.log(weaknessesContainer);
    });
  }

  if (evolutionsContainer) {
    evolutionsContainer.innerHTML = ''; // Clear previous evolutions
    console.log(pokemon.evolutions);
    pokemon.evolutions.forEach(evolution => {
      const evolutionDiv = document.createElement('div');
      evolutionDiv.className = 'col-span-3 sm:col-span-1 items-center';
      evolutionDiv.innerHTML = `
          <h2 class="text-lg font-semibold">${evolution.name}</h2>
          <div class="flex items-center justify-center"><img class="evolutions-image" src="${evolution.image}"  alt="${evolution.name}"></div>
        `;
      evolutionsContainer.appendChild(evolutionDiv);
    });
  }

  const detailModal = document.querySelector('#detailModal');
  if (detailModal) {
    detailModal.classList.remove('hidden');
  }
  if(checkIfExistInLocalStorage(pokemon.name)){
    catchButton.textContent = 'Uncatch';
  }else{
    catchButton.textContent = 'Catch';
  }
};

const showPokemonDetails = async (id) => {
  const pokemon = await fetchPokemonData(id);
  updateModal(pokemon);
};

// Function to close the modal
document.getElementById('cancelModal').addEventListener('click', () => {
  document.getElementById('detailModal').classList.add('hidden');
});

document.getElementById('loadMore').addEventListener('click', () => {
  loopRecords();
});

document.querySelectorAll('#dropdownFilter a').forEach(item => {
  item.addEventListener('click', function(event) {
    console.log(this.getAttribute('data-value'));
      event.preventDefault();
      selectOption(this.getAttribute('data-value'));
  });
});

document.getElementById('catchButton').addEventListener('click', () => {
  const pokemonName = document.getElementById('pokemon-name').textContent;
  let caughtPokemons = JSON.parse(localStorage.getItem('caughtPokemons')) || [];
  if(!checkIfExistInLocalStorage(pokemonName)){
    caughtPokemons.push(pokemonName);
    localStorage.setItem('caughtPokemons', JSON.stringify(caughtPokemons));
  }else{
    caughtPokemons = caughtPokemons.filter(pokemon => pokemon !== pokemonName);
    localStorage.setItem('caughtPokemons', JSON.stringify(caughtPokemons));
  }
  offset = 0;
  const option = localStorage.getItem('selectedFilterOption');
  if(option != 2){
    const container = document.querySelector('#content');
    container.innerHTML = ''; 
    loopRecords();
  }
  document.getElementById('searchPokemonByName').value = '';
  document.getElementById('detailModal').classList.add('hidden');
});

const checkIfExistInLocalStorage = (pokemonName) => {
  const caughtPokemons = JSON.parse(localStorage.getItem('caughtPokemons')) || [];
  console.log(caughtPokemons);
  return caughtPokemons.includes(pokemonName);
};


function selectOption(option) {
  offset = 0;
  localStorage.setItem('selectedFilterOption', option);
  document.getElementById('selectedFilterOption').textContent = filterOption[option];
  const container = document.querySelector('#content');
  container.innerHTML = ''; // Clear previous cards
  loopRecords();
}

function loadFilter() {
  console.log('loadFilter');
  const option = localStorage.getItem('selectedFilterOption');
  if (option) {
      document.getElementById('selectedFilterOption').textContent = filterOption[option];
  }
}

const main = async () => {
  await loopRecords();
  await loadFilter();
};

main();
