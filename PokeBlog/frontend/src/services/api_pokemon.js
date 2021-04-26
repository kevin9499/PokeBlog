export { fetchPokemon , fetchAllPokemon};

function fetchPokemon(name) {
  const _apiBaseUrl = 'https://pokeapi.co/api/v2/pokemon/';
  return fetch(`${_apiBaseUrl}${name}`)
  .then(res => res.json())
  .then((result) => {
    return result
  })
}

function fetchAllPokemon() {
  const _apiBaseUrl = 'https://pokeapi.co/api/v2/pokemon/';
  return fetch(`${_apiBaseUrl}`)
  .then(res => res.json())
  .then((result) => {
    return result
  })
}

