import RemotionPlayer from "@/components/remotion-video-player";
import VideoTimeLine from "@/components/video-timeline-editor";
import { Track } from "@/remotion/models/track-types";
import { useMemo, useState } from "react";

interface VideoEditorProps {
    playerRef: any;
    videoDuration: number; //in seconds
    videoURL: string;
    currentFrame: any;
    setCurrentFrame: any;
}
const VideoEditor = (props: VideoEditorProps) => {
    const { playerRef, videoURL, videoDuration, currentFrame, setCurrentFrame } = props
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
                <RemotionPlayer videoURL={videoURL} videoDuration={videoDuration} currentFrame={currentFrame} setCurrentFrame={setCurrentFrame} playerRef={playerRef} width={700} height={400} inputProps={inputProps} tracks={tracks} />
            </div>
            <VideoTimeLine videoRef={playerRef} videoDuration={videoDuration} tracks={tracks} setTracks={setTracks} />
        </div>
    )
}

export default VideoEditor;