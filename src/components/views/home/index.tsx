import { useState } from "react";
import styles from "./styles.module.scss";
import { DraggableItemData, SafeArea, TextItemData } from "../../dragging";

const initialItems: (DraggableItemData | TextItemData)[] = [
  {
    id: Math.random().toString(),
    position: { x: 10, y: 10 },
    contents: "item 1",
  },
  {
    id: Math.random().toString(),
    position: { x: 100, y: 170 },
    contents: "item 2",
  },
  {
    id: "safe-area2-2",
    position: { x: 200, y: 170 },
    size: { width: 100, height: 100 },
    contents: [
      {
        id: Math.random().toString(),
        position: { x: 20, y: 25 },
        contents: "item 4",
      },
    ],
  },
  {
    id: "safe-area2-3",
    position: { x: 300, y: 170 },
    size: { width: 300, height: 200 },
    contents: [
      {
        id: Math.random().toString(),
        position: { x: 20, y: 25 },
        contents: "item 4",
      },
      {
        id: "safe-area2-4",
        position: { x: 150, y: 50 },
        size: { width: 100, height: 100 },
        contents: [
          {
            id: Math.random().toString(),
            position: { x: 20, y: 25 },
            contents: "item 4",
          },
        ],
      },
    ],
  },
];

export function HomeView() {
  const [items] = useState<(DraggableItemData | TextItemData)[]>(initialItems);

  return (
    <div className={styles.homeView}>
      <SafeArea
        data={{
          id: "root",
          contents: items,
          position: { x: 0, y: 0 },
          size: { height: 500, width: 700 },
        }}
      />
    </div>
  );
}
