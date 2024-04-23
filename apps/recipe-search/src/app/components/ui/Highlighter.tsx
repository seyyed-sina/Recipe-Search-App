import { FC, Fragment, memo, useMemo } from 'react';

import styled from '@emotion/styled';

interface Props {
	text?: string;
	search?: string;
}

const Mark = styled('mark')(() => ({
	lineHeight: '1',
	backgroundColor: 'transparent',
	color: '#f44336',
	padding: 0,
}));

/**
 * Component to highlight a search term in a given text
 * @param text The text to search and highlight within
 * @param search The search term to highlight. Can have multiple words separated by spaces
 * @returns A span with mark tags wrapping the search term(s) if found
 */
export const Highlighter: FC<Props> = memo(({ text = '', search = '' }) => {
	/**
	 * The brackets around the re variable keeps it in the array when splitting
	 * and does not affect testing
	 * @example 'react'.split(/(ac)/gi) => ['re', 'ac', 't']
	 */
	const re = useMemo(() => {
		const SPECIAL_CHAR_RE = /([.?*+^$[\]\\(){}|-])/g;
		const escapedSearch = search.replace(SPECIAL_CHAR_RE, '\\$1');
		const decoded = decodeURIComponent(escapedSearch);
		return new RegExp(decoded.split(' ').join('|'), 'ig');
	}, [search]);

	const matches = [...text.matchAll(re)];

	return (
		<span>
			{search === ''
				? text
				: text.split(re).map((part, index, arr) => (
						<Fragment key={index}>
							{part}
							{index + 1 !== arr.length && (
								<Mark>{matches[index]}</Mark>
							)}
						</Fragment>
				  ))}
		</span>
	);
});
Highlighter.displayName = 'Highlighter';
