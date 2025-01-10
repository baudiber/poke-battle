import React, { useState, useEffect } from 'react';
import PokemonList from './PokemonList';
import SearchBar from './SearchBar';
import TypeSelector from './TypeSelector';
import Battle from './Battle';
import { Header } from './Header';
import { useTheme } from './ThemeContext';

export interface Pokemon {
    id: number;
    types: PokemonType[];
    name: string;
    imageUrl: string;
    hp: number;
    attack: number;
    speed: number;
    defense: number;
  }

export interface PokemonType {
    id: number;
    name: string;
    image: string;
    englishName: string;
}

const PokemonApp: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string[] | null>(null);
  const [pokemonTypes, setPokemonTypes] = useState<PokemonType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentCount, setCurrentCount] = useState(20);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon[]>([]);
  const [battle, setBattle] = useState<boolean>(false);
  const { theme } = useTheme();

  useEffect(() => {
    const getPokemon = async () => {
        try {
            const response = await fetch('https://pokebuildapi.fr/api/v1/pokemon');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            // Map the data to fit the PokemonData interface
            const mappedData = data.map((poke: any) => ({
                id: poke.id,
                name: poke.name,
                imageUrl: poke.image,
                types: poke.apiTypes,
                hp: poke.stats.HP,
                attack: poke.stats.attack,
                speed: poke.stats.speed,
                defense: poke.stats.defense,
            }));
            setPokemonList(mappedData);
        } catch (error) {
            setError('Failed to fetch Pokémon data.');
        } finally {
            setLoading(false);
        }
    };
    const getTypes = async () => {
        const response = await fetch('https://pokebuildapi.fr/api/v1/types');
        const data = await response.json();
        setPokemonTypes(data);
    };

    getPokemon();
    getTypes();
  }, []);
  
  useEffect(() => {
    if (!battle) {
      setSelectedPokemon([]);
    }
  }, [battle])

  useEffect(() => {
    let updatedList = pokemonList;

    if (searchQuery) {
      updatedList = updatedList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedType) {
      console.log(selectedType);
      updatedList = updatedList.filter((pokemon) => { 
        if (pokemon.types.length === 1 && selectedType.length === 1) {
            return selectedType.includes(pokemon.types[0].name);
        } else if (pokemon.types.length === 2 && selectedType.length === 2) {
            return selectedType.includes(pokemon.types[0].name) && selectedType.includes(pokemon.types[1].name);
        } else {
            return false;
        }
      });
    }
    
    if (!selectedType && !searchQuery) {
        setFilteredPokemon(pokemonList.slice(0, currentCount));
    } else {
        setFilteredPokemon(updatedList);
    }
  }, [searchQuery, selectedType, pokemonList, currentCount]);

  if (loading) {
    return (
      <div className="flex items-center h-screen">
        <div className="text-lg text-center w-full">Loading Pokemons...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center h-screen">
        <div className="text-lg text-center w-full">Error: {error}</div>
      </div>
    );
  }

  const handleTypeSelection = (type: string[] | null) => {
    setSelectedType(type);
  };

  const loadMore = () => {
    setCurrentCount(prevCount => prevCount + 20);
  };

  const handlePokemonSelect = (pokemon: Pokemon) => {
    if (selectedPokemon.includes(pokemon)){
        setSelectedPokemon(selectedPokemon.filter(p => p.id !== pokemon.id));
    } else if (selectedPokemon.length < 2) {
        setSelectedPokemon([...selectedPokemon, pokemon]);
    }
  };

  return (
    <div className={`${theme === "light" ? "bg-amber-50" : "bg-slate-800"} flex flex-col items-center`}>
      <Battle pokemons={selectedPokemon} battle={battle} setBattle={setBattle} />
      <Header selectedPokemons={selectedPokemon} setBattle={setBattle}/>
      <SearchBar onSearch={setSearchQuery} />
      <TypeSelector onTypeSelect={handleTypeSelection} types={pokemonTypes} />
      {!battle && <PokemonList selectedPokemon={selectedPokemon} pokemon={filteredPokemon} onPokemonSelect={handlePokemonSelect}/>}
      {currentCount < pokemonList.length && (!selectedType && !searchQuery) &&(
        <button onClick={loadMore} className="bg-amber-300 rounded-xl p-2  px-3 m-5 mb-14 text-center">
          Load More
        </button>
      )}
    </div>
  );
};

export default PokemonApp;
