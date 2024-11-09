
type BaseItem = {
    from: number;
    durationInFrames: number;
    id: string;
};

export type SolidItem = BaseItem & {
    type: 'solid';
    color: string;
};

export type TextItem = BaseItem & {
    type: 'text';
    text: string;
    color: string;
};

export type VideoItem = BaseItem & {
    type: 'video';
    src: string;
};

export type ZoomBlock = BaseItem & {
    type: "zoom",
    startTime: number;
    endTime: number;
    xAxis: number;
    yAxis: number;
    scaleFactor: number

}

export type Item = SolidItem | TextItem | VideoItem | ZoomBlock;

export type Track = {
    name: string;
    items: Item[];
};