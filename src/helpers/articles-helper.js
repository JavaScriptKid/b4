/**
 * "a"/"an" article helper!
 * Return the correct grammar option based on an input word!
 * @param input
 * @returns {*}
 */

export default function (input = "") {

    input = input.toLowerCase();

    // const exceptions = {
    //     "example": "an"
    // };
    //return an exception?

    //Otherwise, check for a vowel
    const firstLetter = input.split('')[0];
    if (["a", "e", "i", "o", "u"].indexOf(firstLetter) > -1) {
        return "an"
    }
    return "a"
}