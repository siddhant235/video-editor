import { Button } from "@/components/ui/button"
import { PlayCircle, PauseCircle, Plus } from 'lucide-react'
import { RefObject, useRef, useState } from "react"
import VideoTimeLineRuler from "@/components/video-timeline-editor/ruler"
import TimeLineTrack from "@/components/video-timeline-editor/timeline-track"
import { Block, Track } from "@/remotion/models/track-types"
import { useCurrentPlayerFrame } from "@/hooks/use-current-player-frame"
import EditBlock from "./timeline-edit-block"
import { motion, useMotionValue } from "framer-motion"
import { PlayerRef } from "@remotion/player"
import { useDebouncedCallback } from 'use-debounce';
interface VideoTimeLineProps {
    videoRef: RefObject<PlayerRef>
    tracks: Track[];
    setTracks: React.Dispatch<React.SetStateAction<Track[]>>;
    videoDuration: number;
    videoFPS: number
}
const VideoTimeLine = (props: VideoTimeLineProps) => {
    const { videoRef, videoDuration, tracks, setTracks, videoFPS } = props
    const currentVideoFrame = useCurrentPlayerFrame(videoRef) / videoFPS //this gives the value in fps so dividing it by fps to get frame in seconds
    const [selectedBlock, setSelectedBlock] = useState<Block | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [pixelsPerSecond] = useState(30) // Zoom level
    const timeLineRef = useRef<HTMLDivElement>(null)
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

    const handleAddBlock = () => {
        const newBlock: Block = {
            type: "zoom",
            id: Date.now().toString(),
            startTime: currentVideoFrame,
            endTime: currentVideoFrame + 5,
            xAxis: 100,
            yAxis: 100,
            scaleFactor: 2
        }
        setTracks(tracks.map((track: Track, index: number) =>
            index === 0 ? { ...track, blocks: [...track.blocks, newBlock] } : track
        ))
    }
    const handleBlockChange = (field, value: string | number) => {
        if (!selectedBlock) return
        const updatedBlock = { ...selectedBlock, [field]: value }
        setSelectedBlock(updatedBlock)
        setTracks(tracks.map((track: Track) => ({
            ...track,
            blocks: track.blocks.map(block =>
                block.id === selectedBlock.id ? updatedBlock : block
            )
        })))
    }

    const handleDragBlock = useDebouncedCallback((id: string, newStart: number, newEnd: number) => {
        setTracks(tracks.map((track: Track) => ({
            ...track,
            blocks: track.blocks.map(block =>
                block.id === id ? { ...block, startTime: newStart, endTime: newEnd } : block
            )
        })))
    }, 10)

    const handleResizeBlock = (id: string, newDuration: number, resizeDirection: string) => {
        if (resizeDirection === "left") {
            setTracks(tracks.map((track: Track) => ({
                ...track,
                blocks: track.blocks.map(block =>
                    block.id === id ? { ...block, startTime: newDuration } : block
                )
            })))
        } else {
            setTracks(tracks.map((track: Track) => ({
                ...track,
                blocks: track.blocks.map(block =>
                    block.id === id ? { ...block, endTime: newDuration } : block
                )
            })))
        }
    }
    const handleDeleteBlock = (id: string) => {
        const filteredTrackBlocks = tracks.map((track: Track) => ({
            ...track,
            blocks: track.blocks.filter((block: Block) => block.id !== id)
        }))
        setTracks(filteredTrackBlocks)
        setSelectedBlock(null)
    }
    const handleDragEnd = (event, info) => {
        const newTime = (info.point.x * videoFPS) / pixelsPerSecond
        if (videoRef && videoRef.current) {
            videoRef.current.seekTo(newTime)
        }
    }
    const x = useMotionValue(currentVideoFrame)

    return (
        <div className="flex h-screen p-4">
            <div className="flex-1 mb-4 overflow-hidden">

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
                    <div ref={timeLineRef} style={{ width: `${videoDuration * pixelsPerSecond}px` }}>
                        <VideoTimeLineRuler duration={videoDuration} pixelsPerSecond={pixelsPerSecond} />
                        <div className="relative" >
                            {tracks.map((track: Track) => (
                                <TimeLineTrack
                                    key={track.id}
                                    track={track}
                                    pixelsPerSecond={pixelsPerSecond}
                                    onSelectBlock={setSelectedBlock}
                                    onDragBlock={(id, newStart, newEnd) => handleDragBlock(id, newStart, newEnd)}
                                    onResizeBlock={handleResizeBlock}
                                    selectedBlockId={selectedBlock?.id || ""}
                                    fps={videoFPS}
                                />
                            ))}
                            <motion.div
                                className="absolute top-0 bottom-0 w-0.5 bg-red-500 cursor-ew-resize"
                                style={{ x, left: `${currentVideoFrame * pixelsPerSecond}px` }}
                                drag="x"
                                dragMomentum={false}
                                dragElastic={0}
                                dragConstraints={timeLineRef}
                                onDragEnd={handleDragEnd}
                            >
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-1 py-0.5 rounded text-xs">
                                    {(currentVideoFrame).toFixed(2)}s
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
            {selectedBlock && (
                <div className="absolute right-0 -top-[60px] transition-all">
                    <EditBlock selectedBlock={selectedBlock} handleBlockChange={handleBlockChange} handleDeleteBlock={handleDeleteBlock} onClose={() => setSelectedBlock(null)} />
                </div>
            )}
        </div>
    )
}



export default VideoTimeLine;