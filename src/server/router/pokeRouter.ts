import {createRouter} from "./context";
import {z} from "zod";
import {PokeAPI} from "pokeapi-types";

const API_URL = "https://pokeapi.co/api/v2/";

export type pokemon = {
    name: string;
    url: string;
}
/**
 * @type PokemonItem
 * @property {string} name
 * @property {string} url
 * @property {string} image
 * @property {number} id
 */
export type PokemonItem = pokemon & {
    image: string;
    id: number;
}

// creates the trcp api layer for the pokeapi
export const pokeRouter = createRouter()
    .query("pokemon", {
        // defines a schema for this query input
        input: z.object({
            page: z.number().min(1).max(18),
            cursor: z.number().nullish(),
        }),
        // code called after each api call
        resolve: async ({input}) => {
            const offset = ((input.page ? input.page : 1) - 1) * 50;
            const response: PokemonItem[] = await fetch(`${API_URL}pokemon?limit=50&offset=${offset}`)
                .then(res => res.json())
                .then(res => res.results)
                .then(res => res.map((pokemon: pokemon, idx: number) => {
                        // this id will be used to fetch the details on the client side
                        const id = offset + idx + 1;
                        return {
                            ...pokemon,
                            id,
                            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
                        }
                    }
                ))
            ;
            return response;
        }
    })
    .query("pokemonDetails", {
        input: z.object({id: z.string().nullish(),}),
        async resolve({input}) {
            const pokemon: PokeAPI.Pokemon = await fetch(`${API_URL}pokemon/${input?.id}`)
                .then(res => res.json());
            return pokemon;
        },
    });
