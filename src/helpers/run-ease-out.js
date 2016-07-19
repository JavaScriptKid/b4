function easeOutCubic(currentIteration, startValue, changeInValue, totalIterations) {
    return changeInValue * (Math.pow(currentIteration / totalIterations - 1, 3) + 1) + startValue;
}

export function runEaseOut( startValue = 0, changeInStartValue = 0, totalIterations = 100,
        iterationCallback = function () {}, doneCallback = function () {}) {

    var iteration = 0;
    var value = 0;

    var step = function () {
        value = Math.round(easeOutCubic(iteration, startValue, changeInStartValue, totalIterations));

        iterationCallback(value);

        iteration += 1;
        if (iteration < totalIterations) {
            requestAnimationFrame(step);
        } else {
            doneCallback();
        }
    };
    requestAnimationFrame(step);
}