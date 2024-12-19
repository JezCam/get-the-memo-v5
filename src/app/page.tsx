'use client'

import Cube from '@/components/cube'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Letter } from '@/lib/definitions'
import { useRef, useState } from 'react'
import { Eye, CornerDownLeft, Repeat2, ArrowRight } from 'lucide-react'
import { getRandomLetter, getRandomPieceType } from '@/lib/utils'
import { LETTER_COLOURS } from '@/lib/piece-transforms'

enum State {
    Guessing = 'guessing',
    TryingAgain = 'tryingAgain',
    Revealed = 'revealed',
    Correct = 'correct',
    Incorrect = 'incorrect',
}

export default function Home() {
    const [state, setState] = useState<State>(State.Guessing)
    const [pieceType, setPieceType] = useState<'corner' | 'edge'>('corner')
    const [letter, setLetter] = useState<Letter>('A')
    const [input, setInput] = useState<string>()
    const inputRef = useRef<HTMLInputElement>(null)
    const revealRef = useRef<HTMLButtonElement>(null)
    const submitRef = useRef<HTMLButtonElement>(null)

    const handleReveal = () => {
        setInput(letter)
        setState(State.Revealed)
    }

    const handleSubmit = () => {
        if (input === letter) {
            setState(State.Correct)
        } else {
            setState(State.Incorrect)
            setInput(letter)
        }
    }

    const handleTryAgain = () => {
        setState(State.TryingAgain)
        setInput('')
    }

    const handleNext = () => {
        setState(State.Guessing)
        setInput('')
        setRandomPiece()
        inputRef.current?.focus()
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
                    {state === State.Guessing || state === State.TryingAgain ? (
                        <Button
                            onClick={handleReveal}
                            ref={revealRef}
                            className="h-20 w-20 rounded-lg bg-red-600 [&_svg]:size-8"
                            variant={'destructive'}
                        >
                            <Eye />
                        </Button>
                    ) : (
                        <Button
                            onClick={handleTryAgain}
                            ref={revealRef}
                            className="h-20 w-20 rounded-lg [&_svg]:size-8"
                            variant={'default'}
                        >
                            <Repeat2 />
                        </Button>
                    )}
                    <Input
                        value={input}
                        onChange={(e) => {
                            if (e.target.value.slice(0, 1) != input) {
                                setInput(
                                    e.target.value.slice(0, 1).toUpperCase()
                                )
                                if (!e.target.value) {
                                    return
                                }
                                submitRef.current?.focus()
                            }
                        }}
                        style={{
                            outlineColor: LETTER_COLOURS[letter],
                            outlineOffset: 4,
                            outlineWidth: 4,
                            border: {
                                correct: '1px solid green',
                                incorrect: '1px solid red',
                                guessing: '1px solid white',
                                revealed: '1px solid red',
                                tryingAgain: '1px solid white',
                            }[state],
                            color: {
                                correct: 'green',
                                incorrect: 'red',
                                guessing: 'white',
                                revealed: 'red',
                                tryingAgain: 'white',
                            }[state],
                        }}
                        ref={inputRef}
                        className="h-20 w-20 rounded-lg bg-black text-center !text-6xl text-white ring-offset-black"
                    />
                    {state === State.Guessing || state === State.TryingAgain ? (
                        <Button
                            onClick={handleSubmit}
                            ref={submitRef}
                            className="h-20 w-20 rounded-lg [&_svg]:size-8"
                            variant={'secondary'}
                        >
                            <CornerDownLeft />
                        </Button>
                    ) : (
                        <Button
                            onClick={handleNext}
                            ref={submitRef}
                            className="h-20 w-20 rounded-lg [&_svg]:size-8"
                            variant={'secondary'}
                        >
                            <ArrowRight />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}
