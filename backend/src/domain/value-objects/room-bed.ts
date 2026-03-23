export type BedType = "SINGLE" | "DOUBLE" | "QUEEN" | "KING";

export interface RoomBed {
  type: BedType;
  quantity: number;
}
