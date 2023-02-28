import { createSlice } from '@reduxjs/toolkit';

const initialData = {
  trendingData: [{
    showTabs: true,
    active: true,
    displayName: "Day",
    fetchUrl: "/trending/all/day"
  }, 
  {
    displayName: "Week",
    fetchUrl: "/trending/all/week"
  }],
  whatsPopularData: [{
    showTabs: true,
    active: true,
    displayName: "Movies",
    fetchUrl: "/movie/popular"
  }, 
  {
    displayName: "TV Shows",
    fetchUrl: "/tv/popular"
  }],
  topRatedData: [{
    showTabs: true,
    active: true,
    displayName: "Movies",
    fetchUrl: "/movie/top_rated"
  }, 
  {
    displayName: "TV Shows",
    fetchUrl: "/tv/top_rated"
  }],
  similarMoviesData: [{
    showTabs: false,
    active: true,
    displayName: "Movies",
    type: 'movies',
    fetchUrl: `/movie/movieId/similar`
  },
  {
    showTabs: false,
    active: true,
    displayName: "TV Shows",
    type: 'tv',
    fetchUrl: `/tv/tvId/similar`
  }],
  recommendationsData: [{
    showTabs: false,
    active: true,
    displayName: "Movies",
    type: 'movies',
    fetchUrl: `/movie/movieId/recommendations`
  },
  {
    showTabs: false,
    active: true,
    displayName: "TV Shows",
    type: 'tv',
    fetchUrl: `/tv/tvId/recommendations`
  }],
}

export const carouselSlice = createSlice({
	name: 'carouselSlice',
	initialState: initialData
});

export default carouselSlice.reducer;
