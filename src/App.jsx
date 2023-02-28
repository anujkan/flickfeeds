import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getApiConfiguration, getGenres } from './store/homeSlice';
import { fetchDataFromApi } from './utils/api';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import PageNotFound from './pages/404/PageNotFound';
import Explore from './pages/explore/Explore';
import SearchResult from './pages/searchResult/SearchResult';
import Details from './pages/details/Details';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

function App() {
	const dispatch = useDispatch();
	const { url } = useSelector((state) => {
		return state.home;
	});
	const fetchApiConfig = () => {
		fetchDataFromApi('/configuration')
			.then((res) => {
				const url = {
					backdrop: res.images.secure_base_url + 'original',
					poster: res.images.secure_base_url + 'original',
					profile: res.images.secure_base_url + 'original',
				};
				dispatch(getApiConfiguration(url));
			})
			.catch((err) => {
				console.log(err);
			});
	};
	useEffect(() => {
		fetchApiConfig();
		genresCall();
	}, []);

	const genresCall = async () => {
		let promises = [];
		let endPoints = ['tv', 'movie'];
		let allGenres = {};

		endPoints.forEach((url) => {
			promises.push(fetchDataFromApi(`/genre/${url}/list`));
		});

		const data = await Promise.all(promises);
		data?.forEach(({ genres }) => {
			genres?.forEach((item) => {
				allGenres[item.id] = item;
			});
		});

		dispatch(getGenres(allGenres));
	};

	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/:mediaType/:id' element={<Details />} />
				<Route path='/search/:query' element={<SearchResult />} />
				<Route path='/explore/:mediaType' element={<Explore />} />
				<Route path='*' element={<PageNotFound />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
