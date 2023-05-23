import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Routes } from 'react-router-dom';
import {routes} from './routes/routes'
import ResponsiveAppBar from './privatepages/ResponsiveAppBar';
function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <ResponsiveAppBar />
      
      <QueryClientProvider client={queryClient}>
        <Routes>
          {routes &&
            routes.map((item) => {
              return <Route key={item.path} path={item.path} element={item.element} />;
            })}
        </Routes>
      </QueryClientProvider>
    </>
  );
}
export default App