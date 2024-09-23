export const formatTime = (ms) => {
	const totalSeconds = Math.floor(ms / 1000);
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export const formatDate = (dateString) => {
	const options = { year: "numeric", month: "long", day: "numeric" };
	const date = new Date(dateString);
	return date.toLocaleDateString(undefined, options);
};
