let pokemonUrl = 'https://pokeapi.co/api/v2/pokemon';
const ul = document.querySelector('#list');
const button = document.querySelector('.button');

function displayPokemonInfo(array){
    for(let i=0; i < array.length; i++){
        retrievePokemonInfo(array[i].url, array[i].name);
    }
}

function appendNames(string){
    const li = document.createElement('li');
    li.innerHTML = string;
    return li;
}

function appendImg(imgUrl){
    const img = document.createElement('img');
    img.src = imgUrl;
    img.classList.add('pokemonImage')
    return img;
}

function appendTypes(array){
    const types = document.createElement('li');
    types.innerHTML = "Type: " + array.toString();
    console.log(types);
    return types;
}

function appendAbilities(array){
    const abilities = document.createElement('li');
    abilities.innerHTML = "Abilities: " + array.toString();
    console.log(abilities);
    return abilities;
}

function appendStats(array){
    const stats = document.createElement('li');
    stats.innerHTML = "Base Stats: " + array.toString();
    console.log(stats);
    return stats;
}
function appendMoves(array){
    const moves = document.createElement('p')
    moves.innerHTML = 'Moves: ' + array.toString();
    console.log(moves);
    return moves;
}
function appendDoubleDamageTo(array){
    const doubleDamage = document.createElement('li');
    doubleDamage.innerHTML = "Double Damage To: " + array.toString();
    console.log(doubleDamage);
    return doubleDamage;
}


function retrievePokemonInfo(url, name){
    const pokemonInfoPromise = fetch(url);
    const div = document.createElement('div');
    div.classList.add('pokemonItem')
    ul.append(div);
    pokemonInfoPromise
    .then((response) => response.json())

    .then((data) => {
        console.log(data);
        const pokemonImgUrl = data['sprites'].other['official-artwork']["front_default"];
        const pokemonTypes = (data) => {
            let typesArray = [];
            for( let i = 0; i < data["types"].length; i++){
                typesArray.push(' ' + data["types"][i].type["name"]);
            }
            return typesArray;
        }
        const pokemonAbilities = (data) => {
            let abilitiesArray = [];
            for ( let i = 0; i < data["abilities"].length; i++){
                abilitiesArray.push(' ' + data["abilities"][i].ability["name"]);
            }
            return abilitiesArray;
        }
        const pokemonStats = (data) => {
            let statsArray = [];
            for (let i = 0; i < data["stats"].length; i++){
                statsArray.push(' ' + data["stats"][i].stat["name"] + ': ' + data["stats"][i].base_stat);
            }
            return statsArray;
        }

        const pokemonMoves = (data) => {
            let movesArray = [];
            for( let i= 0; i < data["moves"].length; i++){
                movesArray.push(' ' + data['moves'][i].move["name"])
            }
            return movesArray;
        }

        async function doubleDamageTo(data) {
            const doubleDamageToArray = [];

            try {
                for (let i = 0; i < data['types'].length; i++) {
                    let typesUrl = data['types'][i]['type']['url']; // Access the URL from the correct path
                    const response = await fetch(typesUrl);
        
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
        
                    const dataset = await response.json();
                    
                    if (dataset['damage_relations']['double_damage_to'].length) {
                        for (let j = 0; j < dataset['damage_relations']['double_damage_to'].length; j++) {
                            doubleDamageToArray.push(' ' + dataset['damage_relations']['double_damage_to'][j]['name']);
                        }
                    }
                }
            } catch (error) {
                console.error("Error in doubleDamageTo function:", error);
                return [];
            }
            return doubleDamageToArray;
        }

        async function doubleDamageFrom(data) {
            const doubleDamageFromArray = [];

            try {
                for (let i = 0; i < data['types'].length; i++) {
                    let typesUrl = data['types'][i]['type']['url']; // Access the URL from the correct path
                    const response = await fetch(typesUrl);
        
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
        
                    const dataset = await response.json();
                    
                    if (dataset['damage_relations']['double_damage_from'].length) {
                        for (let j = 0; j < dataset['damage_relations']['double_damage_from'].length; j++) {
                            doubleDamageFromArray.push(' ' + dataset['damage_relations']['double_damage_from'][j]['name']);
                        }
                    }
                }
            } catch (error) {
                console.error("Error in doubleDamageFrom function:", error);
                return [];
            }
            return doubleDamageFromArray;
        }
        
        async function halfDamageTo(data) {
            const halfDamageToArray = [];

            try {
                for (let i = 0; i < data['types'].length; i++) {
                    let typesUrl = data['types'][i]['type']['url'];
                    const response = await fetch(typesUrl);
        
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
        
                    const dataset = await response.json();
                    
                    if (dataset['damage_relations']['half_damage_to'].length) {
                        for (let j = 0; j < dataset['damage_relations']['half_damage_to'].length; j++) {
                            halfDamageToArray.push(' ' + dataset['damage_relations']['half_damage_to'][j]['name']);
                        }
                    }
                }
            } catch (error) {
                console.error("Error in halfDamageTo function:", error);
                return [];
            }
            return halfDamageToArray;
        }

        async function halfDamageFrom(data) {
            const halfDamageFromArray = [];

            try {
                for (let i = 0; i < data['types'].length; i++) {
                    let typesUrl = data['types'][i]['type']['url'];
                    const response = await fetch(typesUrl);
        
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
        
                    const dataset = await response.json();
                    
                    if (dataset['damage_relations']['half_damage_from'].length) {
                        for (let j = 0; j < dataset['damage_relations']['half_damage_from'].length; j++) {
                            halfDamageFromArray.push(' ' + dataset['damage_relations']['half_damage_from'][j]['name']);
                        }
                    }
                }
            } catch (error) {
                console.error("Error in halfDamageFrom function:", error);
                return [];
            }
            return halfDamageFromArray;
        }

        
        div.append(appendNames(name));
        div.append(appendImg(pokemonImgUrl));
        div.append(appendTypes(pokemonTypes(data)));
        div.append(appendAbilities(pokemonAbilities(data)));
        div.append(appendStats(pokemonStats(data)));
        div.append(appendMoves(pokemonMoves(data)));
        doubleDamageTo(data).then((result) => {
            console.log(result);
            const doubleDamage = document.createElement('li');
            doubleDamage.innerHTML = "Double Damage To Types:" + result.toString();
            console.log(doubleDamage);
            return div.append(doubleDamage);
        });
        doubleDamageFrom(data).then((result) => {
            console.log(result);
            const doubleDamageFrom = document.createElement('li');
            doubleDamageFrom.innerHTML = "Double Damage Taken From Types:" + result.toString();
            console.log(doubleDamageFrom);
            return div.append(doubleDamageFrom);
        });
        halfDamageTo(data).then((result) => {
            console.log(result);
            const halfDamageTo = document.createElement('li');
            halfDamageTo.innerHTML = "Half Damage To Types:" + result.toString();
            console.log(halfDamageTo);
            return div.append(halfDamageTo);
        });
        halfDamageFrom(data).then((result) => {
            console.log(result);
            const halfDamageFrom = document.createElement('li');
            halfDamageFrom.innerHTML = "Half Damage From Types:" + result.toString();
            console.log(halfDamageFrom);
            return div.append(halfDamageFrom);
        });
    })
    
}

button.addEventListener("click", (event) => {
    console.log(event);
    const pokemonPromise = fetch (pokemonUrl);
    pokemonPromise
    .then((response)=> response.json())

    .then((data) => {
        console.log(data);
        const pokemonData = data['results'];
        console.log(pokemonData);
        pokemonUrl = data["next"];
        return displayPokemonInfo(pokemonData);
    })
})