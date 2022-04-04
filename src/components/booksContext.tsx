import React, { useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { AuthContext } from './auth/authService';
import {
  getBooksApi,
  saveBookApi,
  deleteBookApi,
  updateBookApi,
  getBookByIdApi,
} from '../server/controller';
import { Book, CreateBook } from '../models/books/types';
import { SnackbarContext } from './snackbar-context';

export const BooksContext = React.createContext<{
  books: Book[];
  book: Book | undefined;
  saveBook: (book: CreateBook) => void;
  updateBook: (book: Book) => void;
  deleteBook: (id: number) => Promise<void>;
  getBookById: (id: number) => void;
}>({
  books: [],
  book: undefined,
  saveBook: () => {},
  updateBook: () => {},
  deleteBook: () => Promise.resolve(),
  getBookById: () => {},
});

const BooksContextProvider: React.FC = ({ children }) => {
  const { user } = React.useContext(AuthContext);
  const { handleOpenSnackBar } = React.useContext(SnackbarContext);
  const [books, setBooks] = React.useState<Book[]>([]);
  const [book, setBook] = React.useState<Book | undefined>(undefined);

  const getBooks = async () => {
    if (user) {
      const { data } = await getBooksApi(user.id);
      return data;
    }
    return { data: [] };
  };
  const { data } = useQuery('books', getBooks, {
    onError: (error) => {
      handleOpenSnackBar(`Klaida ${error} , bandykite dar kartą`, 'error');
    },
  });

  useEffect(() => {
    if (data) {
      setBooks(data.data);
    }
  }, [data]);

  const getByIdMutation = useMutation(
    (id: number) => {
      return getBookByIdApi(id);
    },
    {
      onSuccess: (res) => {
        setBook(res.data.data);
      },
      onError: (error) => {
        handleOpenSnackBar(`Klaida ${error} , bandykite dar kartą`, 'error');
      },
    }
  );

  const getBookById = (id: number) => {
    getByIdMutation.mutate(id);
  };

  const saveMutation = useMutation(
    (book: CreateBook) => {
      return saveBookApi(book);
    },
    {
      onSuccess: (res) => {
        saveBookState(res.data.data);
        handleOpenSnackBar(`Sėkmingai išsaugota`, 'success');
      },
      onError: (error) => {
        handleOpenSnackBar(`Klaida ${error} , bandykite dar kartą`, 'error');
      },
    }
  );

  const saveBookState = (book: Book) => {
    const newArr = [{ ...book }, ...books];
    setBooks(newArr);
  };

  const saveBook = (book: CreateBook) => {
    saveMutation.mutate(book);
  };

  const updateMutation = useMutation(
    (book: Book) => {
      return updateBookApi(book);
    },
    {
      onSuccess: (res) => {
        setBook(res.data.data);
        updateBooksState(res.data.data);
        handleOpenSnackBar(`Sėkmingai atnaujinta`, 'success');
      },
      onError: (error) => {
        handleOpenSnackBar(`Klaida ${error} , bandykite dar kartą`, 'error');
      },
    }
  );

  const updateBooksState = (updatedBook: Book) => {
    const newBooksArr = books.map((book) =>
      book.id === updatedBook.id ? { ...book, updatedBook } : book
    );
    setBooks(newBooksArr);
  };

  const updateBook = (book: Book) => {
    updateMutation.mutate(book);
  };

  const deleteMutation = useMutation(
    (id: number) => {
      return deleteBookApi(id);
    },
    {
      onSuccess: (res) => {
        handleOpenSnackBar(`Sėkmingai ištrinta`, 'success');
      },
      onError: (error) => {
        handleOpenSnackBar(`Klaida ${error} , bandykite dar kartą`, 'error');
      },
    }
  );

  const deleteBook = async (id: number) => {
    deleteMutation.mutate(id);
    setBook(undefined);
    const newArr = books.filter((book) => book.id !== id);
    setBooks(newArr);
  };

  const values = {
    books,
    book,
    saveBook,
    updateBook,
    deleteBook,
    getBookById,
  };
  return (
    <BooksContext.Provider value={values}>{children}</BooksContext.Provider>
  );
};

export default BooksContextProvider;
