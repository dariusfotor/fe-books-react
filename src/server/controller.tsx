import axios from 'axios';
import { Book, CreateBook } from '../models/books/types';

export const getBooksApi = async (id: number) => {
  return axios.get('/books', {
    params: { userId: id },
  });
};

export const getBookByIdApi = async (id: number) => {
  return axios.get(`/books/${id}`);
};

export const saveBookApi = async (book: CreateBook) => {
  return axios.post('/books/createbook', book);
};

export const updateBookApi = async (book: Book) => {
  return axios.patch(`/books/updatebook/${book.id}`, book);
};

export const deleteBookApi = async (id: number) => {
  return axios.delete(`/books/deletebook/${id}`);
};

export const uploadImage = async (file: any) => {
  const imgBody = new FormData();
  imgBody.append('files', file);
  return axios.post(`/books/upload-image`, imgBody, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
