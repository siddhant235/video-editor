

import React from 'react';
import { AbsoluteFill, Sequence, OffthreadVideo } from 'remotion';
import { Item, Track } from "./models/track-types"

const ItemComp: React.FC<{
    item: Item;
}> = ({ item }) => {
    if (item.type === 'solid') {
        return <AbsoluteFill style={{ backgroundColor: item.color }} />;
    }

    if (item.type === 'text') {
        return <h1>{item.text}</h1>;
    }

    if (item.type === 'video') {
        return <OffthreadVideo src={item.src} />;
    }

    throw new Error(`Unknown item type: ${JSON.stringify(item)}`);
};

const Track: React.FC<{
    track: Track;
}> = ({ track }) => {
    return (
        <AbsoluteFill>
            {track.items.map((item) => {
                return (
                    <Sequence
                        key={item.id}
                        from={item.from}
                        durationInFrames={item.durationInFrames}
                    >
                        <ItemComp item={item} />
                    </Sequence>
                );
            })}
        </AbsoluteFill>
    );
};

export const Main: React.FC<{
    tracks: Track[];
}> = ({ tracks }) => {
    return (
        <AbsoluteFill>
            {tracks.map((track) => {
                return <Track track={track} key={track.name} />;
            })}
        </AbsoluteFill>
    );
};
