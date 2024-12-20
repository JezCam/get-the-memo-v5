import { PieceType, Rotation, Style } from '@/lib/definitions'
import { DEFAULT_LETTER_SCHEME } from '@/lib/letter-maps'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type state = {
    corners: boolean
    edges: boolean
    rotation: Rotation
    pieceType: PieceType
    letterScheme: Record<string, string>
    style: Style
}

const stateDefault: state = {
    corners: true,
    edges: true,
    rotation: 'A',
    pieceType: 'corner',
    letterScheme: DEFAULT_LETTER_SCHEME,
    style: 'black',
}

export const useStore = create(
    persist<
        state & {
            setCorners: (bool: boolean) => void
            setEdges: (bool: boolean) => void
            setRotation: (rotation: Rotation) => void
            setPieceType: (pieceType: PieceType) => void
            updateLetter: (key: string, letter?: string) => void
            setStyle: (style: Style) => void
        }
    >(
        (set, get) => ({
            ...stateDefault,
            setCorners: (bool: boolean) => set({ corners: bool }),
            setEdges: (bool: boolean) => set({ edges: bool }),
            setRotation: (rotation: Rotation) => set({ rotation: rotation }),
            setPieceType: (pieceType: PieceType) =>
                set({ pieceType: pieceType }),
            updateLetter: (key: string, letter?: string) => {
                const _letterScheme = { ...get().letterScheme }
                _letterScheme[key] = letter ?? DEFAULT_LETTER_SCHEME[key]
                set({ letterScheme: _letterScheme })
            },
            setStyle: (style: Style) => set({ style: style }),
        }),
        { name: 'state' }
    )
)
