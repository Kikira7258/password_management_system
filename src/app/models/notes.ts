export class Notes {
    id: string;
    title: string;
    note: string;
    timeStamp: string;
    constructor(id?: string, title?: string, note?: string, timeStamp?: string) {
        this.id = id!;
        this.title = note!;
        this.note = note!;
        this.timeStamp = timeStamp!;
    }
}