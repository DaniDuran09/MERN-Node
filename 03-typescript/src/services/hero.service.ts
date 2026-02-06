import {heroes} from "../data/heroes";

export const findHeroById = ( id : number ) : any => {
    return heroes.find( (hero) => hero.id === id);
}