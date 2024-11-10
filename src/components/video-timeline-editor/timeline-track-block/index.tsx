import { useRef } from "react"
import { motion } from 'framer-motion'
import { Block } from "@/remotion/models/track-types"

interface TimeLineBlockProps {
    block: Block,
    pixelsPerSecond: number,
    onSelect: (block: Block) => void,
    onDrag: (id: string, newStart: number) => void,
    onResize: (id: string, newDuration: number) => void,
    selectedBlockId: string
}

const TimelineBlock = (props: TimeLineBlockProps) => {
    const {
        block,
        pixelsPerSecond,
        onSelect,
        onDrag,
        onResize,
        selectedBlockId
    } = props
    const blockRef = useRef<HTMLDivElement>(null)
    const duration = (block.endTime - block.startTime)
    const handleDrag = (event: any, info: any) => {
        const newStart = block.startTime + info.delta.x / pixelsPerSecond
        onDrag(block.id, Math.max(0, newStart))
    }

    const handleResize = (event: any, info: any) => {
        const newDuration = duration + info.delta.x / pixelsPerSecond
        onResize(block.id, Math.max(0.5, newDuration))
    }
    const isBlockSelected = selectedBlockId === block.id
    const selectedBlockStyle = "border-2 border-purple-500"
    return (
        <motion.div
            ref={blockRef}
            className={`absolute h-12 bg-blue-500 rounded cursor-move ${isBlockSelected && selectedBlockStyle}`}
            style={{
                left: `${block.startTime * pixelsPerSecond}px`,
                width: `${block.duration * pixelsPerSecond}px`,
            }}
            drag="x"
            dragMomentum={false}
            onDrag={handleDrag}
            onClick={() => onSelect(block)}
        >
            <span className="text-white text-xs p-1 truncate block">{block.id}</span>
            <motion.div
                className="absolute right-0 top-0 bottom-0 w-2 bg-blue-700 cursor-ew-resize"
                drag="x"
                dragMomentum={false}
                dragConstraints={blockRef}
                onDrag={handleResize}
            />
        </motion.div>
    )
}

export default TimelineBlock