import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '../utils/routes';
import Games from '../Pages/Games';
import SingleGame from '../Pages/SingleGame';
import Discover from '../Pages/Discover';
import Browse from '../Pages/Browse';

const AppRoutes = () => (
	<Routes>
		<Route index element={<Games />} />
		<Route path={ROUTES.GAME} element={<SingleGame />} />
		<Route path={ROUTES.DISCOVER} element={<Discover />} />
		<Route path={ROUTES.BROWSE} element={<Browse />} />
	</Routes>
);

export default AppRoutes;
