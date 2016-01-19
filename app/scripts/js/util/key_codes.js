'use strict';
var KEY_CODES = {
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 89,
    ZERO: 48,
    ONE: 49,
    TWO: 50,
    THREE: 51,
    FOUR: 52,
    FIVE: 53,
    SIX: 54,
    SEVEN: 55,
    EIGHT: 56,
    NINE: 57,
    MINUS: 189,
    EQUALS: 187,
    LEFT_BRACKET: 219,
    RIGHT_BRACKET: 221,
    BACK_SLASH: 220,
    SPACE_BAR: 32,
    TAB: 9,
    ENTER: 13,
    SHIFT: 16,
    CONTROL: 17,
    CAPS_LOCK: 20,
    LEFT_ARROW: 37,
    UP_ARROW: 38,
    RIGHT_ARROW: 39,
    DOWN_ARROW: 40
};

var KEY_CODE_NAMES = {
    '65': 'A',
    '66': 'B',
    '67': 'C' ,
    '68': 'D',
    '69': 'E',
    '70': 'F',
    '71': 'G',
    '72': 'H',
    '73': 'I',
    '74': 'J',
    '75': 'K',
    '76': 'L',
    '77': 'M',
    '78': 'N',
    '79': 'O',
    '80': 'P',
    '81': 'Q',
    '82': 'R',
    '83': 'S',
    '84': 'T',
    '85': 'U',
    '86': 'V',
    '87': 'W',
    '88': 'X',
    '89': 'Y',
    '90': 'Z',
    '48': 'ZERO',
    '49': 'ONE',
    '50': 'TWO',
    '51': 'THREE',
    '52': 'FOUR',
    '53': 'FIVE',
    '54': 'SIX',
    '55': 'SEVEN',
    '56': 'EIGHT',
    '57': 'NINE',
    '189': 'MINUS',
    '187': 'EQUALS',
    '219': 'LEFT_BRACKET',
    '221': 'RIGHT_BRACKET',
    '220': 'BACK_SLASH',
    '32': 'SPACE_BAR',
    '9': 'TAB',
    '13': 'ENTER',
    '16': 'SHIFT',
    '17': 'CONTROL',
    '20': 'CAPS_LOCK',
    '37': 'LEFT_ARROW',
    '38': 'UP_ARROW',
    '39': 'RIGHT_ARROW',
    '40': 'DOWN_ARROW'
};

module.exports = {KEY_CODE_NAMES: KEY_CODE_NAMES,
                  KEY_CODES: KEY_CODES};
