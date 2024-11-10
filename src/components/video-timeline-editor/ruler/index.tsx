import { ReactElement } from "react";

interface TimelineRulerProps {
    duration: number;
    pixelsPerSecond: number;
}

const VideoTimeLineRuler = (props: TimelineRulerProps) => {
    const { duration, pixelsPerSecond } = props
    const ticks: ReactElement[] = []
    for (let i = 0; i <= duration; i++) {
        ticks.push(
            <div key={i} className="absolute h-4 border-l border-gray-300" style={{ left: `${i * pixelsPerSecond}px` }}>
                <span className="absolute top-4 left-0 text-xs">{i}s</span>
            </div>
        )
    }
    return <div className="relative h-8 mb-2">{ticks}</div>
}

export default VideoTimeLineRuler;