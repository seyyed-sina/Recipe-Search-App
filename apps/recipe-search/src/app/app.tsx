import { Suspense } from 'react';

import { CssBaseline } from '@mui/material';
import { RouterProvider } from 'react-router-dom';

import { routes } from './util/routes';

export function App() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<CssBaseline />
			<RouterProvider router={routes} />
		</Suspense>
	);
}

export default App;
