

import React from 'react';
import { AbsoluteFill, Sequence, OffthreadVideo, Video } from 'remotion';
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

const Track: React.FC<{
    track: Track;
    videoURL: string
}> = ({ track, videoURL }) => {
    return (
        <AbsoluteFill>
            {track.blocks.map((block) => {
                console.log("block data", block)
                return (
                    <Sequence
                        key={block.id}
                        from={block.startTime * 30}
                        durationInFrames={block.duration}
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
            <Video src={videoURL} />
            src={videoURL}

            {tracks.map((track) => {
                return <Track track={track} key={track.id} videoURL={videoURL} />;
            })}
        </AbsoluteFill>
    );
};
