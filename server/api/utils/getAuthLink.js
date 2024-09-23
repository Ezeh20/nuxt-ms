
export default defineEventHandler(async (event) => {
	const { SP_CLIENT_ID, SP_REDIRECT_URI } = useRuntimeConfig();
	const scope =
		"streaming user-top-read user-read-playback-state user-modify-playback-state user-read-private user-read-email user-library-read user-library-modify playlist-read-private playlist-read-collaborative playlist-modify-public user-follow-modify user-follow-read";
	const spotifyAuthUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${SP_CLIENT_ID}&scope=${encodeURIComponent(
		scope
	)}&redirect_uri=${encodeURIComponent(SP_REDIRECT_URI)}`;

	return {
		spotifyAuthUrl,
	};
});
