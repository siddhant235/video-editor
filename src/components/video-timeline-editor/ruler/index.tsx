interface TimelineRulerProps {
    duration: number;
    framesPerSecond: number;
}

const VideoTimeLineRuler = (props: TimelineRulerProps) => {
    const { duration, framesPerSecond } = props
    const ticks = []
    for (let i = 0; i <= duration; i++) {
        ticks.push(
            <div key={i} className="absolute h-4 border-l border-gray-300" style={{ left: `${i * framesPerSecond}px` }}>
                <span className="absolute top-4 left-0 text-xs">{i}s</span>
            </div>
        )
    }
    return <div className="relative h-8 mb-2">{ticks}</div>
}

export default VideoTimeLineRuler;