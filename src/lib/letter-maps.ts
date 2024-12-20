import { Rotation } from './definitions'

export const ROTATION_LETTER_INDEX: Record<Rotation, string[]> = {
    0: [
        'cornerA',
        'edgeA',
        'cornerB',
        'edgeD',
        'edgeB',
        'cornerD',
        'edgeC',
        'cornerC',
    ],
    1: [
        'cornerM',
        'edgeM',
        'cornerN',
        'edgeP',
        'edgeN',
        'cornerP',
        'edgeO',
        'cornerO',
    ],
    2: [
        'cornerU',
        'edgeU',
        'cornerV',
        'edgeX',
        'edgeV',
        'cornerX',
        'edgeW',
        'cornerW',
    ],
    3: [
        'cornerE',
        'edgeE',
        'cornerF',
        'edgeH',
        'edgeF',
        'cornerH',
        'edgeG',
        'cornerG',
    ],
    4: [
        'cornerQ',
        'edgeQ',
        'cornerR',
        'edgeT',
        'edgeR',
        'cornerT',
        'edgeS',
        'cornerS',
    ],
    5: [
        'cornerI',
        'edgeI',
        'cornerJ',
        'edgeL',
        'edgeJ',
        'cornerL',
        'edgeK',
        'cornerK',
    ],
    A: [],
    B: [],
    C: [],
    D: [],
    E: [],
    F: [],
    G: [],
    H: [],
    I: [],
    J: [],
    K: [],
    L: [],
    M: [],
    N: [],
    O: [],
    P: [],
    Q: [],
    R: [],
    S: [],
    T: [],
    U: [],
    V: [],
    W: [],
    X: [],
}

export const DEFAULT_LETTER_SCHEME: Record<string, string> = {
    cornerA: 'A',
    edgeA: 'A',
    cornerB: 'B',
    edgeB: 'B',
    cornerC: 'C',
    edgeC: 'C',
    cornerD: 'D',
    edgeD: 'D',
    cornerE: 'E',
    edgeE: 'E',
    cornerF: 'F',
    edgeF: 'F',
    cornerG: 'G',
    edgeG: 'G',
    cornerH: 'H',
    edgeH: 'H',
    cornerI: 'I',
    edgeI: 'I',
    cornerJ: 'J',
    edgeJ: 'J',
    cornerK: 'K',
    edgeK: 'K',
    cornerL: 'L',
    edgeL: 'L',
    cornerM: 'M',
    edgeM: 'M',
    cornerN: 'N',
    edgeN: 'N',
    cornerO: 'O',
    edgeO: 'O',
    cornerP: 'P',
    edgeP: 'P',
    cornerQ: 'Q',
    edgeQ: 'Q',
    cornerR: 'R',
    edgeR: 'R',
    cornerS: 'S',
    edgeS: 'S',
    cornerT: 'T',
    edgeT: 'T',
    cornerU: 'U',
    edgeU: 'U',
    cornerV: 'V',
    edgeV: 'V',
    cornerW: 'W',
    edgeW: 'W',
    cornerX: 'X',
    edgeX: 'X',
}
