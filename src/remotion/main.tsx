

import React from 'react';
import { AbsoluteFill, Sequence, OffthreadVideo } from 'remotion';
import { Block, Track } from "./models/track-types"
import TimedZoomedVideo from './zoom';

const BlockComp: React.FC<{
    block: Block;
    videoURL: string
}> = ({ block, videoURL }) => {
    if (block.type === 'zoom') {
        return <TimedZoomedVideo videoURL={videoURL} blockConfig={block} />
    }

    throw new Error(`Unknown item type: ${JSON.stringify(block)}`);
};

const TrackComp: React.FC<{
    track: Track;
    videoURL: string
}> = ({ track, videoURL }) => {
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
                        <BlockComp block={block} videoURL={videoURL} />
                    </Sequence>
                );
            })}
        </AbsoluteFill>
    );
};

export const Main: React.FC<{
    tracks: Track[];
    videoURL: string
}> = ({ tracks, videoURL }) => {
    console.log("tracks data", tracks)
    return (
        <AbsoluteFill>
            <OffthreadVideo src={videoURL} />
            src={videoURL}

            {tracks.map((track) => {
                return <TrackComp track={track} key={track.id} videoURL={videoURL} />;
            })}
        </AbsoluteFill>
    );
};
