import styles from "./styles.module.scss";
import { MouseEvent, useRef } from "react";
import { DraggableItemData, Position, TextItemData } from "../common";
import { Text } from "../text";

export type SafeAreaProps = {
  data: DraggableItemData;
};

export function SafeArea({ data }: SafeAreaProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const isPressingRef = useRef<boolean>(false);
  const pressedElementRef = useRef<HTMLElement>(null);
  const positionPressedInsideElementRef = useRef<Position>(null);

  function onMouseDown(e: MouseEvent) {
    if (!(e.target instanceof HTMLElement)) {
      return;
    }

    if (rootRef.current === e.target) {
      return;
    }

    isPressingRef.current = true;
    pressedElementRef.current = e.target;
    positionPressedInsideElementRef.current = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };
  }

  function onMouseMove(e: MouseEvent) {
    const isPressing = isPressingRef.current;
    const element = pressedElementRef.current;
    const positionPressedInsideElement =
      positionPressedInsideElementRef.current;

    if (!isPressing || !element || !positionPressedInsideElement) {
      return;
    }

    function reduce(
      element: Element,
      direction: "left" | "top",
      acc: number = 0,
    ) {
      const parent = element?.parentElement;

      if (
        !(parent instanceof Element) ||
        !parent.getAttribute("safe-area-id")
      ) {
        return acc;
      }

      if (direction === "left") {
        return reduce(parent, direction, acc + parent.offsetLeft);
      }

      return reduce(parent, direction, acc + parent.offsetTop);
    }

    const rootAbsoluteOffsetLeft = reduce(element, "left");
    const rootAbsoluteOffsetTop = reduce(element, "top");

    const x =
      e.nativeEvent.x - rootAbsoluteOffsetLeft - positionPressedInsideElement.x;
    const y =
      e.nativeEvent.y - rootAbsoluteOffsetTop - positionPressedInsideElement.y;

    element.style.left = x + "px";
    element.style.top = y + "px";
  }

  function clearIsPressing() {
    isPressingRef.current = false;
    pressedElementRef.current = null;
    positionPressedInsideElementRef.current = null;
  }

  return (
    <div
      ref={rootRef}
      className={styles.safeArea}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={clearIsPressing}
      onMouseLeave={clearIsPressing}
      style={{
        width: data.size.width,
        height: data.size.height,
        left: data.position.x,
        top: data.position.y,
      }}
      safe-area-id={data.id}
    >
      {data.contents.map((item) =>
        TextItemData.is(item) ? (
          <Text key={item.id} data={{ ...item, contents: item.contents }} />
        ) : (
          <SafeArea key={item.id} data={{ ...item, contents: item.contents }} />
        ),
      )}
    </div>
  );
}
