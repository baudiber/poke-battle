import React from 'react';
import { Pokemon } from './PokemonApp';
import { useTheme } from "./ThemeContext";
import Card from './Card';
// import { GetTypeColor } from '../utils';

interface PokemonListProps {
  pokemon: Pokemon[];
  onPokemonSelect: (pokemon: Pokemon) => void;
  selectedPokemon: Pokemon[];
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemon, onPokemonSelect, selectedPokemon }) => {
  const { theme } = useTheme();

  if (pokemon.length === 0) {
    return (
      <div className="flex items-center">
        <div className="text-lg text-center w-full">No Pokemon found</div>
      </div>
    );
  }
  const handlePokemonSelect = (pokemon: Pokemon) => {
    onPokemonSelect(pokemon);
  };

  return (
    <div className={`p-4 grid grid-cols-4 gap-10 place-items-center ${theme === 'light' ? '' : 'bg-slate-800'}`}>
        {pokemon.map((p) => (
            <button onClick={() => handlePokemonSelect(p)}>
              <Card pokemon={p} selected={selectedPokemon.includes(p)}/>
            </button>
        ))}
    </div>
  );
};

export default PokemonList;
