const strPolindrom = [
    'apolopa',
    'apollopa',
    'aplopa',
    'aploopa'
]

function polindromCheck(strPolindrom, index = 0) {
    if ((strPolindrom[strPolindrom.length - (index + 1)]) === strPolindrom[index]) {
        if (strPolindrom.length / 2 > index) {
            return polindromCheck(strPolindrom, ++index)
        } else {
            return true
        }
    } else {
        return false
    }
}

console.log(strPolindrom.map((value) => polindromCheck(value)))