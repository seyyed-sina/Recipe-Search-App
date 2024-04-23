import { createBrowserRouter } from 'react-router-dom';

import Home from '../pages/Home';

const routeList = [
	{
		path: '/',
		element: <Home />,
	},
];
export const routes = createBrowserRouter(routeList);
