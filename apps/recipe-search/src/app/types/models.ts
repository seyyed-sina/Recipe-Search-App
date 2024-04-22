export interface Hits {
	count: number;
	from: number;
	to: number;
	hits: Hit[];
	_links?: {
		self?: {
			href: string;
			title: string;
		};
		next?: {
			href: string;
			title: string;
		};
	};
}

export interface Hit {
	recipe: Recipe;
}

export interface Recipe {
	label: string;
	calories: number;
	cautions: string[];
	cuisineType: string[];
	dietLabels: string[];
	dishType: string[];
	healthLabels: string[];
	image: string;
	ingredientLines: string[];
	mealType: string[];
	source: string;
	totalWeight: number;
	uri: string;
	url: string;
	yield: number;
}

export interface Option {
	title: string;
	name: string;
	groupBy: string;
	groupTitle: string;
}

export interface ScrollOptions {
	behavior?: 'auto' | 'smooth';
	block?: 'start' | 'center' | 'end' | 'nearest';
	inline?: 'start' | 'center' | 'end' | 'nearest';
	offset?: number;
	hash?: boolean;
}
