import React, { useEffect } from 'react'
import Quaternion from 'quaternion'
import {
    BORDER_RADIUS,
    COLOURS,
    CORNER_INDEX_MAP,
    CORNER_ROTATIONS,
    CORNER_TRANSFORMS,
    EDGE_INDEX_MAP,
    EDGE_ROTATIONS,
    EDGE_TRANSFORMS,
    FACE_TRANSFORMS,
    ROTATION_BAR_COLOURS,
} from '@/lib/piece-transforms'
import { Rotation, PieceType, Style } from '@/lib/definitions'

export default function Cube(props: {
    onRotate: (rotation: Rotation) => void
    letters: boolean
    pieceType: PieceType
    rotation: Rotation
    style: Style
    correct: boolean
    incorrect: boolean
}) {
    const pieceRotation: [number, number, number, string] =
        props.pieceType === 'corner'
            ? CORNER_ROTATIONS[props.rotation]
            : EDGE_ROTATIONS[props.rotation]
    const stickerTransform =
        props.pieceType === 'corner'
            ? CORNER_TRANSFORMS[props.rotation]
            : EDGE_TRANSFORMS[props.rotation]
    const ij =
        props.pieceType === 'corner'
            ? CORNER_INDEX_MAP[props.rotation]
            : EDGE_INDEX_MAP[props.rotation]
    const quaternion = Quaternion.fromEuler(...pieceRotation)

    const stickerlessStyle =
        props.style === 'stickerless'
            ? {
                  face: {
                      gap: 0,
                      padding: 0,
                      backgroundColor: 'black',
                  },
                  sticker: {},
              }
            : {}
    const blackStyle =
        props.style === 'black'
            ? {
                  face: {
                      backgroundColor: 'black',
                  },
                  sticker: {},
              }
            : {}
    const whiteStyle =
        props.style === 'white'
            ? {
                  face: {
                      backgroundColor: 'white',
                      boxShadow: '0 0 0 1px white',
                      borderRadius: '1px',
                  },
                  sticker: {},
              }
            : {}
    const purpleStyle =
        props.style === 'purple'
            ? {
                  face: {
                      backgroundColor: '#7c3aed',
                      boxShadow: '0 0 0 1px #7c3aed',
                      borderRadius: '1px',
                  },
                  sticker: {},
              }
            : {}
    const correctStyle = props.correct
        ? { boxShadow: 'inset 0 0 0 8px green' }
        : {}
    const incorrectStyle = props.incorrect
        ? { boxShadow: 'inset 0 0 0 8px red' }
        : {}

    return (
        <div
            className="relative h-[200px] w-[200px]"
            style={{ perspective: '300px' }}
        >
            <div
                style={{
                    opacity: props.letters ? 1 : 0,
                    transition: props.letters
                        ? 'opacity 1s ease'
                        : 'opacity 0s',
                }}
            >
                {/* Top Bar */}
                <div
                    onClick={() =>
                        props.onRotate(
                            ROTATION_BAR_COLOURS[
                                props.rotation
                            ][0].toString() as Rotation
                        )
                    }
                    className="absolute -left-[50px] -top-[72px] flex h-[12px] w-[299px] cursor-pointer gap-3 transition-all hover:h-[24px] hover:-translate-y-[12px]"
                >
                    <div
                        style={{
                            backgroundColor:
                                COLOURS[
                                    ROTATION_BAR_COLOURS[props.rotation][0]
                                ],
                        }}
                        className="h-full w-full rounded-[10px] rounded-bl-none transition-all"
                    ></div>
                    <div
                        style={{
                            backgroundColor:
                                COLOURS[
                                    ROTATION_BAR_COLOURS[props.rotation][0]
                                ],
                        }}
                        className="h-full w-full rounded-[10px] transition-all"
                    ></div>
                    <div
                        style={{
                            backgroundColor:
                                COLOURS[
                                    ROTATION_BAR_COLOURS[props.rotation][0]
                                ],
                        }}
                        className="h-full w-full rounded-[10px] rounded-br-none transition-all"
                    ></div>
                </div>
                {/* Bottom Bar */}
                <div
                    onClick={() =>
                        props.onRotate(
                            ROTATION_BAR_COLOURS[
                                props.rotation
                            ][1].toString() as Rotation
                        )
                    }
                    className="absolute -bottom-[72px] -left-[50px] flex h-[12px] w-[299px] cursor-pointer gap-3 transition-all hover:h-[24px] hover:translate-y-[12px]"
                >
                    <div
                        style={{
                            backgroundColor:
                                COLOURS[
                                    ROTATION_BAR_COLOURS[props.rotation][1]
                                ],
                        }}
                        className="h-full w-full rounded-[10px] rounded-tl-none transition-all"
                    ></div>
                    <div
                        style={{
                            backgroundColor:
                                COLOURS[
                                    ROTATION_BAR_COLOURS[props.rotation][1]
                                ],
                        }}
                        className="h-full w-full rounded-[10px] transition-all"
                    ></div>
                    <div
                        style={{
                            backgroundColor:
                                COLOURS[
                                    ROTATION_BAR_COLOURS[props.rotation][1]
                                ],
                        }}
                        className="h-full w-full rounded-[10px] rounded-tr-none transition-all"
                    ></div>
                </div>
                {/* Left Bar */}
                <div
                    onClick={() =>
                        props.onRotate(
                            ROTATION_BAR_COLOURS[
                                props.rotation
                            ][2].toString() as Rotation
                        )
                    }
                    className="absolute -left-[72px] -top-[50px] flex h-[299px] w-[12px] cursor-pointer flex-col gap-3 transition-all hover:w-[24px] hover:-translate-x-[12px]"
                >
                    <div
                        style={{
                            backgroundColor:
                                COLOURS[
                                    ROTATION_BAR_COLOURS[props.rotation][2]
                                ],
                        }}
                        className="h-full w-full rounded-[10px] rounded-tr-none transition-all"
                    ></div>
                    <div
                        style={{
                            backgroundColor:
                                COLOURS[
                                    ROTATION_BAR_COLOURS[props.rotation][2]
                                ],
                        }}
                        className="h-full w-full rounded-[10px] transition-all"
                    ></div>
                    <div
                        style={{
                            backgroundColor:
                                COLOURS[
                                    ROTATION_BAR_COLOURS[props.rotation][2]
                                ],
                        }}
                        className="h-full w-full rounded-[10px] rounded-br-none transition-all"
                    ></div>
                </div>
                {/* Right Bar */}
                <div
                    onClick={() =>
                        props.onRotate(
                            ROTATION_BAR_COLOURS[
                                props.rotation
                            ][3].toString() as Rotation
                        )
                    }
                    className="absolute -right-[72px] -top-[50px] flex h-[299px] w-[12px] cursor-pointer flex-col gap-3 transition-all hover:w-[24px] hover:translate-x-[12px]"
                >
                    <div
                        style={{
                            backgroundColor:
                                COLOURS[
                                    ROTATION_BAR_COLOURS[props.rotation][3]
                                ],
                        }}
                        className="h-full w-full rounded-[10px] rounded-tl-none transition-all"
                    ></div>
                    <div
                        style={{
                            backgroundColor:
                                COLOURS[
                                    ROTATION_BAR_COLOURS[props.rotation][3]
                                ],
                        }}
                        className="h-full w-full rounded-[10px] transition-all"
                    ></div>
                    <div
                        style={{
                            backgroundColor:
                                COLOURS[
                                    ROTATION_BAR_COLOURS[props.rotation][3]
                                ],
                        }}
                        className="h-full w-full rounded-[10px] rounded-bl-none transition-all"
                    ></div>
                </div>
            </div>
            <div
                style={{
                    transformStyle: 'preserve-3d',
                    transform: quaternion.toCSSTransform(),
                }}
                className="relative h-[200px] w-[200px] transition-all duration-500"
            >
                {/* FACES */}
                {Array(6)
                    .fill('')
                    .map((_, i) => (
                        <div
                            key={i}
                            style={{
                                transform: FACE_TRANSFORMS[i],
                                backfaceVisibility: 'hidden',
                                gap: '6px',
                                padding: '3px',
                                ...stickerlessStyle.face,
                                ...blackStyle.face,
                                ...whiteStyle.face,
                                ...purpleStyle.face,
                                ...correctStyle,
                                ...incorrectStyle,
                            }}
                            className="absolute grid h-[200px] w-[200px] grid-cols-3 transition-all"
                        >
                            {/* STICKERS */}
                            {Array(9)
                                .fill('')
                                .map((_, j) => (
                                    <div
                                        key={i + '-' + j}
                                        style={{
                                            // Get rotation from i and j
                                            borderRadius: BORDER_RADIUS[j],
                                            opacity:
                                                ij == i + '-' + j || ij == ''
                                                    ? 1
                                                    : 0.4,
                                            backgroundColor: COLOURS[i],
                                            transform:
                                                ij == i + '-' + j
                                                    ? stickerTransform
                                                    : 'none',
                                            zIndex: ij == i + '-' + j ? 2 : 1,
                                            boxShadow:
                                                'inset 0 0 0 2px rgba(0,0,0,0.1)',
                                            ...stickerlessStyle.sticker,
                                            ...blackStyle.sticker,
                                            ...whiteStyle.sticker,
                                            ...purpleStyle.sticker,
                                        }}
                                        className="flex h-full w-full items-center justify-center transition-all duration-700"
                                    />
                                ))}
                        </div>
                    ))}
            </div>
        </div>
    )
}
