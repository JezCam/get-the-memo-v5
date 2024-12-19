export const COLOURS = [
    '#ffffff',
    '#dc2626',
    '#eab308',
    '#ea580c',
    '#2563eb',
    '#16a34a',
]

export const FACE_TRANSFORMS = [
    'translateZ(100px)',
    'rotateY(90deg) translateZ(99px)',
    'rotateY(180deg) translateZ(99px)',
    'rotateY(-90deg) translateZ(99px)',
    'rotateX(90deg) translateZ(99px)',
    'rotateX(-90deg) translateZ(99px)',
]

const deg = Math.PI / 180
const xyz = (
    x: number,
    y: number,
    z: number
): [number, number, number, string] => [x * deg, y * deg, z * deg, 'XYZ']
const zxy = (
    z: number,
    x: number,
    y: number
): [number, number, number, string] => [x * deg, y * deg, z * deg, 'ZXY']
const yzx = (
    y: number,
    z: number,
    x: number
): [number, number, number, string] => [x * deg, y * deg, z * deg, 'YZX']

export const CORNER_ROTATIONS = {
    A: xyz(53.26, 0, -135),
    B: xyz(53.26, 0, 135),
    C: xyz(53.26, 0, 45),
    D: xyz(53.26, 0, -45),
    E: yzx(53.26, -135, 90),
    F: yzx(53.26, -45, 90),
    G: yzx(53.26, 45, 90),
    H: yzx(53.26, 135, 90),
    I: zxy(-135, 0, 143.26),
    J: zxy(135, 0, 143.26),
    K: zxy(45, 0, 143.26),
    L: zxy(-45, 0, 143.26),
    M: yzx(233.26, 135, 90),
    N: yzx(233.26, 45, 90),
    O: yzx(233.26, -45, 90),
    P: yzx(233.26, -135, 90),
    Q: zxy(-45, 0, -36.74),
    R: zxy(45, 0, -36.74),
    S: zxy(135, 0, -36.74),
    T: zxy(-135, 0, -36.74),
    U: xyz(233.26, 0, 135),
    V: xyz(233.26, 0, -135),
    W: xyz(233.26, 0, -45),
    X: xyz(233.26, 0, 45),
}

export const EDGE_ROTATIONS = {
    A: xyz(45, 0, 180),
    B: xyz(45, 0, 90),
    C: xyz(45, 0, 0),
    D: xyz(45, 0, -90),
    E: xyz(-45, 0, 90),
    F: xyz(-45, 90, 90),
    G: xyz(-45, 180, 90),
    H: xyz(-45, -90, 90),
    I: xyz(-45, 0, 180),
    J: xyz(-45, 90, 180),
    K: xyz(-45, 180, 180),
    L: xyz(-45, -90, 180),
    M: xyz(-45, 0, -90),
    N: xyz(-45, 90, -90),
    O: xyz(-45, 180, -90),
    P: xyz(-45, -90, -90),
    Q: xyz(-45, 0, 0),
    R: xyz(-45, 90, 0),
    S: xyz(-45, 180, 0),
    T: xyz(-45, -90, 0),
    U: xyz(45, 180, 0),
    V: xyz(45, 180, 90),
    W: xyz(45, 180, 180),
    X: xyz(45, 180, -90),
}

export const CORNER_INDEX_MAP = {
    A: '0-0',
    B: '0-2',
    C: '0-8',
    D: '0-6',
    E: '3-2',
    F: '3-8',
    G: '3-6',
    H: '3-0',
    I: '5-0',
    J: '5-2',
    K: '5-8',
    L: '5-6',
    M: '1-6',
    N: '1-0',
    O: '1-2',
    P: '1-8',
    Q: '4-8',
    R: '4-6',
    S: '4-0',
    T: '4-2',
    U: '2-8',
    V: '2-6',
    W: '2-0',
    X: '2-2',
}

export const EDGE_INDEX_MAP = {
    A: '0-1',
    B: '0-5',
    C: '0-7',
    D: '0-3',
    E: '3-5',
    F: '3-7',
    G: '3-3',
    H: '3-1',
    I: '5-1',
    J: '5-5',
    K: '5-7',
    L: '5-3',
    M: '1-3',
    N: '1-1',
    O: '1-5',
    P: '1-7',
    Q: '4-7',
    R: '4-3',
    S: '4-1',
    T: '4-5',
    U: '2-7',
    V: '2-3',
    W: '2-1',
    X: '2-5',
}

export const CORNER_TRANSFORMS = {
    A: 'translateX(12px) translateY(12px) scale(1.2)',
    B: 'translateX(-12px) translateY(12px) scale(1.2)',
    C: 'translateX(-12px) translateY(-12px) scale(1.2)',
    D: 'translateX(12px) translateY(-12px) scale(1.2)',
    E: 'translateX(-12px) translateY(12px) scale(1.2)',
    F: 'translateX(-12px) translateY(-12px) scale(1.2)',
    G: 'translateX(12px) translateY(-12px) scale(1.2)',
    H: 'translateX(12px) translateY(12px) scale(1.2)',
    I: 'translateX(12px) translateY(12px) scale(1.2)',
    J: 'translateX(-12px) translateY(12px) scale(1.2)',
    K: 'translateX(-12px) translateY(-12px) scale(1.2)',
    L: 'translateX(12px) translateY(-12px) scale(1.2)',
    M: 'translateX(12px) translateY(-12px) scale(1.2)',
    N: 'translateX(12px) translateY(12px) scale(1.2)',
    O: 'translateX(-12px) translateY(12px) scale(1.2)',
    P: 'translateX(-12px) translateY(-12px) scale(1.2)',
    Q: 'translateX(-12px) translateY(-12px) scale(1.2)',
    R: 'translateX(12px) translateY(-12px) scale(1.2)',
    S: 'translateX(12px) translateY(12px) scale(1.2)',
    T: 'translateX(-12px) translateY(12px) scale(1.2)',
    U: 'translateX(-12px) translateY(-12px) scale(1.2)',
    V: 'translateX(12px) translateY(-12px) scale(1.2)',
    W: 'translateX(12px) translateY(12px) scale(1.2)',
    X: 'translateX(-12px) translateY(12px) scale(1.2)',
}

export const EDGE_TRANSFORMS = {
    A: 'translateY(12px) scale(1.2)',
    B: 'translateX(-12px) scale(1.2)',
    C: 'translateY(-12px) scale(1.2)',
    D: 'translateX(12px) scale(1.2)',
    E: 'translateX(-12px) scale(1.2)',
    F: 'translateY(-12px) scale(1.2)',
    G: 'translateX(12px) scale(1.2)',
    H: ' translateY(12px) scale(1.2)',
    I: 'translateY(12px) scale(1.2)',
    J: 'translateX(-12px) scale(1.2)',
    K: 'translateY(-12px) scale(1.2)',
    L: 'translateX(12px) scale(1.2)',
    M: 'translateX(12px) scale(1.2)',
    N: 'translateY(12px) scale(1.2)',
    O: 'translateX(-12px) scale(1.2)',
    P: 'translateY(-12px) scale(1.2)',
    Q: 'translateY(-12px) scale(1.2)',
    R: 'translateX(12px) scale(1.2)',
    S: 'translateY(12px) scale(1.2)',
    T: 'translateX(-12px) scale(1.2)',
    U: 'translateY(-12px) scale(1.2)',
    V: 'translateX(12px) scale(1.2)',
    W: 'translateY(12px) scale(1.2)',
    X: 'translateX(-12px) scale(1.2)',
}

export const LETTER_COLOURS = {
    A: COLOURS[0],
    B: COLOURS[0],
    C: COLOURS[0],
    D: COLOURS[0],
    E: COLOURS[3],
    F: COLOURS[3],
    G: COLOURS[3],
    H: COLOURS[3],
    I: COLOURS[5],
    J: COLOURS[5],
    K: COLOURS[5],
    L: COLOURS[5],
    M: COLOURS[1],
    N: COLOURS[1],
    O: COLOURS[1],
    P: COLOURS[1],
    Q: COLOURS[4],
    R: COLOURS[4],
    S: COLOURS[4],
    T: COLOURS[4],
    U: COLOURS[2],
    V: COLOURS[2],
    W: COLOURS[2],
    X: COLOURS[2],
}
