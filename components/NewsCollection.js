import react, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, LinearProgress, Button, Chip } from '@material-ui/core';
import NewsCard from './NewsCard.js';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: theme.spacing(10),
  },
  loadingBar: {
    margin: theme.spacing(8),
  },
  tagCollection: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: theme.spacing(3),
  },
  tagButton: {
    margin: theme.spacing(0.5),
  },
  collection: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  }
}));

export default function NewsCollection(props) {
  const classes = useStyles();
  const [tags, setTags] = useState([]);
  const [news, setNews] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');

  function _isNewsReady() {
    return tags.length > 0 && news.length > 0;
  }

  function _onTagSelected(tag) {
    setSelectedTag(tag);
  }

  function _clearTag() {
    setSelectedTag('');
  }

  useEffect(() => {
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
      setTags([...newsTags]);
      setNews(data);
      // console.log(data.length);
    })
  }, [])

  let renderedNews = news.filter((e) => {
    if (selectedTag.length === 0) { return true; }
    return e.tags.indexOf(selectedTag) !== -1;
  });

  return (
    <div>
      <div className={classes.root}>
        <Typography variant='h4' align='center'>News about me</Typography>
      </div>

      { _isNewsReady()
        ? <div>
            <div className={classes.tagCollection}>
            {
              tags.map((e, i) => { return <Chip key={i+1} size="medium" variant='outlined' className={classes.tagButton} label={e} onClick={() => _onTagSelected(e)} /> })
            }
              <Chip size="medium" variant='outlined' className={classes.tagButton} color='primary' label="All" onClick={_clearTag} />
            </div>
            <div className={classes.collection}>
              {renderedNews.map((e, i) => {
                return <NewsCard title={e.title} desc={e.description} link={e.url} key={i+1} num={news.indexOf(e) + 1} />
              })}
            </div>
          </div>
        :
          <div className={classes.loadingBar}>
            <Typography variant='subtitle2' align='center' color='secondary'>Fetching News for you</Typography>
            <LinearProgress color='primary'/>
          </div>
      }
    </div>
  );
}
