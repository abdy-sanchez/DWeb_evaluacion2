
async function PokeQuery(pokeURL,pokeName){

    let url = pokeURL + pokeName;

    let response ;

    try {

        response = await axios.get(url);

        return response.data;
        
    } catch (error) {

        console.error(`API Error: ${error}`);
        
    }

};









//Funcion para el despliegue de resultados


async function ShowResults(textName){

    //Secciones principales del HTML

    let errorCard = document.querySelector('[class="containerError"]');

    let pokeInfo = document.querySelector('[class="containerInfo"]');

    let evolveButton = document.querySelector('[class="containerEvolution"]');

    //Llamado de la funcion para hacer la peticion

    const pokeResults = await PokeQuery('https://pokeapi.co/api/v2/pokemon/',textName);

  
    if(!pokeResults ||  textName == ''){

        errorCard.style.display = 'block';

        pokeInfo.style.display = 'none';

        evolveButton.style.display = 'none';

    }else{

        errorCard.style.display = 'none';

        pokeInfo.style.display = 'block';
        
 


        //Relleno con la info obtenida

        const pokemonName = document.querySelector('[class="pokemonName"]');

        pokemonName.innerHTML = pokeResults.name;

        const pokemonImg = document.querySelector('[class="pokemonImg"]');

        pokemonImg.src = pokeResults.sprites.other["official-artwork"].front_default;


        const pokemonType = document.querySelector('[class="pokemonType"]');

        let pokeTypeList = [];

        pokeResults.types.forEach(e=>pokeTypeList.push(e.type.name));

        let pokeTypeListText = pokeTypeList.join(', ');

        pokemonType.innerHTML = pokeTypeListText;


        const pokemonAbilities = document.querySelector('[class="pokemonAbilities"]');

        let pokeAbilitiesList = [];

        pokeResults.abilities.forEach(e=>pokeAbilitiesList.push(e.ability.name));

        let pokeAbilitiesListText = pokeAbilitiesList.join(', ');

        pokemonAbilities.innerHTML = pokeAbilitiesListText;

        const pokeID = pokeResults.id;

        
        //Se realiza otra petición para los otros datos


        const pokeEXTRAResults = await PokeQuery('https://pokeapi.co/api/v2/pokemon-species/',pokeID);

        const pokemonDescrition = document.querySelector('[class="pokemonDescrition"]');

        pokemonDescrition.innerHTML = pokeEXTRAResults.flavor_text_entries[0].flavor_text;


        //Mostrar Boton evolve

        const evolveURL = pokeEXTRAResults.evolution_chain.url;


        const pokeEvolveResults = await PokeQuery(evolveURL,'');

        localStorage.clear();


        if(pokeEvolveResults.chain.evolves_to[0]){

            evolveButton.style.display = 'block';

            localStorage.setItem("pokeEvolve",pokeEvolveResults.chain.evolves_to[0].species.name);


        }else{

            evolveButton.style.display = 'none';
           
        }

    }

};



//Funcion Principal para el boton EVOLUCIONAR

let buttonEvolution = document.querySelector('[class="buttonEvolution"]');

if(buttonEvolution){

    buttonEvolution.addEventListener("click",()=>{


        //Captura de los parametros de busqueda
    
        const pokeEVOLVE = localStorage.getItem("pokeEvolve");
    
        ShowResults(pokeEVOLVE);
    
    });

}





//Funcion Principal para el boton buscar

let searchButton = document.querySelector('[class="buttonSearch"]');

searchButton.addEventListener("click",()=>{


    //Captura de los parametros de busqueda

    const inputText = document.querySelector('[id="in1"]').value ;

    ShowResults(inputText);

});