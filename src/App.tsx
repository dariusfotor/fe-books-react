import RoutesComp from "./routes";
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RoutesComp>

      </RoutesComp>  
    </QueryClientProvider>
  );
}

export default App;
