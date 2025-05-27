import Header from '@/features/Header';
import { persistor, store } from '@/redux/store';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>
      <title>Moodify</title>
    </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Header />
          <Component {...pageProps} />
          <ToastContainer position="bottom-center" limit={1} closeButton={true} autoClose={1000} pauseOnHover />
        </PersistGate>
      </Provider>
    </>
  );
}
