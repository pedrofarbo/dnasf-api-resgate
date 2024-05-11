import { UUID } from "crypto";

export interface RescuePoints {
    id: UUID;
    latitude: String;
    longitude: String;
    alreadyRescued: Boolean;
    creationDate: Date;
}
