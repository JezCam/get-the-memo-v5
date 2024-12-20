import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Rotation, PieceType } from './definitions'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getRandomPieceType(): PieceType {
    const allPieceTypes: PieceType[] = ['corner', 'edge']
    return allPieceTypes[Math.floor(Math.random() * allPieceTypes.length)]
}

export function getRandomRotation(currentRotation: Rotation): Rotation {
    const allRotations: Rotation[] = [
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
    const index = Math.floor(Math.random() * allRotations.length)
    const newRotation = allRotations[index]
    if (newRotation === currentRotation)
        return allRotations[index === 0 ? 1 : index - 1]
    return newRotation
}
