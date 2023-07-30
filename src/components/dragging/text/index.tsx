import { TextItemData } from "../common";
import styles from "./styles.module.scss";

export type TextProps = {
  data: TextItemData;
};

export function Text({ data }: TextProps) {
  return (
    <p
      className={styles.text}
      style={{
        width: data?.size?.width,
        height: data?.size?.height,
        left: data.position.x,
        top: data.position.y,
      }}
    >
      {data.contents}
    </p>
  );
}
