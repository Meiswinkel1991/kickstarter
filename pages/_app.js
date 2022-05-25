import React from 'react';
import "semantic-ui-css/semantic.min.css";
import Layout from "../components/Layout";

const MyApp = ({ Component, pageProps }) => {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
};

export default MyApp;