'use client'

import Cube from '@/components/cube'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Letter, PieceType } from '@/lib/definitions'
import { useRef, useState } from 'react'
import { Eye, CornerDownLeft, Repeat2, ArrowRight } from 'lucide-react'
import { getRandomLetter, getRandomPieceType } from '@/lib/utils'
import { LETTER_COLOURS } from '@/lib/piece-transforms'
import Image from 'next/image'
import {
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    Tooltip,
} from '@/components/ui/tooltip'

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
    const [corners, setCorners] = useState<boolean>(true)
    const [edges, setEdges] = useState<boolean>(true)
    const [score, setScore] = useState<number>(0)
    const [best, setBest] = useState<number>(0)

    const handleReveal = () => {
        setInput(letter)
        setState(State.Revealed)
        setScore(0)
    }

    const handleSubmit = () => {
        if (input === letter) {
            if (state === State.Guessing) {
                if (score === best) {
                    setBest(score + 1)
                }
                setScore(score + 1)
            }
            setState(State.Correct)
        } else {
            setState(State.Incorrect)
            setInput(letter)
            setScore(0)
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

    const setRandomPiece = (_pieceType?: PieceType) => {
        const _letter = getRandomLetter(letter)
        setLetter(_letter)

        if (_pieceType) {
            setPieceType(_pieceType)
            return
        }

        if (corners && edges) {
            const _pieceType = getRandomPieceType()
            setPieceType(_pieceType)
        }
    }

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center gap-24 bg-black font-semibold text-white">
            {/* Top */}
            <div className="flex gap-3">
                {/* Score */}
                <div className="flex flex-col gap-2 text-sm font-semibold">
                    Score
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-lg border border-muted-foreground text-2xl">
                        {score}
                    </div>
                </div>
                {/* Best */}
                <div className="flex flex-col gap-2 text-sm font-semibold">
                    Best
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-lg border border-muted-foreground text-2xl">
                        {best}
                    </div>
                </div>
                {/* Configure Pieces */}
                <div className="flex flex-col gap-2 text-sm">
                    Configure pieces
                    <div className="flex gap-3">
                        <TooltipProvider>
                            {/* Corners */}
                            <Tooltip>
                                <TooltipContent>Allow corners</TooltipContent>
                                <TooltipTrigger>
                                    <button
                                        disabled={!edges}
                                        style={{
                                            border: corners
                                                ? 'solid 1px hsl(var(--muted))'
                                                : '1px solid hsl(var(--muted-foreground))',
                                            backgroundColor: corners
                                                ? 'rgba(250,250,250,.12)'
                                                : '',
                                            opacity: corners ? 1 : 0.8,
                                        }}
                                        onClick={() => {
                                            if (
                                                corners &&
                                                pieceType === 'corner'
                                            ) {
                                                setRandomPiece('edge')
                                            }
                                            setCorners(!corners)
                                        }}
                                        className="relative flex h-20 w-20 items-center justify-center rounded-lg border border-muted-foreground"
                                    >
                                        <Image
                                            src={'/corner.svg'}
                                            width={32}
                                            height={32}
                                            alt="corner"
                                        />
                                    </button>
                                </TooltipTrigger>
                            </Tooltip>
                            {/* Edges */}
                            <Tooltip>
                                <TooltipContent>Allow edges</TooltipContent>
                                <TooltipTrigger>
                                    <button
                                        disabled={!corners}
                                        style={{
                                            border: edges
                                                ? 'solid 1px hsl(var(--muted))'
                                                : '1px solid hsl(var(--muted-foreground))',
                                            backgroundColor: edges
                                                ? 'rgba(250,250,250,.12)'
                                                : '',
                                            opacity: edges ? 1 : 0.8,
                                        }}
                                        onClick={() => {
                                            if (edges && pieceType === 'edge') {
                                                setRandomPiece('corner')
                                            }
                                            setEdges(!edges)
                                        }}
                                        className="relative flex h-20 w-20 items-center justify-center rounded-lg border border-muted-foreground"
                                    >
                                        <Image
                                            src={'/edge.svg'}
                                            width={32}
                                            height={32}
                                            alt="corner"
                                        />
                                    </button>
                                </TooltipTrigger>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center gap-32">
                <Cube pieceType={pieceType} letter={letter} />
                {/* Inputs */}
                <div className="flex items-end gap-3">
                    <TooltipProvider>
                        {state === State.Guessing ||
                        state === State.TryingAgain ? (
                            <Tooltip>
                                <TooltipContent>Reveal letter</TooltipContent>
                                <TooltipTrigger>
                                    <Button
                                        onClick={handleReveal}
                                        ref={revealRef}
                                        className="h-20 w-20 rounded-lg bg-red-600 [&_svg]:size-8"
                                        variant={'destructive'}
                                    >
                                        <Eye />
                                    </Button>
                                </TooltipTrigger>
                            </Tooltip>
                        ) : (
                            <Tooltip>
                                <TooltipContent>Try again</TooltipContent>
                                <TooltipTrigger>
                                    <Button
                                        onClick={handleTryAgain}
                                        ref={revealRef}
                                        className="h-20 w-20 rounded-lg [&_svg]:size-8"
                                        variant={'default'}
                                    >
                                        <Repeat2 />
                                    </Button>
                                </TooltipTrigger>
                            </Tooltip>
                        )}
                        <div className="flex flex-col gap-2 text-sm font-semibold">
                            Enter a letter
                            <Input
                                value={input}
                                onChange={(e) => {
                                    if (e.target.value.slice(0, 1) != input) {
                                        setInput(
                                            e.target.value
                                                .slice(0, 1)
                                                .toUpperCase()
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
                                className="h-20 w-[172px] rounded-lg bg-black text-center font-[family-name:var(--font-geist-mono)] !text-6xl text-white ring-offset-black"
                            />
                        </div>
                        {state === State.Guessing ||
                        state === State.TryingAgain ? (
                            <Tooltip>
                                <TooltipContent>Submit</TooltipContent>
                                <TooltipTrigger>
                                    <Button
                                        onClick={handleSubmit}
                                        ref={submitRef}
                                        className="h-20 w-20 rounded-lg [&_svg]:size-8"
                                        variant={'secondary'}
                                    >
                                        <CornerDownLeft />
                                    </Button>
                                </TooltipTrigger>
                            </Tooltip>
                        ) : (
                            <Tooltip>
                                <TooltipContent>Next</TooltipContent>
                                <TooltipTrigger>
                                    <Button
                                        onClick={handleNext}
                                        ref={submitRef}
                                        className="h-20 w-20 rounded-lg [&_svg]:size-8"
                                        variant={'secondary'}
                                    >
                                        <ArrowRight />
                                    </Button>
                                </TooltipTrigger>
                            </Tooltip>
                        )}
                    </TooltipProvider>
                </div>
            </div>
        </div>
    )
}
