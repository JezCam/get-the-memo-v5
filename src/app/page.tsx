'use client'

import Cube from '@/components/cube'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Rotation, PieceType, Style } from '@/lib/definitions'
import { useRef, useState } from 'react'
import {
    Eye,
    CornerDownLeft,
    Repeat2,
    ArrowRight,
    Settings2,
    ArrowLeft,
    Repeat2Icon,
} from 'lucide-react'
import { getRandomRotation, getRandomPieceType } from '@/lib/utils'
import { INPUT_STYLES, ROTATION_COLOURS } from '@/lib/piece-transforms'
import Image from 'next/image'
import {
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    Tooltip,
} from '@/components/ui/tooltip'
import { DEFAULT_LETTER_SCHEME, ROTATION_LETTER_INDEX } from '@/lib/letter-maps'
import { useStore } from '@/store/useStore'

enum State {
    Guessing = 'guessing',
    TryingAgain = 'tryingAgain',
    Revealed = 'revealed',
    Correct = 'correct',
    Incorrect = 'incorrect',
    Configuring = 'configuring',
}

export default function Home() {
    const [previousState, setPreviousState] = useState<State>(State.Guessing)
    const [state, setState] = useState<State>(State.Guessing)
    const [previousRotation, setPreviousRotation] = useState<Rotation>('A')
    const [letters, setLetters] = useState<boolean>(false)
    const [input, setInput] = useState<string>()
    const inputRef = useRef<HTMLInputElement>(null)
    const revealRef = useRef<HTMLButtonElement>(null)
    const submitRef = useRef<HTMLButtonElement>(null)
    const [score, setScore] = useState<number>(0)
    const [best, setBest] = useState<number>(0)

    // Global persistent state
    const {
        rotation,
        pieceType,
        letterScheme,
        corners,
        edges,
        style,
        setCorners,
        setEdges,
        setRotation,
        setPieceType,
        updateLetter,
        setStyle,
    } = useStore()

    const handleReveal = () => {
        const letterSchemeIndex =
            (pieceType === 'corner' ? 'corner' : 'edge') + rotation
        setInput(letterScheme[letterSchemeIndex])
        setState(State.Revealed)
        setScore(0)
    }

    const handleSubmit = () => {
        const letterSchemeIndex =
            (pieceType === 'corner' ? 'corner' : 'edge') + rotation
        if (input === letterScheme[letterSchemeIndex]) {
            if (state === State.Guessing) {
                if (score === best) {
                    setBest(score + 1)
                }
                setScore(score + 1)
            }
            setState(State.Correct)
        } else {
            setState(State.Incorrect)
            setInput(letterScheme[letterSchemeIndex])
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
        const _rotation = getRandomRotation(rotation)
        setRotation(_rotation)
        setPreviousRotation(_rotation)

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
        <div className="flex h-screen w-screen items-center justify-center bg-black/95 font-semibold text-white">
            <div className="flex flex-col items-center justify-center gap-28 rounded-3xl border-[1px] border-white/10 bg-black p-6">
                {/* Top */}
                {state === State.Configuring ? (
                    <div className="flex gap-3">
                        <TooltipProvider>
                            {/* Back */}
                            <div className="flex flex-col items-end gap-2 text-sm">
                                Back
                                <Tooltip>
                                    <TooltipContent>Go back</TooltipContent>
                                    <TooltipTrigger>
                                        <button
                                            style={{
                                                transform:
                                                    'perspective(300px) rotateY(35deg) translateX(6px) scaleX(1.2) scaleY(1.1)',
                                            }}
                                            onClick={() => {
                                                setLetters(false)
                                                setRotation(previousRotation)
                                                setState(previousState)
                                            }}
                                            className="relative flex h-20 w-20 items-center justify-center rounded-lg border border-muted-foreground transition-all hover:border-white hover:bg-white/10 [&_svg]:size-8"
                                        >
                                            <ArrowLeft />
                                        </button>
                                    </TooltipTrigger>
                                </Tooltip>
                            </div>
                            {/* Configure Pieces */}
                            <div className="flex flex-col items-center gap-2 text-sm">
                                Configure pieces
                                <div className="flex gap-3">
                                    {/* Corners */}
                                    <Tooltip>
                                        <TooltipContent>
                                            Allow corners
                                        </TooltipContent>
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
                                                        setPreviousState(
                                                            State.Guessing
                                                        )
                                                        setInput('')
                                                        setLetters(false)
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
                                        <TooltipContent>
                                            Allow edges
                                        </TooltipContent>
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
                                                    if (
                                                        edges &&
                                                        pieceType === 'edge'
                                                    ) {
                                                        setPreviousState(
                                                            State.Guessing
                                                        )
                                                        setInput('')
                                                        setLetters(false)
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
                                                    className="rotate-90"
                                                />
                                            </button>
                                        </TooltipTrigger>
                                    </Tooltip>
                                </div>
                            </div>
                            {/* Change letter */}
                            <div className="flex flex-col gap-2 text-sm">
                                Letters
                                <Tooltip>
                                    <TooltipContent>
                                        Change letters
                                    </TooltipContent>
                                    <TooltipTrigger>
                                        <button
                                            style={{
                                                border: letters
                                                    ? 'solid 1px hsl(var(--muted))'
                                                    : '1px solid hsl(var(--muted-foreground))',
                                                backgroundColor: letters
                                                    ? 'rgba(250,250,250,.12)'
                                                    : '',
                                                opacity: letters ? 1 : 0.8,
                                                transform:
                                                    'perspective(300px) rotateY(-35deg) translateX(-6px) scaleX(1.2) scaleY(1.1)',
                                            }}
                                            onClick={() => {
                                                if (!letters) {
                                                    setLetters(true)
                                                    setPreviousRotation(
                                                        rotation
                                                    )
                                                    setRotation('0')
                                                } else {
                                                    setRotation(
                                                        previousRotation
                                                    )
                                                    setLetters(false)
                                                }
                                            }}
                                            className="relative flex h-20 w-20 items-center justify-center rounded-lg border border-muted-foreground text-3xl transition-all hover:border-white hover:bg-white/10 [&_svg]:size-8"
                                        >
                                            AA
                                        </button>
                                    </TooltipTrigger>
                                </Tooltip>
                            </div>
                        </TooltipProvider>
                    </div>
                ) : (
                    <div className="flex gap-3">
                        <TooltipProvider>
                            {/* Configure */}
                            <div className="flex flex-col items-end gap-2 text-sm">
                                Configure
                                <Tooltip>
                                    <TooltipContent>
                                        Customise cube
                                    </TooltipContent>
                                    <TooltipTrigger>
                                        <button
                                            style={{
                                                transform:
                                                    'perspective(300px) rotateY(35deg) translateX(6px) scaleX(1.2) scaleY(1.1)',
                                            }}
                                            onClick={() => {
                                                setPreviousState(state)
                                                setState(State.Configuring)
                                            }}
                                            className="relative flex h-20 w-20 items-center justify-center rounded-lg border border-muted-foreground transition-all hover:border-white hover:bg-white/10 [&_svg]:size-8"
                                        >
                                            <Settings2 />
                                        </button>
                                    </TooltipTrigger>
                                </Tooltip>
                            </div>
                            {/* Score */}
                            <div className="flex flex-col items-center gap-2 text-sm">
                                Score
                                <div className="relative flex h-20 w-20 items-center justify-center rounded-lg border border-muted-foreground text-2xl">
                                    {score}
                                </div>
                            </div>
                            {/* Best */}
                            <div className="flex flex-col items-center gap-2 text-sm">
                                Best
                                <div className="relative flex h-20 w-20 items-center justify-center rounded-lg border border-muted-foreground text-2xl">
                                    {best}
                                </div>
                            </div>
                            {/* Creator */}
                            <div className="flex flex-col gap-2 text-sm">
                                Creator
                                <Tooltip>
                                    <TooltipContent>Follow me!</TooltipContent>
                                    <TooltipTrigger>
                                        <a
                                            style={{
                                                transform:
                                                    'perspective(300px) rotateY(-35deg) translateX(-6px) scaleX(1.2) scaleY(1.1)',
                                            }}
                                            href="https://x.com/jeremycameron"
                                            target="_blank"
                                            className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-lg border border-muted-foreground"
                                        >
                                            <Image
                                                src="/me.png"
                                                fill
                                                alt="Jeremy Cameron"
                                            />
                                        </a>
                                    </TooltipTrigger>
                                </Tooltip>
                            </div>
                        </TooltipProvider>
                    </div>
                )}
                <div className="flex flex-col items-center gap-32">
                    <div className="relative">
                        <Cube
                            onRotate={(_rotation: Rotation) =>
                                setRotation(_rotation)
                            }
                            letters={letters}
                            pieceType={pieceType}
                            rotation={rotation}
                            style={style}
                        />

                        <div
                            style={{
                                opacity: letters ? 1 : 0,
                                pointerEvents: letters ? 'all' : 'none',
                                transition: letters
                                    ? 'opacity 1s ease'
                                    : 'opacity 0s',
                            }}
                        >
                            {/* Inputs */}
                            {Array(8)
                                .fill('')
                                .map((_, i) => (
                                    <Input
                                        onChange={(e) => {
                                            const newLetter =
                                                e.currentTarget.value.toUpperCase()
                                            updateLetter(
                                                ROTATION_LETTER_INDEX[rotation][
                                                    i
                                                ],
                                                newLetter
                                            )
                                        }}
                                        value={
                                            letterScheme[
                                                ROTATION_LETTER_INDEX[rotation][
                                                    i
                                                ]
                                            ]
                                        }
                                        key={i}
                                        style={INPUT_STYLES[i]}
                                        className="absolute h-16 w-16 bg-black/50 p-0 text-center !text-4xl"
                                    />
                                ))}
                            {/* Reset */}
                            <Button
                                onClick={() => {
                                    for (let i = 0; i < 8; i++) {
                                        updateLetter(
                                            ROTATION_LETTER_INDEX[rotation][i]
                                        )
                                    }
                                }}
                                className="absolute left-[68px] top-[68px] h-16 w-16 [&_svg]:size-8"
                            >
                                <Repeat2Icon />
                            </Button>
                        </div>
                    </div>
                    {state === State.Configuring ? (
                        <TooltipProvider>
                            {/* Select Style */}
                            <div className="flex flex-col items-center gap-2 text-sm">
                                Change style
                                <div className="flex gap-3">
                                    {/* Stickerless */}
                                    <Tooltip>
                                        <TooltipContent>
                                            Stickerless
                                        </TooltipContent>
                                        <TooltipTrigger>
                                            <button
                                                style={{
                                                    transform:
                                                        'perspective(300px) rotateY(35deg) translateX(6px) scaleX(1.2) scaleY(1.1)',
                                                }}
                                                onClick={() =>
                                                    setStyle('stickerless')
                                                }
                                                className="relative flex h-20 w-20 items-center justify-center rounded-lg border border-muted-foreground"
                                            >
                                                <Image
                                                    src={'/stickerless.svg'}
                                                    width={42}
                                                    height={42}
                                                    alt="stickerless style"
                                                />
                                            </button>
                                        </TooltipTrigger>
                                    </Tooltip>
                                    {/*Black */}
                                    <Tooltip>
                                        <TooltipContent>Black</TooltipContent>
                                        <TooltipTrigger>
                                            <button
                                                onClick={() =>
                                                    setStyle('black')
                                                }
                                                className="relative flex h-20 w-20 items-center justify-center rounded-lg border border-muted-foreground"
                                            >
                                                <Image
                                                    src={'/black.svg'}
                                                    width={42}
                                                    height={42}
                                                    alt="black style"
                                                />
                                            </button>
                                        </TooltipTrigger>
                                    </Tooltip>
                                    {/* White */}
                                    <Tooltip>
                                        <TooltipContent>White</TooltipContent>
                                        <TooltipTrigger>
                                            <button
                                                onClick={() =>
                                                    setStyle('white')
                                                }
                                                className="relative flex h-20 w-20 items-center justify-center rounded-lg border border-muted-foreground"
                                            >
                                                <Image
                                                    src={'/white.svg'}
                                                    width={42}
                                                    height={42}
                                                    alt="corner"
                                                />
                                            </button>
                                        </TooltipTrigger>
                                    </Tooltip>
                                    {/* Purple */}
                                    <Tooltip>
                                        <TooltipContent>Purple</TooltipContent>
                                        <TooltipTrigger>
                                            <button
                                                style={{
                                                    transform:
                                                        'perspective(300px) rotateY(-35deg) translateX(-6px) scaleX(1.2) scaleY(1.1)',
                                                }}
                                                onClick={() =>
                                                    setStyle('purple')
                                                }
                                                className="relative flex h-20 w-20 items-center justify-center rounded-lg border border-muted-foreground"
                                            >
                                                <Image
                                                    src={'/purple.svg'}
                                                    width={42}
                                                    height={42}
                                                    alt="corner"
                                                />
                                            </button>
                                        </TooltipTrigger>
                                    </Tooltip>
                                </div>
                            </div>
                        </TooltipProvider>
                    ) : (
                        // Inputs
                        <div className="flex items-end gap-3">
                            <TooltipProvider>
                                {state === State.Guessing ||
                                state === State.TryingAgain ? (
                                    <Tooltip>
                                        <TooltipContent>
                                            Reveal letter
                                        </TooltipContent>
                                        <TooltipTrigger>
                                            <Button
                                                onClick={handleReveal}
                                                ref={revealRef}
                                                style={{
                                                    transform:
                                                        'perspective(300px) rotateY(35deg) translateX(6px) scaleX(1.2) scaleY(1.1)',
                                                }}
                                                className="h-20 w-20 rounded-lg bg-red-600 [&_svg]:size-8"
                                                variant={'destructive'}
                                            >
                                                <Eye />
                                            </Button>
                                        </TooltipTrigger>
                                    </Tooltip>
                                ) : (
                                    <Tooltip>
                                        <TooltipContent>
                                            Try again
                                        </TooltipContent>
                                        <TooltipTrigger>
                                            <Button
                                                style={{
                                                    transform:
                                                        'perspective(300px) rotateY(35deg) translateX(6px) scaleX(1.2) scaleY(1.1)',
                                                }}
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
                                <div className="flex flex-col items-center gap-2 text-sm font-semibold">
                                    Enter a letter
                                    <Input
                                        value={input}
                                        onChange={(e) => {
                                            if (
                                                e.target.value.slice(0, 1) !=
                                                input
                                            ) {
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
                                            outlineColor:
                                                ROTATION_COLOURS[rotation],
                                            outlineOffset: 4,
                                            outlineWidth: 3,
                                            border: {
                                                correct: '1px solid green',
                                                incorrect: '1px solid red',
                                                guessing: '1px solid white',
                                                revealed: '1px solid red',
                                                tryingAgain: '1px solid white',
                                                configuring: '1px solid white',
                                            }[state],
                                            color: {
                                                correct: 'green',
                                                incorrect: 'red',
                                                guessing: 'white',
                                                revealed: 'red',
                                                tryingAgain: 'white',
                                                configuring: 'white',
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
                                                style={{
                                                    transform:
                                                        'perspective(300px) rotateY(-35deg) translateX(-6px) scaleX(1.2) scaleY(1.1)',
                                                }}
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
                                                style={{
                                                    transform:
                                                        'perspective(300px) rotateY(-35deg) translateX(-6px) scaleX(1.2) scaleY(1.1)',
                                                }}
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
                    )}
                </div>
            </div>
        </div>
    )
}
