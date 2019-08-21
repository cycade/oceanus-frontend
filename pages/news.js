import React, { Component } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import fetch from 'isomorphic-fetch';
import LoadingSpinner from '../components/LoadingSpinner';
import NewsCard from '../components/NewsCard';

class NewsPage extends Component {
    constructor() {
        super();
        this.state = {
            news: []
        };
    }

    componentWillMount() {
        fetch("https://psmapi.lcquest.com/api/v1/news/1")
        .then((res) => {
          return res.json();
        }).then((data) => {
          this.setState({news: [...this.state.news, data]});
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
        <div className="container mt-3 px-3">
            <div className="d-flex justify-content-center mt-3 px-3">
                <h2>News about Leadbeater's Possum</h2>
            </div>
        </div>

        <div className='container'>
            <div className='mt-3'>
                {this.state.news.length === 0 ? <LoadingSpinner /> : <NewsCard title={this.state.news[0]['title']} desc={this.state.news[0]['description']} url={this.state.news[0]['url']}/>}
            </div>
        </div>
    </Layout>
</div>
        );
    }
}
export default NewsPage;