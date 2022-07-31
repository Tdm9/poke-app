import React from "react";
import {PokeAPI} from "pokeapi-types";

// according to the pokemon wiki the maximum value for a base pokemon stat is 255
const MAX_STAT_VALUE = 255;

// renders a stat meter representing the stat value of a pokemon
export function CombatStats({base_stat, stat}: PokeAPI.PokemonStat) {
    return <div
        className={"flex flex-row flex-grow w-full justify-between"}>
        <h6 className={"ml-3 pr-8"}>{stat.name}</h6>
        <div className="indicator ">
            <span className="indicator-item indicator-middle indicator-start badge badge-secondary pr-4">
                {base_stat}
            </span>
            <div className="grid place-items-center ml-8">
                <progress className="progress progress-primary w-20 md:w-56" value={base_stat} max={MAX_STAT_VALUE}/>
            </div>

        </div>
    </div>;
}