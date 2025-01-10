import { match } from "ts-pattern";

export function GetTypeColor(type: string) {
    // console.log(type);
    return match(type)
    .with("Poison", () => "bg-purple-300")
    .with("Feu", () => "bg-red-300")
    .with("Eau", () => "bg-blue-300")
    .with("Insect", () => "bg-lime-300")
    .with("Électrik", () => "bg-yellow-300")
    .with("Sol", () => "bg-brown-300")
    .with("Vol", () => "bg-cyan-100")
    .with("Combat", () => "bg-orange-600")
    .with("Psy", () => "bg-violet-500")
    .with("Acier", () => "bg-neutral-400")
    .with("Plante", () => "bg-green-300")
    .with("Roche", () => "bg-stone-500")
    .with("Dragon", () => "bg-blue-500")
    .with("Ténèbres", () => "bg-purple-600")
    .with("Fée", () => "bg-rose-300")
    .otherwise(() => "bg-neutral-200");
}