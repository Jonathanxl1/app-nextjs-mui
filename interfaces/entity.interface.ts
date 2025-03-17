export type EntityOptions = "types" | "properties";

export type ViewOptions =
  | "viewFormProperties"
  | "viewFormType"
  | "viewConfirmation"
  | null;

export type ObjectEntity = {
  types: ViewOptions;
  properties: ViewOptions;
  confirmation?: ViewOptions;
};
