import Layout from '../../components/Layout';
import Link from 'next/link';
import {trpc} from "../../utils/trpc";
import {useRouter} from "next/router";
import React, {memo, useEffect, useMemo} from "react";
import {MainPokemonInfo} from "../../components/MainPokemonInfo";
import {CombatStats} from "../../components/CombatStats";
import {FavoriteStar} from "../../components/FavoriteStar";

// displays the details of a pokemon in a card format
// these details include the pokemon's name, type, abilities, weight, height, image, stats, and a button to add it to the favorites
const PokemonDetails = ({}) => {
    // gets the id from the url path params
    const {id} = useRouter().query
    // fetches the list of pokemon details from the server
    const pokemon = trpc.useQuery(["pokeRouter.pokemonDetails", {id: id?.toString()}]);
    // renders each pokemon stat into a ranged meter
    const stats = useMemo(() => pokemon.data?.stats.map((stat) => <CombatStats key={'stat' + stat.stat.name} {...stat}/>), [pokemon.data?.stats]);

    // renders each pokemon type into a badge component
    const pokeTypes = useMemo(() => pokemon.data?.types.map((type, index) =>
        <div key={'type' + index} className="badge badge-primary badge-outline">{type.type.name}</div>), [pokemon.data?.types]);

    // renders the pokemon abilities into a list
    const pokeAbilities = useMemo(() => pokemon.data?.abilities.map(({ability}, index) => <p key={'ability' + index}>
        {"- " + ability.name.charAt(0).toUpperCase() + ability.name.slice(1)}
    </p>), [pokemon.data?.abilities]);

    return (
        <Layout title={pokemon?.data?.name!!}>
            <div className="card lg:w-2/3 w-screen bg-base-100 shadow-xl lg:left-[18%]">
                <figure>
                    <img className="mx-auto" src={pokemon?.data?.sprites.front_default} alt={pokemon?.data?.name}/>
                </figure>
                <div className="card-title justify-center">
                    <h3 className="text-4xl mb-2 text-center capitalize">
                        {pokemon?.data?.name}
                    </h3>
                    <FavoriteStar pokemon={pokemon?.data}/>

                </div>
                <div className="card-body">
                    {pokemon.data && <MainPokemonInfo pokemon={pokemon?.data}/>}

                    <div className="flex flex-col w-full lg:flex-row">
                        <div className="grid flex-grow card rounded-box place-items-center">
                            {stats}
                        </div>

                        <div className="divider lg:divider-horizontal"/>

                        <div className="grid flex-grow card rounded-box place-items-center">
                            <div className="px-4">
                                <h2 className="text-xl mt-6 mb-2 font-medium text-center">Abilities</h2>
                                {pokeAbilities}
                            </div>
                        </div>
                    </div>

                    <div className="card-actions justify-end">
                        {pokeTypes}
                    </div>

                </div>
            </div>


        </Layout>
    )
}

export default memo(PokemonDetails)