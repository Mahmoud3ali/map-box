import { Schema, model, Document } from "mongoose";

export interface IPolygon extends Document {
  title: string;
  area: Array<[number, number]>;
}

const polygonSchema = new Schema<IPolygon>({
  title: { type: String, required: true },
  area: [{ type: [Number] }],
});

export const Polygon = model<IPolygon>("Polygon", polygonSchema);
