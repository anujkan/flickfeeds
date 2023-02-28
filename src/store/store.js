import { configureStore } from '@reduxjs/toolkit';
import carouselSlice from './carouselSlice';
import homeSlice from './homeSlice';

export const store = configureStore({
	reducer: {
		home: homeSlice,
		carouselData: carouselSlice,
	},
});
