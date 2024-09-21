/**
 * This endpoint is used to refresh the access token
 * 
 * This is used to keep the access token alive for a longer period
 * and to avoid the user from having to log in again
 */

import { getCookie } from "h3";
export default defineEventHandler(async (event) => {
	const { SP_CLIENT_ID, SP_CLIENT_SECRET } = useRuntimeConfig();
	const refreshToken = getCookie(event, "spa_ac_rk");

	if (!refreshToken) {
		return {
			success: false,
			status: 401,
			message: "Unauthorized",
		};
	}
	const authHeader =
		"Basic " + Buffer.from(`${SP_CLIENT_ID}:${SP_CLIENT_SECRET}`).toString("base64");
	const payload = {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization: authHeader,
		},
		body: new URLSearchParams({
			grant_type: "refresh_token",
			refresh_token: refreshToken,
		}).toString(),
	};

	try {
		const response = await fetch("https://accounts.spotify.com/api/token", payload);
		if (!response.ok) {
			return {
				success: false,
				status: 401,
				message: "Unauthorized",
			};
		}
		const { access_token,  expires_in } = await response.json();
		return {
			status: 201,
			message: "success",
			access_token,
			expires_in,
		};
	} catch (error) {
		error;
	}
});
