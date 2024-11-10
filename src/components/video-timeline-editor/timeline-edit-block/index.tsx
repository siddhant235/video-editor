import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Block } from "@/remotion/models/track-types";
import { Label } from "@radix-ui/react-label";
import { X } from "lucide-react";

interface EditBlockProps {
    selectedBlock: Block;
    handleBlockChange: (name, event) => void
    onClose: () => void
    handleDeleteBlock: (blockId: string) => void
}
const EditBlock = (props: EditBlockProps) => {
    const { selectedBlock, handleBlockChange, onClose, handleDeleteBlock } = props
    return (
        <Card className="w-80 h-fit p-4 overflow-auto">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Edit Block</h3>
                <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </Button>
            </div>
            <ScrollArea className="h-fit">
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
                        <Label htmlFor="scale">Scale</Label>
                        <Input
                            id="scale"
                            type="number"
                            value={selectedBlock.scaleFactor}
                            onChange={(e) => handleBlockChange('scaleFactor', parseFloat(e.target.value))}
                        />
                    </div>
                    <Button
                        variant="destructive"
                        onClick={() => handleDeleteBlock(selectedBlock.id)}
                    >
                        Delete Block
                    </Button>
                </div>
            </ScrollArea>
        </Card>
    )
}

export default EditBlock