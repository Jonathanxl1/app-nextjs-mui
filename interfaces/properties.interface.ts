export type typePropertyInput = "text" | "number" | "date" | "check";

export interface PropertiesElement {
  id: number;
  name: string;
  type: typePropertyInput;
  createdAt: Date;
}
