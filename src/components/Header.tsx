import { Pokemon } from "./PokemonApp";
import SelectedPokemons from "./SelectedPokemons";
import { useTheme } from "./ThemeContext";
import ThemeSwitcher from "./ThemeSwitcher";

interface HeaderProps {
    selectedPokemons: Pokemon[];
    setBattle: (battle: boolean) => void;
}

export function Header({ selectedPokemons, setBattle }: HeaderProps) {
    const { theme } = useTheme();

    const handleStartBattle = () => {
        setBattle(true);
    }
    return (
        <div className={`${theme === "light" ? "bg-amber-100" : "bg-slate-800"} p-7 sticky top-0 z-10 shadow-lg w-full flex items-center justify-evenly`}>
            <div className="flex flex-col">
                <h1 className= "text-7xl text-center  font-thin text-slate-700">Pokémon Battle</h1>
                <ThemeSwitcher/>
            </div>
            <div className="flex flex-col">
                <p className="text-center mb-4">Select two Pokemons to start a battle</p>
                <SelectedPokemons pokemons={selectedPokemons} />
            </div>
            <button onClick={handleStartBattle} className="bg-amber-300 rounded-xl p-2 px-3 font-bold text-2xl disabled:opacity-50 disabled:cursor-not-allowed" disabled={selectedPokemons.length !== 2}>Start Battle</button>
        </div>
    );
}