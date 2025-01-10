import React from 'react';
import { Pokemon } from './PokemonApp';
import { MiniCard } from './Card';

interface SelectedPokemonsProps {
    pokemons: Pokemon[];
}

const SelectedPokemons: React.FC<SelectedPokemonsProps> = ({ pokemons }) => {
    const emptyPokemon : Pokemon = {
        id: 0,
        name: "Pokemon 1",
        imageUrl: "https://i.imgur.com/ByJBfk2.png",
        types: [],
        hp: 0,
        attack: 0,
        speed: 0,
        defense: 0,
    };
    const emptyPokemon2 : Pokemon = {
        id: 0,
        name: "Pokemon 2",
        imageUrl: "https://i.imgur.com/2IrJ3qq.png",
        types: [],
        hp: 0,
        attack: 0,
        speed: 0,
        defense: 0,
    };
    if (pokemons.length === 0) {
        return (
            <div className='flex gap-4 justify-center items-center'>
                <MiniCard pokemon={emptyPokemon} selected={true}/>
                <MiniCard pokemon={emptyPokemon2} selected={true}/>
            </div>
        );
    } else if (pokemons.length === 1) {
        return (
            <div className='flex gap-4 justify-center items-center'>
                <MiniCard pokemon={pokemons[0]} selected={true}/>
                <MiniCard pokemon={emptyPokemon2} selected={true}/>
            </div>
        );
    }
    return (
        <div className='flex gap-4 justify-center items-center'>
            {pokemons.map((pokemon) => (
                <MiniCard pokemon={pokemon} selected={true}/>
            ))}
        </div>
    );
}

export default SelectedPokemons;