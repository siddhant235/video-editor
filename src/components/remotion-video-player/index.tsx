import { Main } from '@/remotion/main';
import { Track } from '@/remotion/models/track-types';
import { Player } from '@remotion/player';
import { RefObject } from 'react';
import { PlayerRef } from "@remotion/player"
interface RemotionPlayerProps {
    videoURL: string
    width?: number;
    height?: number;
    videoDuration: number;
    playerRef: RefObject<PlayerRef>;
    fps?: number;
    tracks: Track[];
    inputProps: {
        videoURL: string;
        tracks: Track[];
        fps: number
    }
}
const RemotionPlayer = (props: RemotionPlayerProps) => {
    const { width = 500, height = 500, playerRef, videoDuration, fps = 30, inputProps } = props
    const videoDurationInFrames = Math.ceil(videoDuration * fps)
    const playerStyles = {
        width: width,
        height: height,
        borderRadius: "10px"
    }
    return (
        <div>
            {inputProps.videoURL === null ? null : (
                <Player
                    ref={playerRef}
                    component={Main}
                    durationInFrames={videoDurationInFrames}
                    compositionWidth={1920}
                    compositionHeight={1080}
                    fps={fps}
                    inputProps={inputProps}
                    controls
                    style={playerStyles}
                />
            )}

        </div>
    );
};

export default RemotionPlayer