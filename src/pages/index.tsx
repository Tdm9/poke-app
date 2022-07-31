import type {NextPage} from "next";
import {trpc} from "../utils/trpc";
import Layout from "../components/Layout";
import React, {useMemo} from "react";
import {Pagination} from "../components/Pagination";
import {PokemonPreview} from "../components/PokemonPreview";

// displays the list of pokemons in a grid format like a pokedex
const Home: NextPage = () => {
    const [page, setPage] = React.useState(1);
    // fetches the list of pokemons from the server
    const pokemon = trpc.useQuery(["pokeRouter.pokemon", {page: page}]);

    // List/Grid of pokemon previews
    const pokePreviews = useMemo(() => pokemon.data?.map(pokemon => (
            <li key={'pokemon' + pokemon.id} className="mb-4 md:mb-0 md:mr-4">
                <PokemonPreview pokemon={pokemon}/>
            </li>
        )), [pokemon]);

    return (
        <Layout title="PokeDex">
            <h1 className="text-4xl mb-8 text-center">Pokedex</h1>
            <ul className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8'}>
                {pokePreviews}
            </ul>
            <Pagination page={page} setPage={setPage}/>
        </Layout>
    );
};

export default Home;
