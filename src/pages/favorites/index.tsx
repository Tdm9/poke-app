import type {NextPage} from "next";
import Layout from "../../components/Layout";
import React, {useEffect} from "react";
import {PokemonPreview} from "../../components/PokemonPreview";
import {PokemonItem} from "../../server/router/pokeRouter";
import {useFavs} from "../../hooks/FavContext";

// renders the list of favorite pokemons in a grid format like the main page
const FavList = () => {
    const {favoritePokemon} = useFavs()

    return <ul className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8'}>
        {favoritePokemon?.map((pokemon: PokemonItem) => (
            <li key={'favoritepokemon' + pokemon.id} className="mb-4 md:mb-0 md:mr-4">
                <PokemonPreview pokemon={pokemon}/>
            </li>
        ))}</ul>;
}
// Page that displays the user favorite pokemons
const Favorites: NextPage = () => {


    return (
        <Layout title="NextJS PokeDex">
            <h1 className="text-4xl mb-8 text-center">NextJS Pokedex</h1>
            <FavList />
        </Layout>
    );
};

export default Favorites;
