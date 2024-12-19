import React from 'react'
import Quaternion from 'quaternion'
import {
    COLOURS,
    CORNER_INDEX_MAP,
    CORNER_ROTATIONS,
    CORNER_TRANSFORMS,
    EDGE_INDEX_MAP,
    EDGE_ROTATIONS,
    EDGE_TRANSFORMS,
    FACE_TRANSFORMS,
} from '@/lib/piece-transforms'
import { Letter, PieceType } from '@/lib/definitions'

export default function Cube(props: { pieceType: PieceType; letter: Letter }) {
    const pieceRotation: [number, number, number, string] =
        props.pieceType === 'corner'
            ? CORNER_ROTATIONS[props.letter]
            : EDGE_ROTATIONS[props.letter]
    const stickerTransform =
        props.pieceType === 'corner'
            ? CORNER_TRANSFORMS[props.letter]
            : EDGE_TRANSFORMS[props.letter]
    const ij =
        props.pieceType === 'corner'
            ? CORNER_INDEX_MAP[props.letter]
            : EDGE_INDEX_MAP[props.letter]
    const quaternion = Quaternion.fromEuler(...pieceRotation)

    return (
        <div
            className="relative h-[200px] w-[200px]"
            style={{ perspective: '300px' }}
        >
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
                            }}
                            className="absolute grid h-[200px] w-[200px] grid-cols-3 gap-2 p-1"
                        >
                            {/* STICKERS */}
                            {Array(9)
                                .fill('')
                                .map((_, j) => (
                                    <div
                                        key={i + '-' + j}
                                        style={{
                                            // Get letter from i and j
                                            opacity:
                                                ij == i + '-' + j ? 1 : 0.3,
                                            backgroundColor: COLOURS[i],
                                            transform:
                                                ij == i + '-' + j
                                                    ? stickerTransform
                                                    : 'none',
                                        }}
                                        className="flex h-full w-full items-center justify-center rounded-md transition-all duration-700"
                                    />
                                ))}
                        </div>
                    ))}
            </div>
        </div>
    )
}
