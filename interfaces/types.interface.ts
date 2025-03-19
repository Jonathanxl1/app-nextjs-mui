export interface TypeElement {
  id: number;
  name: string;
  properties: Array<number>;
  description: string;
  createdAt: Date;
}

type NormalizeProperties<T> = {
  [K in keyof T]: T[K] extends number[] ? string[] : T[K];
};

export type TypeElementNormalizedProperties = NormalizeProperties<TypeElement>;
