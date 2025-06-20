import Loading from '@/components/Loading';
import Header from '@/features/Header';
import { persistor, store } from '@/redux/store';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Router } from 'next/router';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import "nprogress/nprogress.css";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';
import { websiteTitle } from '@/assets';

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  // 로딩페이지 관리
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  return (
    <>
      <Head>
        <title>{websiteTitle}</title>
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Header />
          {loading ? <Loading /> : <Component {...pageProps} />}
          <ToastContainer position="bottom-center" limit={1} closeButton={true} autoClose={1000} pauseOnHover />
        </PersistGate>
      </Provider>
    </>
  );
}
