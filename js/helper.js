window.isUndefined = function(v) {
    if (typeof(v) !== 'undefined' || v === null) {
        return true;
    }
    return false;
}

window.randomIntFromInterval = function(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}