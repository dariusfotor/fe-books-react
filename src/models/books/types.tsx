export interface Book extends CreateBook {
  id: number;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface CreateBook {
  name: string;
  author: string;
  firstEdition: string;
  originalName: string;
  genres: number;
  description: string;
  startReadDate: string;
  endReadDate: string;
  photo?: string;
  evaluation: number;
  numberOfPages: number | string;
  publishHouse: string;
  userId: number;
  isReading: number;
}

export enum BookStatus {
  NotReading = 0,
  Reading = 1,
  Done = 2,
}
