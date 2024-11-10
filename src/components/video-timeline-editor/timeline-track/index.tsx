import TimelineBlock from "../timeline-track-block"

interface TimeLineTrackProps {

    track: any,
    pixelsPerSecond: number,
    onSelectBlock: (block: any) => void,
    onDragBlock: (id: string, newStart: number) => void,
    onResizeBlock: (id: string, newDuration: number) => void,
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
            {track.blocks.map((block: any) => (
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