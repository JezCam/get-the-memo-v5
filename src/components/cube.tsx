import React from 'react'
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
} from '@/lib/piece-transforms'
import { Rotation, PieceType, Style } from '@/lib/definitions'

export default function Cube(props: {
    pieceType: PieceType
    rotation: Rotation
    style: Style
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
                  },
                  sticker: {},
              }
            : {}
    const purpleStyle =
        props.style === 'purple'
            ? {
                  face: {
                      backgroundColor: '#7c3aed',
                  },
                  sticker: {},
              }
            : {}

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
                                gap: '6px',
                                padding: '3px',
                                ...stickerlessStyle.face,
                                ...blackStyle.face,
                                ...whiteStyle.face,
                                ...purpleStyle.face,
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
                                                ij == i + '-' + j ? 1 : 0.4,
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
