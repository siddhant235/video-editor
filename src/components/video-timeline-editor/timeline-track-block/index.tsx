import { useRef } from "react"
import { motion } from 'framer-motion'
import { Block } from "@/remotion/models/track-types"

interface TimeLineBlockProps {
    block: Block,
    pixelsPerSecond: number,
    onSelect: (block: Block) => void,
    onDrag: (id: string, newStart: number, newEnd: number) => void,
    onResize: (id: string, newDuration: number, resizeDirection: string) => void,
    selectedBlockId: string;
    fps: number
}

const TimelineBlock = (props: TimeLineBlockProps) => {
    const {
        block,
        pixelsPerSecond,
        onSelect,
        onDrag,
        onResize,
        selectedBlockId,
    } = props
    const blockRef = useRef<HTMLDivElement>(null)
    const duration = block.endTime - block.startTime
    const handleDrag = (event, info) => {
        const dragOffset = (info.offset.x / pixelsPerSecond)
        const newStart = Math.max(0, block.startTime + dragOffset);
        const newEnd = newStart + duration;
        onDrag(block.id, Math.max(0, newStart), newEnd)
    }

    const handleResizeEnd = (event, info) => {
        const newDuration = block.endTime + info.delta.x / pixelsPerSecond
        onResize(block.id, Math.max(0.5, newDuration), "right")
    }
    const handleResizeStart = (event, info) => {
        const newDuration = block.startTime + info.delta.x / pixelsPerSecond
        onResize(block.id, Math.max(0.5, newDuration), "left")
    }
    const isBlockSelected = selectedBlockId === block.id
    const selectedBlockStyle = "border-2 border-purple-500"

    return (

        <motion.div
            ref={blockRef}
            className={`absolute h-12 bg-blue-500 rounded cursor-move ${isBlockSelected && selectedBlockStyle}`}
            style={{
                left: `${Math.ceil(((block.startTime) * pixelsPerSecond))}px`,
                width: `${duration * pixelsPerSecond}px`,
            }}
            drag="x"
            dragMomentum={false}
            onDrag={handleDrag}
            onClick={() => onSelect(block)}
        >
            <motion.div
                className="absolute left-0 top-0 bottom-0 w-2 bg-blue-700 cursor-ew-resize"
                drag="x"
                dragMomentum={false}
                dragConstraints={blockRef}
                onDrag={handleResizeStart}
            />
            <span className="text-white text-xs p-1 truncate block">{block.id}</span>
            <motion.div
                className="absolute right-0 top-0 bottom-0 w-2 bg-blue-700 cursor-ew-resize"
                drag="x"
                dragMomentum={false}
                dragConstraints={blockRef}
                onDrag={handleResizeEnd}
            />
        </motion.div>
    )
}

export default TimelineBlock