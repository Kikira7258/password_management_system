export class Items {
    _id: string;
    name: string;
    username: string;
    password: string;
    website: string;
    timeStamp: string;
    note: any;
    favorite: boolean;
    createdAt: Date; 
    updatedAt: Date;

    constructor(_id?: string, name?: string, username?: string, password?: string, website?: string, timeStamp?: string, note?: string, favorite?: boolean, createdAt?: Date, updatedAt?: Date) {
        this._id = _id!;
        this.name = name!;
        this.username = username!;
        this.password = password!;
        this.website = website!;
        this.timeStamp = timeStamp!;
        this.note = note!;
        this.favorite = favorite!;
        this.createdAt = createdAt!;
        this.updatedAt = updatedAt!;
    }
}