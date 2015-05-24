window.isUndefined = function(v) {
    if (typeof(v) !== 'undefined' || v === null) {
        return true;
    }
    return false;
}

window.randomIntFromInterval = function(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

window.addZeros = function(num) {
    var ret = '';
    for (var i = (Math.floor(num) + '').length; i < 7; i++) {
        ret += '0';
    }
    return ret + Math.floor(num);
}