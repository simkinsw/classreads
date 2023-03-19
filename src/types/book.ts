import { VolumeInfo } from "./bookAPIResponse";

export class Book {
    title: string;
    author?: string;
    imageLink?: string;

    constructor(newVolume: VolumeInfo) {
        this.title = newVolume.title;
        this.author = newVolume.authors?.[0];
        this.imageLink = newVolume.imageLinks?.thumbnail;
    }
}