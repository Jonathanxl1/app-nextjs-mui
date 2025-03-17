export type EntityOptions = "types" | "properties";

export type ViewOptions =
  | "viewFormProperties"
  | "viewFormType"
  | "viewConfirmation"
  | "viewFormLogin"
  | null;

export type ObjectEntity = {
  types: ViewOptions;
  properties: ViewOptions;
  confirmation?: ViewOptions;
};
