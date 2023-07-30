import { Position } from "./position";
import { Size } from "./size";

export type TextItemData = {
  id: string;
  size?: Partial<Size>;
  position: Position;
  contents: string;
};

export namespace TextItemData {
  function isObject(value: any): value is object {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }

  export function is(value: any): value is TextItemData {
    return (
      isObject(value) &&
      "contents" in value &&
      typeof value.contents === "string"
    );
  }
}
