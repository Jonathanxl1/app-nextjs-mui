export type EntityOptions = "types" | "properties";

export type ViewOptions = "viewFormProperties" | "viewFormType" | null;

export type ObjectEntity = {
  types: ViewOptions;
  properties: ViewOptions;
};
