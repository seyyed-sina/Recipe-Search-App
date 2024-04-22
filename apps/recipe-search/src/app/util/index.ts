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
