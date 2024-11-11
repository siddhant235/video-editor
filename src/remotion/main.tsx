

import React from 'react';
import { AbsoluteFill, Sequence, OffthreadVideo, Video } from 'remotion';
import { Block, Track } from "./models/track-types"
import TimedZoomedVideo from './zoom';

const BlockComp: React.FC<{
    block: Block;
    videoURL: string;
    fps: number
}> = ({ block, videoURL, fps }) => {
    if (block.type === 'zoom') {
        return <TimedZoomedVideo videoURL={videoURL} blockConfig={block} fps={fps} />
    }

    throw new Error(`Unknown item type: ${JSON.stringify(block)}`);
};

const TrackComp: React.FC<{
    track: Track;
    videoURL: string;
    fps: number
}> = ({ track, videoURL, fps }) => {
    return (
        <AbsoluteFill>
            {track.blocks.map((block) => {
                const duration = block.endTime - block.startTime
                return (
                    <Sequence
                        key={block.id}
                        from={block.startTime * 30}
                        durationInFrames={duration * 30}
                    >
                        <BlockComp block={block} videoURL={videoURL} fps={fps} />
                    </Sequence>
                );
            })}
        </AbsoluteFill>
    );
};

export const Main: React.FC<{
    tracks: Track[];
    videoURL: string;
    fps: number
}> = ({ tracks, videoURL, fps }) => {
    return (
        <AbsoluteFill>
            <Video src={videoURL} />
            {tracks.map((track) => {
                return <TrackComp track={track} key={track.id} videoURL={videoURL} fps={fps} />;
            })}
        </AbsoluteFill>
    );
};
