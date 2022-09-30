import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ChakraProvider from './components/ChakraProvider'
import DAppProvider from './components/DAppProvider'
import QueryClientProvider from './components/QueryClientProvider'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider>
      <DAppProvider>
        <ChakraProvider>
            <App />
        </ChakraProvider>
      </DAppProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
