let colors = {
    fire: 'rgba(254,121,96)',
    water: 'rgba(107,185,234)',
    grass: 'rgba(145,207,139)',
    bug: 'rgba(177,211,105)',
    normal: 'rgba(207,207,195)',
    poison: 'rgba(180,134,220)',
    electric: 'rgba(255,230,76)',
    ground: 'rgba(191,156,115)',
    fairy: 'rgba(241,176,236)',
    fighting: 'rgba(207,136,124)',
    psychic: 'rgba(255,144,166)',
    steel: 'rgba(195,195,207)',
    dragon: 'rgba(135,153,209)',
    dark: 'rgba(131,124,124)',
    ice: 'rgba(157,221,210)',
    rock: 'rgba(207,194,146)',
    ghost: 'rgba(153,123,154)',
    flying: 'rgba(181,217,254)',
}

/****************************  Templates   ******************************************/

/**
 * This function renders the single poke-cards
 * @param {string} allPokeData 
 */
function showPokeCards(allPokeData) {
    document.getElementById('content').innerHTML = '';
    for (let i = 0; i < allPokeData.length; i++) {
        let types = allPokeData[i].types;
        let bgColor = colors[types[0].type.name];
        document.getElementById('content').innerHTML += `<div class="poke-card" id="poke-card" onclick="openCardOverview(${i})" style="background-color:${bgColor}">     
                           <div class="poke-name" style="background-color:${bgColor}">
                               <h3  style="background-color:${bgColor}">${allPokeData[i]['name'].toUpperCase().charAt(0) + allPokeData[i]['name'].slice(1)}</h3>
                                     <span id="poke-number" style="background-color:${bgColor}"><b> #0${allPokeData[i]['id']}</b></span>
                                             </div>
                                      <img id="poke-image" src="${allPokeData[i]['sprites']['other']['official-artwork']['front_default']}">
                                        <div class="types"><span>${allPokeData[i]['types'][0]['type']['name']}</span></div>
      </div>`;
    }
}


/**
* This function renders the single pokemon overview card
* @param {index} i - index of single pokemon
*/
function renderOverviewTemplate(i) {
    let types = allPokeData[i].types;
    let bgColor = colors[types[0].type.name];
    let overview = document.getElementById('overview');
    overview.innerHTML += `     
    <div class="detail-card" style="background-color:${bgColor}">
        <div class="detail-top">
             <div class="poke-name poke-name-big">
                 <h2>${allPokeData[i]['name'].toUpperCase().charAt(0) + allPokeData[i]['name'].slice(1)}</h2>
                     <span id="poke-number" class="poke-number-big"><b> #0${allPokeData[i]['id']}</b></span>
                        <span id="close-window" onclick="hideOverview(${i})"> X </span></div>
                             <img class="poke-img-big"  src="${allPokeData[i]['sprites']['other']['official-artwork']['front_default']}">
                                <div class="arrows"><a onclick="previousPokemon(${i})"><img src="icons/arrow-left.png" id="arrow-left"></a><a><img src="icons/arrow-right.png" onclick="nextPokemon(${i})"></a></div>
                                  <div class="types"><span>${allPokeData[i]['types'][0]['type']['name']}</span></div>
                                  </div>
              
                    <div class="about"> <span onclick="aboutTemplate(${i})">About</span><span onclick="renderStats(${i})">Stats</span><span onclick="loadMoves(${i})">Moves</span></div>
                       <div class="about-content" id="information"></div>
                           </div>
                            
     </div>`;
    aboutTemplate(i);
}


/**
* This function displays the data of the specific pokemon in pokemon overview
* @param {index} i - index of pokemon
*/
function aboutTemplate(i) {
    document.getElementById('information').innerHTML = '';
    document.getElementById('information').innerHTML += ` <div>
                                                            <div class="about-box" id="about-box"style="color:grey;"><div><span>Pokedex-Number</span><span>#0${allPokeData[i]['id']}</span></div>
                                                              <div><span>Height :</span><span>${allPokeData[i]['height'] * 10} cm </span> </div>
                                                                <div><span>Weight :</span><span>${allPokeData[i]['weight'] / 10} kg</span> </div>
                                                                   <div><span>Experience :</span><span>${allPokeData[i]['base_experience']} </span></div>
                                                                     <div><span>Ability :</span><span> ${allPokeData[i]['abilities'][0]['ability']['name']}</span></div>
                                                                     <div><span>Ability :</span><span> ${allPokeData[i]['abilities'][1] ? allPokeData[i]['abilities'][1]['ability']['name'] : 'N/A'}</span></div>  
   </div> `;
}