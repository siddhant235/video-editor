import React, { useMemo, useState } from 'react';
import { Player } from '@remotion/player';
import type { Item } from '../models/track-types';
import { Main } from '../main';

type Track = {
    name: string;
    items: Item[];
};

export const Editor = () => {
    const [tracks, setTracks] = useState<Track[]>([
        {
            name: 'Track 1', items: [
                {
                    type: 'text',
                    text: "hello",
                    color: "black",
                    from: 2,
                    durationInFrames: 60,
                    id: "text-1"
                }
            ]
        },
        { name: 'Track 2', items: [] },
    ]);
    console.log("tracks", tracks)
    const inputProps = useMemo(() => {
        return {
            tracks,
        };
    }, [tracks]);

    return (
        <>
            <Player
                component={Main}
                fps={30}
                inputProps={inputProps}
                durationInFrames={600}
                compositionWidth={1280}
                compositionHeight={720}
            />
        </>
    );
};