/**
 * This endpoint is used to exchange the authorization code for an access token
 *
 * This is used to get the access token and refresh token
 * and to set the access token and refresh token in the cookies
 */
export default defineEventHandler(async (event) => {
	const { SP_CLIENT_ID, SP_CLIENT_SECRET } = useRuntimeConfig();
	const body = await readBody(event);
	const code = body.code;
	const SP_LIVE_REDIRECT_URI = "https://echo-three-pi.vercel.app/";
	const SP_LOCAL_REDIRECT_URI = "http://localhost:3000/";

	const redirectUri =
		process.env.NODE_ENV === "production"
			? SP_LIVE_REDIRECT_URI
			: process.env.NODE_ENV === "development"
			? SP_LOCAL_REDIRECT_URI
			: "https://echo-three-pi.vercel.app/";

	const authOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization:
				"Basic " + Buffer.from(SP_CLIENT_ID + ":" + SP_CLIENT_SECRET).toString("base64"),
		},
		body: new URLSearchParams({
			grant_type: "authorization_code",
			code: code,
			redirect_uri: redirectUri,
		}).toString(),
	};

	const response = await fetch("https://accounts.spotify.com/api/token", authOptions);
	const data = await response.json();
	if (response.ok) {
		const { access_token, refresh_token, expires_in } = data;
		setCookie(event, "spa_ac_ak", access_token, {
			httpOnly: true,
			secure: true,
			path: "/",
			sameSite: "None",
		});
		setCookie(event, "spa_ac_rk", refresh_token, {
			httpOnly: true,
			secure: true,
			path: "/",
			sameSite: "None",
		});
		
		setCookie(event, "active", "true", {
			secure: true,
			path: "/",
			sameSite: "None",
		});
		const expiryTimestamp = Date.now() + expires_in * 1000;
		setCookie(event, "spa_exp", expiryTimestamp, {
			httpOnly: true,
			secure: true,
			path: "/",
			sameSite: "None",
		});

		return { success: true, status: 200 };
	} else {
		return { success: false, error: data, status: 401 };
	}
});
