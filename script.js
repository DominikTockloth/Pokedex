const allPokeData = [];
let loadedPokemon = 20;
let loadAnimation = document.getElementById('loader');
let content = document.getElementById('content');
let loadBtn = document.querySelector('.load-btn');
let animation = document.getElementById('animation');
let input = document.getElementById('input').value;

async function loadPokemon() {
  loadAnimation.classList.remove('d-none');
  for (let i = loadedPokemon - 20; i < loadedPokemon; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i + 1}`;
    let response = await fetch(url);
    let pokeData = await response.json();
    allPokeData.push(pokeData);
  }
  setTimeout(() => {
    showPokeCards(allPokeData);
    loadBtn.classList.remove('d-none');
    animation.style.display = 'none';
  }, 3000);

}


/**
 * This is to load 20 more pokemon to the content html-element
 */
function loadMorePokemon() {
  animation.style.display = 'flex';
  loadedPokemon += 20;
  loadPokemon();
  setTimeout(() => {
    animation.style.display = 'none';

  }, 3500);
}


/**
 * This function displays the single pokemon overview
 * @param {index} i 
 */
function openCardOverview(i) {
  document.getElementById('overview').classList.remove('d-none');
  document.getElementById('overview').classList.add('blur');
  document.getElementById('overview').style.position = 'fixed';
  renderOverviewTemplate(i);
}


/**
 * This is to hide the overview pokemon card
 */
function hideOverview() {
  document.getElementById('content').classList.remove('blur');
  document.getElementById('overview').classList.add('d-none');
  document.getElementById('overview').innerHTML = '';
  showPokeCards(allPokeData);
}


/**
 * This function displays the stats of the specific pokemon in pokemon overview
 * @param {index} i - index of pokemon
 */
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


/**
 * This function displays the move-set of the specific pokemon in pokemon overview
 * @param {index} i - index of pokemon
 */
function loadMoves(i) {
  document.getElementById('information').innerHTML = '<div class="move-content d-none" id="move-content"></div>';
  for (let k = 0; k < allPokeData[i]['moves'].length; k++) {
    const move = allPokeData[i]['moves'][k]['move']['name'];
    let types = allPokeData[i].types;
    let bgColor = colors[types[0].type.name];
    document.getElementById('move-content').innerHTML += `<span style="background-color:${bgColor};">${move.charAt(0).toUpperCase() + move.slice(1)}</span>`;
  }
}


/**
 * This is to switch to the next pokemon in array
 * @param {index} i 
 */
function nextPokemon(i) {
  document.getElementById('overview').innerHTML = '';
  if (i < allPokeData.length - 1)
    openCardOverview(i + 1);
  if (i >= allPokeData.length - 1) {
    hideOverview();
  }
}


/**
 * This is to switch to the previous pokemon in array
 * @param {index} i 
 */
function previousPokemon(i) {
  document.getElementById('overview').innerHTML = '';
  if (i > 0) {
    openCardOverview(i - 1);
  } if (i === 0)
    openCardOverview(i);
}


/**
 * This is to filter for specific pokemon in header-section
*/
function searchForPokemon() {
  let input = document.getElementById('input').value;
  let cards = document.getElementsByClassName('poke-card');
  for (let i = 0; i < cards.length; i++) {
    let pokeName = cards[i].innerText.trim().split('\n')[0].toLowerCase();
    if (pokeName.includes(input)) {
      cards[i].style.display = 'block';
    } else {
      cards[i].style.display = 'none';
    }

  }
}







