import { Schema, model, Document } from "mongoose";

export interface IPolygon extends Document {
  title: string;
  area: [number, number][];
}

const polygonSchema = new Schema<IPolygon>({
  title: { type: String, required: true },
  area: { type: [[Number, Number]], required: true },
});

export const Polygon = model<IPolygon>("Polygon", polygonSchema);
