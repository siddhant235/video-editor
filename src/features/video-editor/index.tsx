import RemotionPlayer from "@/components/remotion-video-player";
import VideoTimeLine from "@/components/video-timeline-editor";
import { Track } from "@/remotion/models/track-types";
import { useMemo, useState } from "react";
import { PlayerRef } from "@remotion/player"
interface VideoEditorProps {
    playerRef: React.RefObject<PlayerRef>;
    videoDuration: number; //in seconds
    videoURL: string;
}
const VideoEditor = (props: VideoEditorProps) => {
    const { playerRef, videoURL, videoDuration } = props
    const videoFPS = 30
    const [tracks, setTracks] = useState<Track[]>([
        { id: 'Track 1', blocks: [] },
    ]);
    const inputProps = useMemo(() => {
        return {
            tracks,
            videoURL
        };
    }, [tracks]);
    return (
        <div className="relative">
            <div className="flex center w-screen justify-center ml-10 rounded-lg overflow-hidden">
                <RemotionPlayer videoURL={videoURL} videoDuration={videoDuration} playerRef={playerRef} width={700} height={400} inputProps={inputProps} tracks={tracks} fps={videoFPS} />
            </div>
            <VideoTimeLine videoRef={playerRef} videoDuration={videoDuration} tracks={tracks} setTracks={setTracks} videoFPS={videoFPS} />
        </div>
    )
}

export default VideoEditor;