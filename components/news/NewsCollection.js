import react, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import NewsCard from './NewsCard.js';
import LoadingSpinner from '../layout/LoadingSpinner.js';

export default class NewsCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      tags: [],
      selectedTag: []
    };
  }

  _onTagSelected(tag) {
    this.setState({selectedTag: [tag]});
  }

  _clearTag() {
    this.setState({selectedTag: []});
  }

  componentWillMount() {
    fetch("https://psmapi.lcquest.com/api/v1/news")
    .then((res) => {
      return res.json();
    }).then((data) => {
      let newsTags = new Set();
      for (let news of data) {
        for (let tag of news['tags']) {
          newsTags.add(tag);
        }
      }
      
      this.setState({news: data, tags: [...newsTags]});
    })
  }

  render() {
    let renderedNews = this.state.news.filter((news) => {
      for (let tag of this.state.selectedTag) {
        if (news['tags'].indexOf(tag) === -1) { return false; }
      }
      return true;
    });

    return (
      <div id='news' className='py-5 container'>
        <div className="container pt-3">
            <div className="d-flex justify-content-center mt-3 pt-3">
                <p className='h2'>News about Leadbeater's Possum</p>
            </div>
        </div>

        

        <div className='container mt-5 pt-3'>
                {
                    this.state.news.length === 0
                    ? <LoadingSpinner />
                    : (
                      <div>
                        <div className='d-flex justify-content-center mb-3'>
                          <p className='h4 pt-2 mr-3'>Filter news by tag:</p>
                          {this.state.tags.map((tag, i) => {
                            if (this.state.selectedTag.indexOf(tag) !== -1) {
                              return <button key={i+1} type="button" className="btn btn-sm btn-dark m-1" onClick={() => this._onTagSelected(tag)}>{tag}</button>
                            } else {
                              return <button key={i+1} type="button" className="btn btn-sm btn-outline-secondary m-1" onClick={() => this._onTagSelected(tag)}>{tag}</button>
                            }
                          })}
                          <button key='0' type="button" className="btn btn-sm btn-outline-primary m-1" onClick={() => this._clearTag()}>All</button>
                        </div>
                        <div className="card-columns">
                          {renderedNews.map((e, i) => {
                              return <NewsCard key={i} title={e['title']} desc={e['description']} url={e['url']} tags={e['tags']} time={e['time']} selectTag={this._onTagSelected.bind(this)}/>
                          })}
                        </div>
                      </div>
                    )
                }
        </div>
      </div>
    );
  }
}