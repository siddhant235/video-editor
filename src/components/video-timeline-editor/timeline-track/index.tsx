import { Block, Track } from "@/remotion/models/track-types"
import TimelineBlock from "../timeline-track-block"

interface TimeLineTrackProps {

    track: Track,
    pixelsPerSecond: number,
    onSelectBlock: (block: Block) => void,
    onDragBlock: (id: string, newStart: number, newEnd: number) => void,
    onResizeBlock: (id: string, newDuration: number, resizeDirection: string) => void,
    selectedBlockId: string

}
// Track component
const TimeLineTrack = (props: TimeLineTrackProps) => {
    const {
        track,
        pixelsPerSecond,
        onSelectBlock,
        onDragBlock,
        onResizeBlock,
        selectedBlockId
    } = props
    return (
        <div className="relative h-16 bg-gray-100 mb-2 overflow-hidden">
            {track.blocks.map((block: Block) => (
                <TimelineBlock
                    key={block.id}
                    block={block}
                    pixelsPerSecond={pixelsPerSecond}
                    onSelect={onSelectBlock}
                    onDrag={onDragBlock}
                    onResize={onResizeBlock}
                    selectedBlockId={selectedBlockId}
                />
            ))}
        </div>
    )
}

export default TimeLineTrack;