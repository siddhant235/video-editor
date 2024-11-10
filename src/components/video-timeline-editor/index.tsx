import { Button } from "@/components/ui/button"
import { PlayCircle, PauseCircle, Plus } from 'lucide-react'
import { useState } from "react"
import VideoTimeLineRuler from "@/components/video-timeline-editor/ruler"
import TimeLineTrack from "@/components/video-timeline-editor/timeline-track"
import { Block, Track } from "@/remotion/models/track-types"
import { useCurrentPlayerFrame } from "@/hooks/use-current-player-frame"
import EditBlock from "./timeline-edit-block"
interface VideoTimeLineProps {
    videoRef: any;
    tracks?: any;
    setTracks?: any;
    videoDuration: number;
}
const VideoTimeLine = (props: VideoTimeLineProps) => {
    const { videoRef, videoDuration, tracks, setTracks } = props
    const currentVideoFrame = useCurrentPlayerFrame(videoRef) / 30
    const [selectedBlock, setSelectedBlock] = useState<any | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [pixelsPerSecond] = useState(50) // Zoom level

    const handlePlay = () => {
        const video = videoRef.current
        if (video) {
            video.play()
            setIsPlaying(true)
        }
    }

    const handlePause = () => {
        const video = videoRef.current
        if (video) {
            video.pause()
            setIsPlaying(false)
        }
    }

    const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const newTime = x / pixelsPerSecond
        if (videoRef.current) {
            videoRef.current.currentTime = newTime
        }
    }

    const handleAddBlock = () => {
        const newBlock: Block = {
            type: "zoom",
            id: Date.now().toString(),
            duration: 4,
            startTime: 2,
            endTime: 4,
            xAxis: 100,
            yAxis: 100,
            scaleFactor: 2
        }
        setTracks(tracks.map((track: Track, index: number) =>
            index === 0 ? { ...track, blocks: [...track.blocks, newBlock] } : track
        ))
    }
    console.log("new tracks", tracks)
    const handleBlockChange = (field: keyof any, value: string | number) => {
        if (!selectedBlock) return
        const updatedBlock = { ...selectedBlock, [field]: value }
        console.log("updated block", updatedBlock)
        setSelectedBlock(updatedBlock)
        setTracks(tracks.map((track: Track) => ({
            ...track,
            blocks: track.blocks.map(block =>
                block.id === selectedBlock.id ? updatedBlock : block
            )
        })))
    }

    const handleDragBlock = (id: string, newStart: number) => {
        setTracks(tracks.map((track: Track) => ({
            ...track,
            blocks: track.blocks.map(block =>
                block.id === id ? { ...block, startTime: newStart } : block
            )
        })))
    }

    const handleResizeBlock = (id: string, newDuration: number) => {
        setTracks(tracks.map((track: Track) => ({
            ...track,
            blocks: track.blocks.map(block =>
                block.id === id ? { ...block, duration: newDuration } : block
            )
        })))
    }

    return (
        <div className="p-4">
            <div className="mb-4">
            </div>
            <div className="mb-4 flex justify-center space-x-2">
                <Button onClick={handlePlay} disabled={isPlaying}>
                    <PlayCircle className="mr-2 h-4 w-4" /> Play
                </Button>
                <Button onClick={handlePause} disabled={!isPlaying}>
                    <PauseCircle className="mr-2 h-4 w-4" /> Pause
                </Button>
                <Button onClick={handleAddBlock}>
                    <Plus className="mr-2 h-4 w-4" /> Add zoom Block
                </Button>
            </div>
            <div className="border rounded p-4 mb-4 overflow-x-auto">
                <div style={{ width: `${videoDuration * pixelsPerSecond}px` }}>
                    <VideoTimeLineRuler duration={videoDuration} framesPerSecond={50} />
                    <div className="relative" onClick={handleTimelineClick}>
                        {tracks.map((track: Track) => (
                            <TimeLineTrack
                                key={track.id}
                                track={track}
                                pixelsPerSecond={pixelsPerSecond}
                                onSelectBlock={setSelectedBlock}
                                onDragBlock={handleDragBlock}
                                onResizeBlock={handleResizeBlock}
                                selectedBlockId={selectedBlock.id}
                            />
                        ))}
                        <div
                            className="absolute top-0 bottom-0 w-px bg-red-500"
                            style={{ left: `${currentVideoFrame * pixelsPerSecond}px` }}
                        />
                    </div>
                </div>
            </div>
            {selectedBlock && (
                <EditBlock selectedBlock={selectedBlock} handleBlockChange={handleBlockChange} />
            )}
        </div>
    )
}



export default VideoTimeLine;