import React, { useEffect, useState, useCallback } from 'react';
import { Pokemon } from './PokemonApp';
import Card from './Card';
import BattleAnnouncer from './BattleAnnouncer';


interface BattleProps {
    pokemons: Pokemon[];
    battle: boolean;
    setBattle: (battle: boolean) => void;
}
export const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const Battle: React.FC<BattleProps> = ({ pokemons, battle, setBattle }) => {
    if (!battle || pokemons.length !== 2) {
        return null;
    }
    const [message, setMessage] = useState<string>("BATTLE BEGINS!");
    const [attackerHp, setAttackerHp] = useState<number>(pokemons[0].speed > pokemons[1].speed ? pokemons[0].hp : pokemons[1].hp);
    const [defenderHp, setDefenderHp] = useState<number>(pokemons[0].speed > pokemons[1].speed ? pokemons[1].hp : pokemons[0].hp);
    const [turn, setTurn] = useState<number>(0);
    const [inSequence, setInSequence] = useState<boolean>(false);
    
    useEffect(() => {
        console.log(turn);
        if (!battle || pokemons.length !== 2) return;
        if (turn === 0) {
            setTurn(1);
        }
    }, [battle]);

    useEffect(() => {
        if (!battle || pokemons.length !== 2 || turn === 0) return;
        const attacker = pokemons[0].speed > pokemons[1].speed ? pokemons[0] : pokemons[1];
        const defender = attacker === pokemons[0] ? pokemons[1] : pokemons[0];

        const attackerAttack = attacker.attack > defender.defense 
            ? attacker.attack - defender.defense 
            : 0;
        const defenderAttack = defender.attack > attacker.defense 
            ? defender.attack - attacker.defense 
            : 0;
        const battleCheck = async () => {
            if (attackerAttack === 0 && defenderAttack === 0) {
                setMessage('DRAW!');
                await wait(2000);
                setMessage('BATTLE ENDS!');
                await wait(2000);
                setBattle(false);
                return;
            }
        }
        const battleSequence = async () => {
            if (inSequence) return;
            setInSequence(true);
            //attacker's turn
            await wait(2000);
            setMessage(`${attacker.name} attacks ${defender.name} with ${attackerAttack} damage!`);
            let updatedHP = defenderHp - attackerAttack < 0 ? 0 : defenderHp - attackerAttack;
            setDefenderHp(updatedHP);
            await wait(2000);
            if (attackerAttack === 0) {
                setMessage(`This is not very effective ...`);
                await wait(2000);
            } else {
                setMessage(`${defender.name} has ${updatedHP} HP left!`);
                await wait(2000);
            }
            if (updatedHP <= 0) {
                setMessage(`${defender.name} has fainted ...`);
                await wait(2000);
                setMessage('BATTLE ENDS!');
                await wait(2000);
                setBattle(false);
                return;
            }
            //defender's turn
            setMessage(`${defender.name} attacks ${attacker.name} with ${defenderAttack} damage!`);
            updatedHP = attackerHp - defenderAttack < 0 ? 0 : attackerHp - defenderAttack;
            setAttackerHp(updatedHP);
            await wait(2000);
            if (defenderAttack === 0) {
                setMessage(`This is not very effective ...`);
                await wait(2000);
            } else {
                setMessage(`${attacker.name} has ${updatedHP} HP left!`);
                await wait(2000);
            }
            if (updatedHP <= 0) {
                setMessage(`${attacker.name} has fainted ...`);
                await wait(2000);
                setMessage('BATTLE ENDS!');
                await wait(2000);
                setBattle(false);
                return;
            }
            setInSequence(false);
            setTurn(turn + 1);
        };
        battleCheck();
        battleSequence();
    }, [turn]);

    const handleCloseBattle = useCallback(() => {
        setBattle(false);
    }, [setBattle]);

    if (!battle || pokemons.length !== 2) {
        return null;
    }

    return (
        <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-amber-500 via-white to-red-500  flex flex-col items-center justify-between z-10 p-20 ${battle ? '' : 'hidden'}`}>
            <h1 className='text-9xl text-center m-4 font-black'>Battle</h1>
            <div className='self-end'>
                <Card 
                    pokemon={pokemons[0]} 
                    selected={false} 
                />
            </div>
            <div className='text-7xl font-bold text-red-500'>VS</div>
            <div className='self-start'>
                <Card 
                    pokemon={pokemons[1]} 
                    selected={false} 
                />
            </div>
            <BattleAnnouncer message={message} />
            <button onClick={handleCloseBattle}>Close</button>
        </div>
    );
}

export default Battle;