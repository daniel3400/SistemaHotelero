import { Stay } from "../entities/stay/stay.js";
import { StayStatus } from "../value-objects/statuses.js";

export interface StayRepository {
  create(stay: Stay): Promise<void>;
  update(stay: Stay): Promise<void>;
  getById(id: string): Promise<Stay | null>;
  list(status?: StayStatus): Promise<Stay[]>;
}
