import { useState, useEffect, useCallback } from 'react';

type UseFetchReturn<T> = {
	data: T | null;
	isLoading: boolean;
	error: Error | null;
	refetch: (url: string) => void;
};

/**
 * Custom React hook to fetch data from an API endpoint
 *
 * @param url URL of the API endpoint
 * @param options Optional RequestInit options to be used when making the request
 * @param enabled Flag to control whether fetching should be enabled
 * @returns An object containing the fetched data, a boolean indicating whether the request is still loading, an Error object if an error occurred, and a refetch function
 */
function useFetch<T>(url: string, enabled = true): UseFetchReturn<T> {
	const [data, setData] = useState<T | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	const refetch = useCallback(async (url: string, options?: RequestInit) => {
		// Reset states before refetching
		setData(null);
		setIsLoading(true);
		setError(null);

		try {
			const abortController = new AbortController();
			const { signal } = abortController;
			const fetchOptions = { ...options, signal };

			const fetchData = async (): Promise<void> => {
				setIsLoading(true);
				try {
					const response = await fetch(url, fetchOptions);
					if (!response.ok) {
						throw new Error(response.statusText);
					}
					const jsonData = (await response.json()) as T;
					setData(jsonData);
				} catch (error) {
					// Only update error state if fetch was not aborted
					if (!signal.aborted) {
						if (error instanceof Error) {
							setError(error);
						}
					}
				} finally {
					setIsLoading(false);
				}
			};

			await fetchData();

			// Cleanup function to abort fetch on component unmount
			return () => abortController.abort();
		} catch (error) {
			console.error('Error refetching data:', error);
		}
	}, []);

	useEffect(() => {
		if (enabled) {
			refetch(url);
		}
	}, [url, enabled, refetch]);

	return { data, isLoading, error, refetch };
}

export default useFetch;
