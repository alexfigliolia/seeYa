export const commafy = str => {
	return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const format = n => {
	const str = n.toString();
	const { length } = str.toString();
	if(length > 6) return `${str.slice(0, -6)}M`;
	if(length > 4) return `${str.slice(0, -3)}K`;
	return n;
}