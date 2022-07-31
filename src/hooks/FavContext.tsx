import React, {Component, ReactNode, useCallback, useContext, useEffect} from "react";
import useLocalStorage from "use-local-storage";
import {PokemonItem} from "../server/router/pokeRouter";

export type FavContextType = {
    favoritePokemon: PokemonItem[];
    addFavorite: (val: PokemonItem) => void;
    removeFavorite: (id: number) => void;
}

const FavContext: React.Context<FavContextType> = React.createContext({} as FavContextType);


// provides the list of favorite pokemons to the entire application (not only to the Favorites page)
// and also provides the methods to add/remove a pokemon to/from the list
export const FavProvider=({ children }: {children:ReactNode}) => {
    const [favoritePokemon, setFavoritePokemon] = useLocalStorage<PokemonItem[]>('favoritePokemon', [] as PokemonItem[]);

    // adds new pokemon to the localstorage list of favorite pokemons
    const addFavorite = useCallback((val: PokemonItem) => {
        try {
            // localstorage has not been created yet
            if (!favoritePokemon) {
                return setFavoritePokemon([val]);
            }
            // pokemon is already in the localstorage
            if (favoritePokemon.find(pokemon => pokemon?.id === val.id)) {
                return ;
            }
            setFavoritePokemon([...favoritePokemon, val]);
        } catch (error) {
            console.log(error)
        }
    }, [setFavoritePokemon, favoritePokemon]);

    // removes a pokemon from the localstorage list of favorite pokemons
    const removeFavorite = useCallback((id: number) => {
        try {
            // localstorage has not been created yet
            if (!favoritePokemon) {
                return console.error('No favorite pokemon. Impossible to remove.');
            }
            // creates a new list of favorite pokemons without the pokemon to remove
            const filteredPokemons: PokemonItem[] = favoritePokemon.filter(pokemon => pokemon?.id !== id);

            setFavoritePokemon([...filteredPokemons]);
        } catch (error) {
            console.log(error)
        }
    }, [setFavoritePokemon, favoritePokemon]);

    return (
        <FavContext.Provider value={{ favoritePokemon, addFavorite, removeFavorite }}>
            {children}
        </FavContext.Provider>
    )
}

// provides a hook friendly way to access and manage the list of favorite pokemons
export const useFavs = () => {
    const { favoritePokemon, addFavorite, removeFavorite } = useContext(FavContext)
    return { favoritePokemon, addFavorite, removeFavorite }
}

export default FavContext;