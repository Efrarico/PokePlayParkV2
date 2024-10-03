let clicks = 0;
let clickLimit = Math.floor(Math.random() * (50 - 20 + 1)) + 20;
let pokemons = [];

// Evento de click en la Pokébola
document.getElementById('pokeball').addEventListener('click', () => {
    clicks++;
    document.getElementById('clicks').textContent = clicks;
    
    if (clicks >= clickLimit) {
        capturePokemon();
        clicks = 0;
        clickLimit = Math.floor(Math.random() * (50 - 20 + 1)) + 20;  // Nuevo límite de clicks
    }
});

// Función para capturar un Pokémon
async function capturePokemon() {
    try {
        const randomId = Math.floor(Math.random() * 898) + 1; // Generar un ID de Pokémon aleatorio
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        const pokemon = await response.json();

        const pokemonName = pokemon.name;
        const pokemonImage = pokemon.sprites.front_default;

        pokemons.push({ name: pokemonName, id: randomId }); // Guardamos el nombre y el ID del Pokémon
        updatePokemonList();
        showPokemonModal(pokemonName, pokemonImage);
    } catch (error) {
        console.error("Error capturando Pokémon:", error);
        document.getElementById('message').textContent = "Se peló!";
    }
}

// Actualizar la lista de Pokémon capturados
function updatePokemonList() {
    const pokemonList = document.getElementById('pokemon-list');
    pokemonList.innerHTML = '';
    pokemons.forEach(pokemon => {
        const li = document.createElement('li');
        li.textContent = pokemon.name;
        li.classList.add('clickable');
        li.addEventListener('click', () => {
            fetchPokemonDetails(pokemon.id);  // Evento para obtener más detalles del Pokémon
        });
        pokemonList.appendChild(li);
    });
}

// Mostrar modal de captura de Pokémon
function showPokemonModal(name, image) {
    const modal = document.getElementById('pokemon-modal');
    const pokemonName = document.getElementById('pokemon-name');
    const pokemonImage = document.getElementById('pokemon-image');
    
    pokemonName.textContent = `Capturaste un ${name}!`;
    pokemonImage.src = image;

    modal.style.display = "block";
}

// Mostrar el modal con la información del Pokémon capturado
async function fetchPokemonDetails(pokemonId) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        const pokemon = await response.json();

        const pokemonTypes = pokemon.types.map(typeInfo => typeInfo.type.name).join(', ');
        const pokemonImage = pokemon.sprites.front_default;

        // Actualizar el modal con la información del Pokémon
        const modal = document.getElementById('pokemon-info-modal');
        const infoPokemonName = document.getElementById('info-pokemon-name');
        const infoPokemonImage = document.getElementById('info-pokemon-image');
        const infoPokemonType = document.getElementById('info-pokemon-type');

        infoPokemonName.textContent = `Name: ${pokemon.name}`;
        infoPokemonImage.src = pokemonImage;
        infoPokemonType.textContent = `Type: ${pokemonTypes}`;

        modal.style.display = "block";
    } catch (error) {
        console.error("Error al obtener detalles del Pokémon:", error);
    }
}

// Cerrar el modal de captura de Pokémon
document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('pokemon-modal').style.display = "none";
});

// Cerrar el modal de información del Pokémon
document.getElementById('close-info-modal').addEventListener('click', () => {
    document.getElementById('pokemon-info-modal').style.display = "none";
});

// Cerrar el modal al hacer click en la "x"
document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('pokemon-modal').style.display = "none";
});

document.querySelector('.close-info-modal').addEventListener('click', () => {
    document.getElementById('pokemon-info-modal').style.display = "none";
});

// Cerrar el modal si haces clic fuera del modal
window.addEventListener('click', (event) => {
    const modal = document.getElementById('pokemon-modal');
    const infoModal = document.getElementById('pokemon-info-modal');
    
    if (event.target === modal) {
        modal.style.display = "none";
    }

    if (event.target === infoModal) {
        infoModal.style.display = "none";
    }
});

// Desplegar y contraer el menú de Pokémon capturados
document.getElementById('toggle-menu').addEventListener('click', () => {
    const capturedPokemons = document.getElementById('captured-pokemons');
    capturedPokemons.classList.toggle('hidden'); // Toggle para mostrar u ocultar el menú
});
