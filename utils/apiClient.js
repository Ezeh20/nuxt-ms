export const getSP_Token = async () => {
	const { data } = await useFetch("/api/accessToken");
	return data.value.token;
};
