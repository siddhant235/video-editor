import React, { RefObject } from 'react';
import { AbsoluteFill, Sequence, Video } from 'remotion';
import { Block, Track } from "./models/track-types"
import TimedZoomedVideo from './zoom';
import { PlayerRef } from "@remotion/player"
const BlockComp: React.FC<{
    block: Block;
    videoURL: string;
    fps: number;
    playerRef: RefObject<PlayerRef>
}> = ({ block, videoURL, fps, playerRef }) => {

    if (block.type === 'zoom') {
        return <TimedZoomedVideo videoURL={videoURL} blockConfig={block} fps={fps} playerRef={playerRef} />
    }

    throw new Error(`Unknown item type: ${JSON.stringify(block)}`);
};

const TrackComp: React.FC<{
    track: Track;
    videoURL: string;
    fps: number;
    playerRef: RefObject<PlayerRef>
}> = ({ track, videoURL, fps, playerRef }) => {
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
                        <BlockComp block={block} videoURL={videoURL} fps={fps} playerRef={playerRef} />
                    </Sequence>
                );
            })}
        </AbsoluteFill>
    );
};

export const Main: React.FC<{
    tracks: Track[];
    videoURL: string;
    fps: number;
    playerRef: RefObject<PlayerRef>
}> = ({ tracks, videoURL, fps, playerRef }) => {
    return (
        <AbsoluteFill>
            <Video src={videoURL} />
            {tracks.map((track) => {
                return <TrackComp track={track} key={track.id} videoURL={videoURL} fps={fps} playerRef={playerRef} />;
            })}
        </AbsoluteFill>
    );
};
