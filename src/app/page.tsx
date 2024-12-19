'use client'

import Cube from '@/components/cube'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Letter } from '@/lib/definitions'
import { useRef, useState } from 'react'
import { Eye, Forward } from 'lucide-react'
import { getRandomLetter, getRandomPieceType } from '@/lib/utils'

export default function Home() {
    const [pieceType, setPieceType] = useState<'corner' | 'edge'>('corner')
    const [letter, setLetter] = useState<Letter>('A')
    const inputRef = useRef<HTMLInputElement>(null)
    const revealRef = useRef<HTMLButtonElement>(null)
    const submitRef = useRef<HTMLButtonElement>(null)

    const handleSubmit = () => {
        setRandomPiece()
    }

    const setRandomPiece = () => {
        const _letter = getRandomLetter()
        const _pieceType = getRandomPieceType()

        setLetter(_letter)
        setPieceType(_pieceType)
    }

    return (
        <div className="flex h-screen w-screen items-center justify-center gap-64 bg-black">
            <div className="flex flex-col items-center gap-32">
                <Cube pieceType={pieceType} letter={letter} />
                {/* Inputs */}
                <div className="flex gap-3">
                    <Button
                        ref={revealRef}
                        className="h-20 w-20 bg-red-600 [&_svg]:size-8"
                        variant={'destructive'}
                    >
                        <Eye />
                    </Button>
                    <Input
                        ref={inputRef}
                        className="h-20 w-20 bg-black text-center !text-6xl text-white"
                    />
                    <Button
                        onClick={handleSubmit}
                        ref={submitRef}
                        className="h-20 w-20 [&_svg]:size-8"
                        variant={'secondary'}
                    >
                        <Forward />
                    </Button>
                </div>
            </div>
        </div>
    )
}
