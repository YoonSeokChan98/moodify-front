/* eslint-disable @typescript-eslint/no-explicit-any */
import { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

const Document = () => {
    return (
        <Html lang="en">
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};

// 랜더링시 css를 적용 시킨 후 랜더링 하라는 코드임
Document.getInitialProps = async (ctx: any) => {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App: any) => (props: any) => sheet.collectStyles(<App {...props} />),
            });
        const initialProps = await ctx.defaultGetInitialProps(ctx);
        return {
            ...initialProps,
            styles: (
                <>
                    {initialProps.styles}
                    {sheet.getStyleElement()}
                </>
            ),
        };
    } finally {
        sheet.seal();
    }
};

export default Document;
