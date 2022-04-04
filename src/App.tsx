import RoutesComp from './components/routes';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthContextProvider } from './components/auth/authService';
import BooksContextProvider from './components/booksContext';
import SnackbarProvider from './components/snackbar-context';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <SnackbarProvider>
          <BooksContextProvider>
            <RoutesComp></RoutesComp>
          </BooksContextProvider>
        </SnackbarProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
