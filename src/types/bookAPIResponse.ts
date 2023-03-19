import { Book } from "./book";

export type BooksResponse = {
    kind: string;
    totalItems: number;
    items: BookResponseItem[];
}

export type VolumeInfo = Omit<Book, "id" | "imageLink"> & Record<string, any>;

export type BookResponseItem = {
    kind: string;
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: VolumeInfo;
    saleInfo: Record<string, any>;
    accessInfo: Record<string, any>;
    searchInfo: Record<string, any>;
}
