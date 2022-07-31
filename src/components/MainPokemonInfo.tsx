import {PokeAPI} from "pokeapi-types";
import React, {memo} from "react";

// renders stat card containing the main stats of a pokemon (id, weight, height) on the details page
export function MainPokemonInfo({pokemon: {height, id, weight}}: { pokemon: PokeAPI.Pokemon }) {
    return <div className="stats stats-vertical lg:stats-horizontal shadow">

        <div className="stat place-items-center">
            <div className="stat-title">Weight</div>
            <div className="stat-value">{weight}</div>
        </div>

        <div className="stat place-items-center">
            <div className="stat-title">Height</div>
            <div className="stat-value text-secondary">{height}</div>
        </div>

        <div className="stat place-items-center">
            <div className="stat-title">Pokedex id</div>
            <div className="stat-value">{id}</div>
        </div>

    </div>;
}

export default memo(MainPokemonInfo);