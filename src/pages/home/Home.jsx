import React from 'react';
import { useSelector } from 'react-redux';
import CarouselPanel from '../../components/carouselPanel/CarouselPanel';
import HeroBanner from '../../components/heroBanner/HeroBanner';
import './style.scss';

const Home = () => {
	const { trendingData, whatsPopularData, topRatedData } = useSelector( state => state.carouselData);
	return (
		<div className='homePage'>
			<HeroBanner />
			<CarouselPanel title="Trending" data={trendingData} />
			<CarouselPanel title="What's Popular" data={whatsPopularData} />
			<CarouselPanel title="Top Rated" data={topRatedData} />
		</div>
	);
};

export default Home;
