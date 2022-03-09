export interface Book {
    id?: number;
    name?: string;
    author?: string;
    firstEdition?: string;
    originalName?: string;
    genres?: number;
    description?: string;
    createdAt?: Date;
    startReadDate?: string;
    endReadDate?: string;
    photo?: string;
    evaluation?: number;
    numberOfPages?: number;
    publishHouse?: string;
}