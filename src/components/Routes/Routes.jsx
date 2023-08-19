import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import { ROUTES } from '../../utils/routes';
import SingleGame from '../Games/SingleGame';
import Discover from '../Discover/Discover';

const AppRoutes = () => (
	<Routes>
		<Route index element={<Home />} />
		<Route path={ROUTES.GAME} element={<SingleGame />} />
		<Route path={ROUTES.DISCOVER} element={<Discover />} />
	</Routes>
);

export default AppRoutes;
