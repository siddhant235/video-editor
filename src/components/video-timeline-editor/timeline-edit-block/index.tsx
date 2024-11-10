import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Block } from "@/remotion/models/track-types";
import { Label } from "@radix-ui/react-label";

interface EditBlockProps {
    selectedBlock: Block;
    handleBlockChange: (name: any, event: any) => void
}
const EditBlock = (props: EditBlockProps) => {
    const { selectedBlock, handleBlockChange } = props
    return (
        <Card className="p-4">
            <h3 className="text-lg font-semibold mb-2">Edit Block</h3>
            <div className="space-y-4">
                <div>
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                        id="startTime"
                        type="number"
                        value={selectedBlock.startTime}
                        onChange={(e) => handleBlockChange('startTime', parseFloat(e.target.value))}
                    />
                </div>
                <div>
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                        id="endTime"
                        type="number"
                        value={selectedBlock.endTime}
                        onChange={(e) => handleBlockChange('endTime', parseFloat(e.target.value))}
                    />
                </div>
                <div>
                    <Label htmlFor="xAxis">X Coordinates</Label>
                    <Input
                        id="xAxis"
                        type="number"
                        value={selectedBlock.xAxis}
                        onChange={(e) => handleBlockChange('xAxis', parseFloat(e.target.value))}
                    />
                </div>
                <div>
                    <Label htmlFor="yAxis">Y coordinates</Label>
                    <Input
                        id="yAxis"
                        type="number"
                        value={selectedBlock.yAxis}
                        onChange={(e) => handleBlockChange('yAxis', parseFloat(e.target.value))}
                    />
                </div>
                <div>
                    <Label htmlFor="duration">Scale</Label>
                    <Input
                        id="scale"
                        type="number"
                        value={selectedBlock.scaleFactor}
                        onChange={(e) => handleBlockChange('scaleFactor', parseFloat(e.target.value))}
                    />
                </div>
            </div>
        </Card>
    )
}

export default EditBlock