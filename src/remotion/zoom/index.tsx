import { Video, interpolate, useCurrentFrame } from "remotion";

interface TimedZoomedVideoProps {
    videoURL: string
}
const TimedZoomedVideo = (props: TimedZoomedVideoProps) => {
    const { videoURL } = props
    const frame = useCurrentFrame();

    // Define start and end frames for zoom effect
    const zoomStartFrame = 0; // Start frame for zoom
    const zoomEndFrame = 60; // End frame for zoom

    // Coordinates to zoom into
    const zoomX = 300; // x-coordinate to center on
    const zoomY = 100; // y-coordinate to center on
    const maxZoomScale = 4; // Maximum scale factor for zoom (e.g., 2 for double zoom)

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