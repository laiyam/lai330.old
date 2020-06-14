let nextLink = '';
let prevLink = '';

const getPokemonsUrl = (limit=10, offset=0) => {
  return `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
}

const renderList = (list) => {
  const ul = document.getElementById('pokelist');
  list && list.forEach(pokemon => {
    const element = document.createElement('li');
    element.innerHTML = `<div id=${pokemon.name}>
    <a href="#" onclick="renderDetails('${pokemon.url}')"> ${pokemon.name}</a>
    </div>`
    ul.appendChild(element);
  });
}

const renderDetails = (url) => {
    fetch(url)
        .then(response => response.json())
        .then(response => {
            document.getElementById('name').innerHTML = `${response.name}`;
            document.getElementById('ability').innerHTML = `${response.abilities[0].ability.name}`;
            document.getElementById('is_hidden').innerHTML = `${response.abilities[0].is_hidden}`;
            document.getElementById('slot').innerHTML = `${response.abilities[0].slot}`;
            document.getElementById('details').classList.remove('hidden');
            console.log(response);
        })
        .catch(err => console.log(err)); 

    url = url.replace(/pokemon/g, 'pokemon-form');
    fetch(url)
    .then(response => response.json())
    .then(response => {
        document.getElementById('image1').src = `${response.sprites.back_default}`
        document.getElementById('image2').src = `${response.sprites.front_default}`
        document.getElementById('battle').innerHTML = `${response.is_battle_only}`
        document.getElementById('id').innerHTML = `${response.id}`
        console.log(response);
    })
    .catch(err => console.log(err)); 
}

const showPokemons = () => {
  const url = getPokemonsUrl(10,0)
  fetch(url)
    .then(response => {
      response.json().then(parseResponse);
    })
    .catch(err => console.log(err)) 
}

const nextAction = () => {
  if (!nextLink) return;
  fetch(nextLink)
    .then(response => {
      response.json().then(parseResponse);
    })
    .catch(err => console.log(err)) 
}

const pageAction = () => {
  if (!pageLink) return;
  fetch(pageLink)
    .then(response => {
      response.json().then(parseResponse);
    })
    .catch(err => console.log(err)) 
}

const prevAction = () => {
  if (!prevLink) return;
  fetch(prevLink)
    .then(response => {
      response.json().then(parseResponse);
    })
    .catch(err => console.log(err)) 
}

const addActions = () => {
  const actions = document.getElementById('actions');
  const prev = document.createElement('button');
  prev.onclick = prevAction;
  prev.innerHTML = 'Prev';
  actions.appendChild(prev);
  
  const page1 = document.createElement('button');
  next.onclick = pageAction;
  next.innerHTML = 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20';
  actions.appendChild(page1);
  
  const page2 = document.createElement('button');
  next.onclick = pageAction;
  next.innerHTML = 'https://pokeapi.co/api/v2/pokemon?offset=40&limit=20';
  actions.appendChild(page2);
  
  const page3 = document.createElement('button');
  next.onclick = pageAction;
  next.innerHTML = 'https://pokeapi.co/api/v2/pokemon?offset=60&limit=20';
  actions.appendChild(page3);
  
  const page4 = document.createElement('button');
  next.onclick = pageAction;
  next.innerHTML = 'https://pokeapi.co/api/v2/pokemon?offset=80&limit=20';
  actions.appendChild(page4);
  
  const page5 = document.createElement('button');
  next.onclick = pageAction;
  next.innerHTML = 'https://pokeapi.co/api/v2/pokemon?offset=100&limit=20';
  actions.appendChild(page5);
  
  const next = document.createElement('button');
  next.onclick = nextAction;
  next.innerHTML = 'Next';
  actions.appendChild(next);
}

const parseResponse = response => {
  cleanList();
  renderList(response.results);
  nextLink = response.next;
  
  prevLink = response.previous;
}

const cleanList = () => {
  const ul = document.getElementById('pokelist');
  ul.innerHTML = '';
}

const init = () => {
  showPokemons();
  addActions();
}

init();

