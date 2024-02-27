export class Notes {
    _id: string;
    title: string;
    note: string;
    timeStamp: string;
    createdAt: Date; 
    updatedAt: Date;
    constructor(_id?: string, title?: string, note?: string, timeStamp?: string, createdAt?: Date, updatedAt?: Date) {
        this._id = _id!;
        this.title = note!;
        this.note = note!;
        this.timeStamp = timeStamp!;
        this.createdAt = createdAt!;
        this.updatedAt = updatedAt!;
    }
}