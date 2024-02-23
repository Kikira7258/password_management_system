export class Notes {
    _id: string;
    title: string;
    note: string;
    timeStamp: string;
    constructor(_id?: string, title?: string, note?: string, timeStamp?: string) {
        this._id = _id!;
        this.title = note!;
        this.note = note!;
        this.timeStamp = timeStamp!;
    }
}