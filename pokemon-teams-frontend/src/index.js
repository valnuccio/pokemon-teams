const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {


const clickHandler = () => {
    document.addEventListener('click', (e) => {
        if (e.target.matches('.add-button')){
            fetchPokemon(e.target)
        }
        if (e.target.matches('.release')){
            releasePokemon(e.target)
        }
    })
}


const releasePokemon = button => {
   const pokemonId = button.dataset.pokemonId
   const configObj = {
       method: 'DELETE',
       headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json' 
       }
   }

   fetch(POKEMONS_URL + `/${pokemonId}`, configObj)
   .then()
   .then(()=>{
    deletePokeDom(button, pokemonId)
   })
    
}

const deletePokeDom = (button, pokemonId) => {
    button.parentElement.remove()
}

const fetchPokemon = button => {
    const configObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json' 
        },
        body: JSON.stringify({
            "trainer_id": button.dataset.trainer
        })
        
    }
    
    fetch(POKEMONS_URL, configObj)
    .then(resp => resp.json())
    .then(pokemon => {
        if (pokemon.id || pokemon.id == 0){
        addPokemonDom(pokemon)
        } else {
        alert(pokemon.error)
        }
    }) 
}

const createPokemonLi = (pokemon) =>{
    const li = document.createElement('li')
    li.innerHTML = `
    ${pokemon.nickname}
    (${pokemon.species})
    <button class="release" 
    data-pokemon-id='${pokemon.id}'>Release</button>
    `
    return li
}

const addPokemonDom = pokemon => {
    const trainerDiv = document.querySelector(`[data-id="${pokemon.trainer_id}"]`)
    const pokemonUl = trainerDiv.querySelector('ul')
    li = createPokemonLi(pokemon)
    pokemonUl.appendChild(li)
}


const getTrainers = () => {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(trainers => renderTrainers(trainers))
}

const renderTrainers = trainers => {
    trainers.forEach(trainer => renderTrainer(trainer));
}

const renderTrainer = trainer => {
    const mainDiv = document.querySelector('main')
    const trainerDiv = document.createElement('div')
    trainerDiv.classList.add('card')
    trainerDiv.dataset.id = trainer.id
    trainerDiv.innerHTML = `<p>${trainer.name}</p>
    <button class='add-button' data-trainer=${trainer.id}>Add Pokemon</button>
    `
    const pokemonUl = renderPokemon(trainer)
    trainerDiv.append(pokemonUl)
    mainDiv.appendChild(trainerDiv)
}



const renderPokemon = trainer => {
    const ul = document.createElement('ul')
    trainer.pokemons.forEach (pokemon => {
        li = createPokemonLi(pokemon)
        ul.appendChild(li)
})
    return ul
    
}





getTrainers();
clickHandler();

})
