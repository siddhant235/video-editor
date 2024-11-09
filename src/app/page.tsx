"use client"
import RemotionPlayer from "@/components/remotion-video-player";
import VideoTimeline from "@/components/video-timeline";
import VideoUploadCard from "@/features/video-upload";
import { Editor } from "@/remotion/editor";
import TimedZoomedVideo from "@/remotion/zoom";
import { useRef, useState } from "react";

export default function Home() {
  const [uploadedVideoURL, setUploadedVideoURL] = useState<string>()
  const [videoDuration, setVideoDuration] = useState<number>()
  const [currentFrame, setCurrentFrame] = useState(0);
  const playerRef = useRef(null);
  const handleUploadedVideoCallback = (videoURL: string) => {
    console.log("video URL", videoURL)
    setUploadedVideoURL(videoURL)
  }
  const handleVideDuration = (duration: number) => {
    setVideoDuration(duration)

  }
  const handleFrameSelect = (newFrame: number) => {
    setCurrentFrame(newFrame);
    playerRef.current.pause(); // Pause playback
    playerRef.current.seekTo(newFrame); // Seek player to new frame
  };

  console.log("duration", videoDuration)
  return (
    <>
      <VideoUploadCard handleUploadedVideoCallback={handleUploadedVideoCallback} handleVideoDurationCallback={handleVideDuration} />
      {uploadedVideoURL && <RemotionPlayer videoURL={uploadedVideoURL} currentFrame={currentFrame} setCurrentFrame={setCurrentFrame} playerRef={playerRef} />}
      {videoDuration && <VideoTimeline videoDuration={videoDuration} currentFrame={currentFrame} setCurrentFrame={setCurrentFrame} onFrameSelect={handleFrameSelect} playerRef={playerRef} />}
      {/* <Editor /> */}
    </>
  );
}
