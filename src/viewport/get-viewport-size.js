import range from 'lodash/range';


export function getViewportSize(screenWidth=0, screenHeight=0) {

    const options = range(1,99).map(number => {
        const width = number * 11;
        return {
            width: width,
            height: (7/11) * width
        }
    }).filter(option => {
        return (option.width <= screenWidth - 22 && option.height <= screenHeight - 44)
    });

    if (options.length) {
        return options[options.length-1];
    }

    /* Match not found. Likely super small or server environment */
    /* Return something anyway, though it won't be very useful */
    return {
        width: 11,
        height: 7
    }
}