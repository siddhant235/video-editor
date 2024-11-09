import { MyComposition } from '@/remotion/Composition';
import TimedZoomedVideo from '@/remotion/zoom';
import { Player } from '@remotion/player';
interface RemotionPlayerProps {
    videoURL: string
    width?: number;
    height?: number;
    currentFrame?: number;
    setCurrentFrame?: number;
    videoDuration?: number;
    playerRef: any
}
const RemotionPlayer = (props: RemotionPlayerProps) => {
    const { videoURL, width = 500, height = 500, currentFrame, setCurrentFrame, playerRef } = props
    return (
        <div>
            {videoURL === null ? null : (
                <Player
                    ref={playerRef}
                    component={TimedZoomedVideo}
                    durationInFrames={330}
                    compositionWidth={1920}
                    compositionHeight={1080}
                    fps={30}
                    inputProps={{ videoURL }}
                    controls
                    style={{
                        width: width,
                        height: height
                    }}
                    // currentTime={currentTime}
                    initialFrame={currentFrame}
                />
            )}

        </div>
    );
};

export default RemotionPlayer