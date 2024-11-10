import { interpolate, useCurrentFrame, OffthreadVideo, Video } from "remotion";
import { Block } from "../models/track-types";

interface TimedZoomedVideoProps {
    videoURL: string
    blockConfig: Block
}
const TimedZoomedVideo = (props: TimedZoomedVideoProps) => {
    const { videoURL, blockConfig } = props
    const { startTime, endTime, xAxis, yAxis, scaleFactor } = blockConfig
    const frame = useCurrentFrame();
    const zoomStartFrame = 60; // Start frame for zoom
    const zoomEndFrame = 90; // End frame for zoom

    // Coordinates to zoom into
    const zoomX = 100;
    const zoomY = 100;
    const maxZoomScale = 2;

    const scale = interpolate(
        frame,
        [zoomStartFrame, zoomEndFrame, zoomEndFrame + 1, zoomEndFrame + 30],
        [1, maxZoomScale, maxZoomScale, 1], // Zoom in and out
        {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );

    // Interpolating translate values to position focus area within zoom range
    const translateX = interpolate(
        frame,
        [zoomStartFrame, zoomEndFrame, zoomEndFrame + 1, zoomEndFrame + 30],
        [0, -zoomX * (maxZoomScale - 1), -zoomX * (maxZoomScale - 1), 0],
        {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );

    const translateY = interpolate(
        frame,
        [zoomStartFrame, zoomEndFrame, zoomEndFrame + 1, zoomEndFrame + 30],
        [0, -zoomY * (maxZoomScale - 1), -zoomY * (maxZoomScale - 1), 0],
        {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        }
    );

    return (
        <Video
            src={videoURL}
            style={{
                transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
            }}
        />
    );
};

export default TimedZoomedVideo