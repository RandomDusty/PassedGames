export const getRefactorTitleForURL = title => {
	return title.toLowerCase().replace(/ /g, '-');
};

export const getRefactorUrlForTitle = url => {
	let newTitle = url.toLowerCase().replace(/-/g, ' ');
	newTitle = newTitle.charAt(0).toUpperCase() + newTitle.slice(1);
	return newTitle;
};
