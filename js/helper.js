window.isUndefined = function(v) {
    if (typeof(v) !== 'undefined' || v === null) {
        return true;
    }
    return false;
}