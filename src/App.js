import React from 'react';
import './App.css';

import { Grid } from '@mui/material';
import youtube from './api/youtube';
import SearchBar from './components/SearchBar';
import VideoDetail from './components/VideoDetail';
import VideoList from './components/VideoList';


class App extends React.Component {

  state = {
    videos: [],
    selectedVideos: null,
  } 

  handlesubmit = async (searchTerm) => {
    const response = await youtube.get('search', {
      params: {
        part: 'snippet',
        maxResults: 5,
        key: 'API_KEY',
        q: searchTerm,
      }
    });
      
    this.setState({ videos: response.data.items, selectedVideos: response.data.items[0] });
  }

  componentDidMount() {
    this.handlesubmit('The Lion King Movie');
  }

  onVideoSelect = (video) => {
    this.setState({ selectedVideos: video });
  }

  render() {
    const { selectedVideos, videos } = this.state;

    return (
      <Grid justifyContent={'center'} container spacing={16}>
        <Grid item xs={12}>
          <Grid container spacing={10}>
            <Grid item xs={12}>
              <SearchBar onFormSubmit={this.handlesubmit} />
            </Grid>
            <Grid item xs={8}>
              <VideoDetail video={selectedVideos} />
            </Grid>
            <Grid item xs={8}>
              <VideoList videos={videos} onVideoSelect={this.onVideoSelect} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default App;
