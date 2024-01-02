const allPokeData = [];
const limitOfPokemon = 50;
let listOfFilteredPokemon;

async function loadPokemon() {
  for (let i = 0; i < limitOfPokemon; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}`;
    let response = await fetch(url);
    let pokeData = await response.json();
    allPokeData.push(pokeData);
  }
  showPokeCards(allPokeData);
}


function showPokeCards(allPokeData) {
  document.getElementById('content').innerHTML = '';
  for (let i = 0; i < allPokeData.length; i++) {

    document.getElementById('content').innerHTML += `<div class="poke-card" id="poke-card" onclick="openCardOverview(${i})">
                                   
                         <div class="poke-name">
                             <h3 >${allPokeData[i]['name'].toUpperCase().charAt(0) + allPokeData[i]['name'].slice(1)}</h3>
                                   <span id="poke-number"><b> #0${allPokeData[i]['id']}</b></span>
                                           </div>
                                    <img id="poke-image" src="${allPokeData[i]['sprites']['other']['official-artwork']['front_default']}">
                                      <div class="types"><span>${allPokeData[i]['types'][0]['type']['name']}</span></div>
    </div>`;
  }
}


function openCardOverview(i) {
  document.getElementById('head').classList.add('blur');
  document.getElementById('content').classList.add('blur');
  document.getElementById('content').classList.add('disable');
  document.getElementById('overview').classList.remove('d-none');
  renderOverviewTemplate(i);
}


function hideOverview() {
 document.getElementById('head').classList.remove('blur');
  document.getElementById('content').classList.remove('blur');
  document.getElementById('content').classList.remove('disable');
  document.getElementById('overview').classList.add('d-none');
  document.getElementById('overview').innerHTML = '';
  showPokeCards(allPokeData);
}


function renderOverviewTemplate(i) {
  let overview = document.getElementById('overview');
  overview.innerHTML += `       <div class="poke-name poke-name-big">
                                   <h2>${allPokeData[i]['name'].toUpperCase().charAt(0) + allPokeData[i]['name'].slice(1)}</h2>
                                       <span id="poke-number" class="poke-number-big"><b> #0${allPokeData[i]['id']}</b></span>
                                          <span id="close-window" onclick="hideOverview(${i})"> X </span></div>
                                             <img class="poke-img-big" id="poke-image" src="${allPokeData[i]['sprites']['other']['official-artwork']['front_default']}">
                                             <div class="arrows"><a onclick="previousPokemon(${i})"><img src="icons/arrow-left.png" id="arrow-left"></a><a><img src="icons/arrow-right.png" onclick="nextPokemon(${i})"></a></div>
                                               <div class="types"><span>${allPokeData[i]['types'][0]['type']['name']}</span></div>
                                                 <div class="about"> <span onclick="aboutTemplate(${i})">About</span><span onclick="renderStats(${i})">Stats</span><span onclick="loadMoves(${i})">Moves</span></div>
                                                   <div class="about-content" id="information"></div>
                               </div>`;
  aboutTemplate(i);
}


function aboutTemplate(i) {
  document.getElementById('information').innerHTML = '';
  document.getElementById('information').innerHTML += ` <div>
                                                          <div class="about-box" id="about-box"><div><span>Pokedex-Number</span><span>#0${allPokeData[i]['id']}</span></div>
                                                            <div><span>Height :</span><span>${allPokeData[i]['height'] * 10} cm </span> </div>
                                                              <div><span>Weight :</span><span>${allPokeData[i]['weight'] / 10} kg</span> </div>
                                                                 <div><span>Experience :</span><span>${allPokeData[i]['base_experience']} </span></div>
                                                                   <div><span>Ability :</span><span> ${allPokeData[i]['abilities'][0]['ability']['name']}</span></div>
                                                                   <div><span>Ability :</span><span> ${allPokeData[i]['abilities'][1]['ability']['name']}</span></div>  
 </div> `;
}


function renderStats(i) {
  document.getElementById('information').innerHTML = '';
  document.getElementById('information').innerHTML = `<div class="chartContainer">
                                                                <canvas id="myChart"></canvas></div>`;

  const ctx = document.getElementById('myChart');
  let allStats = [];
  for (let j = 0; j < allPokeData[i]['stats'].length; j++) {
    let stats = allPokeData[i]['stats'][j]['base_stat'];
    allStats.push(stats);
  };
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['HP', 'Attack', 'Defense', 'Special-Attack', 'Special-Defense', 'Speed'],
      datasets: [{
        label: `${allPokeData[i]['name'].toUpperCase().charAt(0) + allPokeData[i]['name'].slice(1)}`,
        data: allStats,
        borderWidth: 1
      }]
    },
    options: {
      indexAxis: 'y',
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

}


function loadMoves(i) {
  document.getElementById('information').innerHTML = '<div class="move-content d-none" id="move-content"></div>';
  for (let k = 0; k < allPokeData[i]['moves'].length; k++) {
    const move = allPokeData[i]['moves'][k]['move']['name'];
    document.getElementById('move-content').innerHTML += `<span>${move.charAt(0).toUpperCase() + move.slice(1)}</span>`;
  }
}


function nextPokemon(i) {
  document.getElementById('overview').innerHTML = '';
  if (i < allPokeData.length - 1)
    openCardOverview(i + 1);
  if (i === 49)
    openCardOverview(i);
}


function previousPokemon(i) {
  document.getElementById('overview').innerHTML = '';
  if (i > 0) {
    openCardOverview(i - 1);
  } if (i === 0)
    openCardOverview(i);
}


function searchForPokemon() {
  let input = document.getElementById('input').value;
  searchValue = input.toLowerCase();

  let content = document.getElementById('content');
  content.innerHTML = '';
  listOfFilteredPokemon = [];
  for (let i = 0; i < allPokeData.length; i++) {
    let searchedPokemon = allPokeData[i]['name'];
    if (searchedPokemon.toLowerCase().includes(input)) {
      let filteredPokemon = allPokeData[i];
      listOfFilteredPokemon.push(filteredPokemon);
    }

  }
  showPokeCards(listOfFilteredPokemon);
}


function resetSearch() {
  document.getElementById('content').innerHTML = '';
  showPokeCards(allPokeData);
  document.getElementById('input').innerHTML = '';
}


function stopLoader() {
  if ('content' === !'')
    document.getElementById('load').classList.add('d-none');
}



