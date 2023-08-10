import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import { ROUTES } from '../../utils/routes';
import SingleGame from '../Games/SingleGame';

const AppRoutes = () => (
	<Routes>
		<Route index element={<Home />} />
		<Route path={ROUTES.GAME} element={<SingleGame />} />
	</Routes>
);

export default AppRoutes;
