import { UUID } from "crypto";

export interface RescueBases {
    id: UUID;
    title: String,
    latitude: String;
    longitude: String;
    creationDate: Date;
}
