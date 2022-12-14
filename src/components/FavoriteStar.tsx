import React, {LegacyRef, memo, Ref, useMemo} from "react";
import {PokeAPI} from "pokeapi-types";
import {PokemonItem} from "../server/router/pokeRouter";
import {useFavs} from "../hooks/FavContext";
import {useAutoAnimate} from "@formkit/auto-animate/react";

// renders a star button that allows the user to add/remove a pokemon to his favorites
export function FavoriteStar({pokemon}: { pokemon: PokeAPI.Pokemon }) {
    const [animationParent]: [LegacyRef<HTMLLabelElement> | undefined] = useAutoAnimate()

    // converts the pokemon details type to the type expected by the useFavs hook
    const pokePreview = useMemo(() => ({
        name: pokemon?.name,
        url: "",
        image: pokemon?.sprites.front_default,
        id: pokemon?.id
    } as unknown as PokemonItem), [pokemon]);

    // accesses context API
    const {favoritePokemon, addFavorite, removeFavorite} = useFavs();

    // checks if the pokemon is already in the list of favorite pokemons to determine if the star should be filled or not
    const isFavorite = useMemo(() => favoritePokemon.find((pok: PokemonItem) => pok.id === pokemon?.id), [favoritePokemon, pokemon]);

    return <label className="swap swap-flip" ref={animationParent}>
        <input type="checkbox" checked={Boolean(isFavorite)} onClick={() => {
            if (isFavorite) {
                removeFavorite(pokemon.id);
            } else {
                addFavorite(pokePreview);
            }
        }}/>
        <div className="swap-on text-yellow-300">★</div>
        <div className="swap-off text-yellow-300">☆</div>
    </label>;
}

export default memo(FavoriteStar);