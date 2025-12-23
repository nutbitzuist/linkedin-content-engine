import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './styles/globals.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#18181b',
              color: '#fafafa',
              border: '1px solid #27272a',
              borderRadius: '12px',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#18181b',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#18181b',
              },
            },
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
