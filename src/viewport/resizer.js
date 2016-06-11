import store from '../init/store';

export default function() {

    //const acceptedSizes = [
    //    352, 528, 704, 880, 1056, 1232, 1408, 1584
    //];
    const acceptedSizes = [220, 231, 242, 253, 264, 275, 286, 297, 308, 319, 330, 341, 352, 363, 374, 385, 396, 407, 418, 429, 440, 451, 462, 473, 484, 495, 506, 517, 528, 539, 550, 561, 572, 583, 594, 605, 616, 627, 638, 649, 660, 671, 682, 693, 704, 715, 726, 737, 748, 759, 770, 781, 792, 803, 814, 825, 836, 847, 858, 869, 880, 891, 902, 913, 924, 935, 946, 957, 968, 979, 990, 1001, 1012, 1023, 1034, 1045, 1056, 1067, 1078, 1089, 1100, 1111, 1122, 1133, 1144, 1155, 1166, 1177, 1188, 1199]

    /* NOTE: MODIFIED FROM GAME. TRYING "MORE" SIZES TO BE AVAILABLE */

    var CELL;
    var setViewport = function(width) {

        var limit = acceptedSizes[acceptedSizes.length-1];
        width = (width <= limit ) ? width : limit;

        const widthMatch = acceptedSizes.indexOf(width);
        if (widthMatch != -1) {

            var height = (7/11) * width;

            /* Quick fix 3/19: Check if height is acceptable. If not, use one setting down */
            if ($(window).height() < height) {
                //Use one setting down.
                if (widthMatch > 0) {
                    width = acceptedSizes[widthMatch-1];
                    height = (7/11) * width;
                }

            }


            store.dispatch({
                type: "SET_VIEWPORT_SIZE",
                width: width,
                height: height
            });

            return;

        } else {
            //recursively try to find 11
            if (width > 11) {
                setViewport(width - 1);
            } else {
                console.warn('couldnt set viewport width :(')
            }
        }
    };

    var resizeTimeout;
    window.onresize = function () {
        clearTimeout(resizeTimeout)
        resizeTimeout = setTimeout(function () {
            setViewport( $(window).width() );
        }, 50);
    };
    setViewport( $(window).width() );

}