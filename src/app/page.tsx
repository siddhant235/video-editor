"use client"
import VideoEditor from "@/features/video-editor";
import VideoUploadCard from "@/features/video-upload";
import { useRef, useState } from "react";
import { PlayerRef } from "@remotion/player";
export default function Home() {
  const [uploadedVideoURL, setUploadedVideoURL] = useState<string>()
  const [videoDuration, setVideoDuration] = useState<number>()
  const playerRef = useRef<PlayerRef>(null);

  const handleUploadedVideoCallback = (videoURL: string) => {
    setUploadedVideoURL(videoURL)
  }
  const handleVideDuration = (duration: number) => {
    setVideoDuration(duration)

  }
  const canViewEditor = playerRef && videoDuration && uploadedVideoURL
  console.log("duration", playerRef)
  return (
    <>
      <VideoUploadCard handleUploadedVideoCallback={handleUploadedVideoCallback} handleVideoDurationCallback={handleVideDuration} />
      {canViewEditor && <VideoEditor playerRef={playerRef} videoDuration={videoDuration} videoURL={uploadedVideoURL} />}
    </>
  );
}
