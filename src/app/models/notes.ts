import { Items } from "./items";

export class Notes {
    _id: string;
    title: string;
    note: string;
    timeStamp: string;
    createdAt: Date; 
    updatedAt: Date;
    item?: Items; // Add property for item's note

    
    constructor(_id?: string, title?: string, note?: string, timeStamp?: string, createdAt?: Date, updatedAt?: Date, item?: Items) {
        this._id = _id!;
        this.title = title!;
        this.note = note!;
        this.timeStamp = timeStamp!;
        this.createdAt = createdAt!;
        this.updatedAt = updatedAt!;
        this.item = item!; // Assign the item's note
    }
}