import { useCurrentPlayerFrame } from "@/hooks/use-current-player-frame";
import React, { RefObject } from "react";
import { interpolate, Video } from "remotion";
import { Block } from "../models/track-types";
import { PlayerRef } from "@remotion/player"
interface TimedZoomedVideoProps {
    videoURL: string
    blockConfig: Block;
    fps: number;
    playerRef: RefObject<PlayerRef>
}
const TimedZoomedVideo = (props: TimedZoomedVideoProps) => {
    const { videoURL, blockConfig, fps, playerRef } = props
    const { startTime, endTime, xAxis, yAxis, scaleFactor } = blockConfig
    const frame = useCurrentPlayerFrame(playerRef)
    const zoomStartFrame = startTime * fps; // Start frame for zoom
    const zoomEndFrame = endTime * fps; // End frame for zoom

    const calculateZoom = (config) => {
        const { startTime, endTime, x, y, zoomFactor } = config;
        const startFrame = startTime * fps;
        const endFrame = endTime * fps;
        if (frame < startFrame || frame > endFrame) {
            return null;
        }
        const progress = interpolate(
            frame,
            [startFrame, endFrame],
            [0, 1],
        );
        const currentZoomFactor = interpolate(progress, [0, 1], [1, zoomFactor]);
        const xOffset = (1 - 1 / currentZoomFactor) * x;
        const yOffset = (1 - 1 / currentZoomFactor) * y;

        return { scale: currentZoomFactor, x: xOffset, y: yOffset };
    };

    const currentZoom = calculateZoom({
        startTime, endTime, x: xAxis, y: yAxis, zoomFactor: scaleFactor
    })!;


    return (
        <Video
            src={videoURL}
            style={currentZoom && {
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: `scale(${currentZoom.scale}) translate(${-currentZoom.x}px, ${-currentZoom.y}px)`,
            }}
            startFrom={zoomStartFrame}
            endAt={zoomEndFrame}
        />
    );
};

export default TimedZoomedVideo