import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { store } from '@/store/store';
import { queryClient } from '@/config/queryClient';
import { AppRoutes } from '@/routes/AppRoutes';
import { AuthBootstrap } from '@/components/auth/AuthBootstrap';

function App() {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthBootstrap />
          <AppRoutes />
          <Toaster position="top-right" />
        </BrowserRouter>
      </QueryClientProvider>
    </ReduxProvider>
  );
}

export default App;
