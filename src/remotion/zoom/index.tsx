import React from "react";
import { interpolate, OffthreadVideo, useCurrentFrame, Video } from "remotion";
import { Block } from "../models/track-types";

interface TimedZoomedVideoProps {
    videoURL: string
    blockConfig: Block;
    fps: number
}
const TimedZoomedVideo = (props: TimedZoomedVideoProps) => {
    const { videoURL, blockConfig, fps } = props
    const { startTime, endTime, xAxis, yAxis, scaleFactor } = blockConfig
    const frame = useCurrentFrame();
    const zoomStartFrame = startTime * fps; // Start frame for zoom
    const zoomEndFrame = endTime * fps; // End frame for zoom
    // Coordinates to zoom into
    const zoomX = xAxis;
    const zoomY = yAxis;
    const maxZoomScale = scaleFactor;

    const scale = interpolate(
        frame,
        [zoomStartFrame, zoomEndFrame],
        [1, maxZoomScale], // Zoom in and out

    );

    // Interpolating translate values to position focus area within zoom range
    const translateX = interpolate(
        frame,
        [zoomStartFrame, zoomEndFrame],
        [1, -zoomX * (maxZoomScale - 1)],

    );

    const translateY = interpolate(
        frame,
        [zoomStartFrame, zoomEndFrame],
        [1, -zoomY * (maxZoomScale - 1)],

    );

    return (
        <Video
            src={videoURL}
            style={{
                transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
            }}
            startFrom={zoomStartFrame}
            endAt={zoomEndFrame}
        />
    );
};

export default React.memo(TimedZoomedVideo)