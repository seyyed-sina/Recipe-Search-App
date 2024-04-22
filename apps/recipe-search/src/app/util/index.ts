import { ScrollOptions } from '../types/models';

/**
 * Concatenates truthy classes into a space-separated string.
 *
 * @param classes - The classes to concatenate.
 * @returns The concatenated classes.
 */
export const clx = (...classes: (string | boolean | undefined)[]): string => {
	return classes.filter(Boolean).join(' ');
};

/**
 * Capitalizes the first letter of a string and returns the modified string.
 *
 * @param str - The string to capitalize.
 * @returns The modified string with the first letter capitalized.
 */
export const capitalizeFirstLetter = (str: string): string => {
	return `${str.charAt(0).toUpperCase()}${str.slice(1).toUpperCase()}`;
};

const defaultOptions: ScrollOptions = {
	behavior: 'smooth',
};

/**
 * Scrolls to the element with the specified ID.
 * @param elementId The ID of the element to scroll to, or undefined to scroll to the top.
 * @param scrollOptions The scroll options.
 */
export const scrollToElement = (
	elementId?: string,
	scrollOptions: ScrollOptions = defaultOptions,
) => {
	let scrollPosition = 0;

	if (elementId) {
		const element = document.getElementById(elementId);

		if (!element) {
			return;
		}

		const offset = scrollOptions.offset || 0;
		scrollPosition =
			element.getBoundingClientRect().top + window.scrollY + offset;

		if (scrollOptions.hash) {
			window.location.hash = elementId;
		}
	}
	window.scrollTo({
		top: scrollPosition,
		behavior: scrollOptions.behavior || 'smooth',
	});
};
