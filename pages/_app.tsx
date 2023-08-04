import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import { wrapper } from "../redux/store";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { useEffect } from 'react';

 function App({ Component, pageProps }: AppProps) {
     useEffect(() => {
          const body = document.body;
          body.setAttribute("data-theme", 'light');
        }, []);
  return (
     <UserProvider>
       <Component {...pageProps} />
     </UserProvider>
  )
 
}

export default wrapper.withRedux(App);
