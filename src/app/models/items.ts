export class Items {
    _id: string;
    username: string;
    password: string;
    website: string;
    timeStamp: string;
    note: string;
    favorite: boolean;

    constructor(_id?: string, username?: string, password?: string, website?: string, timeStamp?: string, note?: string, favorite?: boolean) {
        this._id = _id!;
        this.username = username!;
        this.password = password!;
        this.website = website!;
        this.timeStamp = timeStamp!;
        this.note = note!;
        this.favorite = favorite!;
    }
}