import store from '../init/store'

export function vW(multiplier=1) {

    if ( !store.getState().map.cW ) {
        return 0;
    }

    const number = store.getState().map.cW * multiplier;
    return Math.round( number * 10 ) / 10; //Return rounded to 1 decimal point
}