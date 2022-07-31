import {useCallback} from 'react';
import {PokemonItem} from "../server/router/pokeRouter"
import useLocalStorage from "use-local-storage";

export default function useFavoritePokemon<PokemonItem>() {

    const [favoritePokemon, setFavoritePokemon] = useLocalStorage<PokemonItem[]>('favoritePokemon', [] as PokemonItem[]);

    const addFavorite = useCallback((val: PokemonItem) => {
        try {
            console.log('inserting in localstrg',val);
            if (!favoritePokemon) {
                return setFavoritePokemon([val]);
            }
            // @ts-ignore
            if (favoritePokemon.find((pokemon:PokemonItem) => pokemon.id === val.id)) {
            }
            setFavoritePokemon([...favoritePokemon, val]);
        } catch (error) {
            console.log(error)
        }
    }, [setFavoritePokemon, favoritePokemon]);

    const removeFavorite = useCallback((id: number) => {
        try {
            if (!favoritePokemon) {
                return console.error('No favorite pokemon. Impossible to remove.');
            }
            // @ts-ignore
            const filteredPokemons: PokemonItem[] = favoritePokemon.filter(pokemon => pokemon?.id !== id);

            setFavoritePokemon([...filteredPokemons]);
        } catch (error) {
            console.log(error)
        }
    }, [setFavoritePokemon, favoritePokemon]);

    return [favoritePokemon, addFavorite, removeFavorite];
}