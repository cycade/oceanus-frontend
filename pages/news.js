import React, { Component } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import NewsCollection from '../components/news/NewsCollection';

class NewsPage extends Component {
    constructor() {
        super();
        this.state = {
            news: []
        };
    }

    componentWillMount() {
        fetch("https://psmapi.lcquest.com/api/v1/news")
        .then((res) => {
          return res.json();
        }).then((data) => {
          this.setState({news: data});
        })
      }

    render() {
       return (
<div>
    <Head>
        <title>Oceanus page</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" /> */}
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    </Head>
    <Layout>
        <NewsCollection />
    </Layout>
</div>
        );
    }
}
export default NewsPage;