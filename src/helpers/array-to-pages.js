/**
 * getPagesFromArray
 * Returns an array of "page" arrays. Each "page" array should be the length of unitsPerPage
 * The last page will be the remainder.
*/
export function getPagesFromArray(dataset=[], unitsPerPage=4) {

    var pages = [];

    function fill(counter) {
        var page = [];
        while (page.length < unitsPerPage) {
            page.push(dataset[counter]);
            counter += 1;
        }
        pages = [
            ...pages,
            page.filter(x => { return Boolean(x) })
        ];

        if (counter < dataset.length) {
            fill(counter);
        }

    }

    fill(0);

    return [...pages]
}