import { Position } from "./position";
import { Size } from "./size";
import { TextItemData } from "./text-item-data";

export type DraggableItemData = {
  id: string;
  zIndex?: number;
  position: Position;
  size: Size;
  contents: Array<DraggableItemData | TextItemData>;
};
