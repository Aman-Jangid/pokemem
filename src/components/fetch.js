async function fetchPokemon(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!response.ok) {
    console.log('error failed to fetch data');
  }
  const data = await response.json();
  return data;
}

export default async function fetchMultiplePokemon(setLoading, from, length) {
  setLoading(true);
  const IDs = Array.from({ length }, (_, i) => i + from);
  const promises = IDs.map((id) => fetchPokemon(id));

  const pokemonData = await Promise.all(promises);
  return pokemonData;
}
