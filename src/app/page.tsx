"use client"
import VideoEditor from "@/features/video-editor";
import VideoUploadCard from "@/features/video-upload";
import { useRef, useState } from "react";
import { PlayerRef } from "@remotion/player";
export default function Home() {
  const [uploadedVideoURL, setUploadedVideoURL] = useState<string>()
  const [videoDuration, setVideoDuration] = useState<number>()
  const [currentFrame, setCurrentFrame] = useState(0);
  const playerRef = useRef<PlayerRef>(null);

  const handleUploadedVideoCallback = (videoURL: string) => {
    setUploadedVideoURL(videoURL)
  }
  const handleVideDuration = (duration: number) => {
    setVideoDuration(duration)

  }
  const handleFrameSelect = (newFrame: number) => {
    setCurrentFrame(newFrame);
    if (playerRef && playerRef.current) {
      playerRef.current.pause();
      playerRef.current.seekTo(newFrame);
    }
  };
  const canViewEditor = playerRef && videoDuration && uploadedVideoURL
  console.log("duration", playerRef)
  return (
    <>
      <VideoUploadCard handleUploadedVideoCallback={handleUploadedVideoCallback} handleVideoDurationCallback={handleVideDuration} />
      {canViewEditor && <VideoEditor playerRef={playerRef} videoDuration={videoDuration} videoURL={uploadedVideoURL} currentFrame={currentFrame} setCurrentFrame={setCurrentFrame} />}
    </>
  );
}
