export type ZoomBlock = {
    type: "zoom",
    id: string;
    startTime: number;
    endTime: number;
    duration: number;
    xAxis: number;
    yAxis: number;
    scaleFactor: number

}
export type Block = ZoomBlock;
export type Track = {
    id: string;
    blocks: Block[];
};