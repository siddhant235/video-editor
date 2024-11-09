import { useCurrentPlayerFrame } from '@/hooks/use-current-player-frame';
import React, { useState, useEffect } from 'react';

// A component for the individual clip on the timeline
const Clip = ({ clip, start, duration, onDrag, onResize }) => {
    return (
        <div
            style={{
                position: 'absolute',
                left: `${start}%`,
                width: `${duration}%`,
                top: '0',
                height: '100%',
                backgroundColor: 'rgba(0, 255, 0, 0.5)',
                cursor: 'pointer',
            }}
            onMouseDown={(e) => onDrag(e, clip)}
            onResize={(e) => onResize(e, clip)}
        />
    );
};

// Main Timeline component
const VideoTimeline = ({ videoDuration, currentFrame, setCurrentFrame, onFrameSelect, playerRef }) => {
    const frame = useCurrentPlayerFrame(playerRef)
    const playheadPosition = (frame / videoDuration) * 100;
    console.log("frames", frame)
    const handlePlayheadChange = (e) => {
        const newPlayheadPosition = e.target.value;
        const newFrame = Math.round((newPlayheadPosition / 100) * videoDuration);
        onFrameSelect(newFrame); // Sync Remotion player to this frame
    };
    const [playhead, setPlayhead] = useState(0); // Current playback position
    const [clips, setClips] = useState([
        { id: 1, start: 0, duration: 20 },  // Example clip starting at 0% and lasting 20% of the total video duration
        { id: 2, start: 40, duration: 30 }, // Another example clip
    ]);
    const [isDragging, setIsDragging] = useState(false);
    const [draggedClip, setDraggedClip] = useState(null);

    // Update playhead every second
    useEffect(() => {
        const interval = setInterval(() => {
            setPlayhead((prev) => (prev + 1) % 100); // Update playhead position (in percent)
        }, 1000); // Update every second
        return () => clearInterval(interval);
    }, []);

    // Drag event handler
    const handleDrag = (e, clip) => {
        if (!isDragging) return;
        const newStart = Math.min(Math.max(e.clientX, 0), videoDuration); // Ensure clip is within bounds
        const newClip = { ...clip, start: newStart };
        setClips((prevClips) =>
            prevClips.map((c) => (c.id === clip.id ? newClip : c))
        );
    };

    // Resize event handler (for clip resizing)
    const handleResize = (e, clip) => {
        // Logic to resize the clip based on mouse movement
    };

    // Time ruler
    const timeMarkers = [];
    for (let i = 0; i <= 100; i += 10) {
        timeMarkers.push(i);
    }

    return (
        <div style={{ position: 'relative', width: '100%', height: '150px', backgroundColor: '#333' }}>
            {/* Time Ruler */}
            <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '30px', display: 'flex' }}>
                {timeMarkers.map((marker) => (
                    <div
                        key={marker}
                        style={{
                            position: 'relative',
                            flex: 1,
                            borderLeft: '1px solid white',
                            textAlign: 'center',
                            color: 'white',
                            fontSize: '12px',
                        }}
                    >
                        {marker}
                    </div>
                ))}
            </div>

            {/* Timeline Tracks */}
            <div
                style={{
                    position: 'absolute',
                    top: '30px',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#222',
                }}
            >
                {clips.map((clip) => (
                    <Clip
                        key={clip.id}
                        clip={clip}
                        start={clip.start}
                        duration={clip.duration}
                        onDrag={handleDrag}
                        onResize={handleResize}
                    />
                ))}
            </div>

            {/* Playhead */}
            <div
                style={{
                    position: 'absolute',
                    left: `${playhead}%`,
                    top: '0',
                    width: '2px',
                    height: '100%',
                    backgroundColor: 'red',
                }}
            ></div>

            {/* Allow manual control of playhead */}
            <input
                type="range"
                min="0"
                max="100"
                value={playheadPosition}
                onChange={handlePlayheadChange}
                style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    width: '100%',
                }}
            />
        </div>
    );
};
export default VideoTimeline