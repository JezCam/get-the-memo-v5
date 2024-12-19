import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Letter, PieceType } from './definitions'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getRandomPieceType(): PieceType {
    const allPieceTypes: PieceType[] = ['corner', 'edge']
    return allPieceTypes[Math.floor(Math.random() * allPieceTypes.length)]
}

export function getRandomLetter(): Letter {
    const allLetters: Letter[] = [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
    ]
    return allLetters[Math.floor(Math.random() * allLetters.length)]
}
