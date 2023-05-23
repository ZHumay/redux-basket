import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query'; // Import QueryClientProvider
import { ReactQueryDevtools } from 'react-query/devtools';
import App from './App';
import store from './store';
import reportWebVitals from './reportWebVitals';

const queryClient = new QueryClient(); // Create a new instance of QueryClient

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}> {/* Wrap your App component with QueryClientProvider */}
          <App />
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
