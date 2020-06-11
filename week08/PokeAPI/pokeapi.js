const pBtn = document.querySelector('#pokemonPreBtn');
            const nBtn = document.querySelector('#pokemonNextBtn');
            async function getPokemon(url) {
                if (url != "" || null) {
                    try {
                        const response = await fetch(url);
                        if (!response.ok) {
                            throw Error(response.statusText)
                        } else {
                            const fetchJson = await response.json();
                            console.log(fetchJson)
                            renderPokemon(fetchJson)
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
                
            }

            function renderPokemon(data) {
                const pokemonContainer = document.querySelector('#pokemonList');
                console.log(pokemonContainer);
                //remove all child nodes
                while (pokemonContainer.hasChildNodes()) {
                    pokemonContainer.removeChild(pokemonContainer.firstChild);
                }

                if (data.next || data.previous) {
                    console.log(data.previous);
                    //nBtn.textContent = "Next";
                    pBtn.setAttribute("style", "float:right; display:block");
                    //pBtn.setAttribute("class", "btn");
                    if (data.previous == null) {
                        pBtn.setAttribute('ontouchend', `getPokemon('${""}')`);
                        pBtn.setAttribute('onclick', `getPokemon('${""}')`);
                    } else {
                        pBtn.setAttribute('ontouchend', `getPokemon('${data.previous}')`);
                        pBtn.setAttribute('onclick', `getPokemon('${data.previous}')`);
                    }
                    

                    nBtn.textContent = "Next";
                    nBtn.setAttribute("style", "float:right");
                    nBtn.setAttribute('ontouchend', `getPokemon('${data.next}')`);
                    nBtn.setAttribute('onclick', `getPokemon('${data.next}')`);
                }
                
                console.log(data.results);
                data.results.forEach( pokemon => {
                    const listItem = document.createElement('li');
                    listItem.setAttribute("class", "list-group-item");
                   // listItem.setAttribute("class", "list-group-item");
                    listItem.innerHTML =
                    `
                        <span>${pokemon.name}</span> <button class="btn btn-primary btn-sm" ontouchend="getDetails('${pokemon.name}', '${pokemon.url}')" onclick="getDetails('${pokemon.name}', '${pokemon.url}')">View</button>
                    `
                    listItem.id = pokemon.name;
                    pokemonContainer.appendChild(listItem);
                })
            }
            
            function getDetails(id, url) {                                  //id=pokemon.name, url=details of pokemon
                fetch(url)
                    .then( res => res.json() )                              //response a string of array
                    .then( json => {                                        //response promise  (=> a fat arrow syntax)
                        console.log('DETAILS ', json);
                        var li = document.getElementById(id);
                        var div = document.createElement('div');            //create div for image
                        div.innerHTML = 
                        `
                            <img src="${json.sprites.front_default}" />
                            <div>
                            <p>Base Experience: ${json.base_experience}</p>
                            <p>Height: ${json.height}</p>
                            <p>Weight: ${json.weight}</p>
                            </div>

                        `
                        //li.lastElementChild.textContent = "Close";
                        //li.setAttribute('onclick', li.setAttribute("style", "display:none"));
                        li.lastElementChild.remove();                       //remove button
                        li.appendChild(div);                                //append Child again
                    })
            }