import { Projector } from "./projector.model";
import { Seat } from "./seat.model";

export class Theater {
    id?:number;
    location:string;
    capacity:number;
    seats?:Seat[];
    projector?:Projector;

}

