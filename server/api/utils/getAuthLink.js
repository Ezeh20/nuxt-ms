export default defineEventHandler(async (event) => {
	const { SP_CLIENT_ID } = useRuntimeConfig();
	const body = await readBody(event);
	const userRedirectUri = body.path;
	const scope =
		"streaming user-top-read user-read-playback-state user-modify-playback-state user-read-private user-read-email user-library-read user-library-modify playlist-read-private playlist-modify-private playlist-read-collaborative playlist-modify-public user-follow-modify user-follow-read";
	const spotifyAuthUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${SP_CLIENT_ID}&scope=${encodeURIComponent(
		scope
	)}&redirect_uri=${encodeURIComponent(userRedirectUri)}`;

	return {
		spotifyAuthUrl,
	};
});
