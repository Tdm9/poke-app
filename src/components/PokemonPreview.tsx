import {PokemonItem} from "../server/router/pokeRouter";
import Link from "next/link";
import React from "react";

// displays a small card-like preview of a pokemon with its name, id and image
export function PokemonPreview({pokemon: {id, image, name}}: { pokemon: PokemonItem }) {
    return <Link href={`/pokemon/${id}`}>
        <a className="border p-4 border-grey my-2 hover:shadow-md capitalize flex items-center bg-gray-200 rounded-md">
            <img
                src={image}
                alt={name}
                className="w-20 h-20 mr-3"
            />
            <span className="mr-2 font-bold">{id}.</span>
            <h5>{name}</h5>

        </a>
    </Link>;
}

export default PokemonPreview;