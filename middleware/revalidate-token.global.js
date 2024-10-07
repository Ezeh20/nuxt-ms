/**
 * This middleware is used to refresh the access token if it has expired
 */

import { getCookie, setCookie } from "h3";
export default defineNuxtRouteMiddleware(async (to, from) => {
	if (import.meta.server) {
		const event = useRequestEvent();
		const tokenExpiryTime = getCookie(event, "spa_exp");

		//refresh token 10 minutes before it expires
		const refreshTime = 10 * 60 * 1000;
		if (tokenExpiryTime && Date.now() >= tokenExpiryTime) {
			try {
				const res = await $fetch("/api/utils/refreshToken", {
					headers: {
						cookie: event.node.req.headers.cookie,
					},
				});
				setCookie(event, "spa_ac_ak", res.access_token, {
					httpOnly: true,
					secure: true,
					path: "/",
					sameSite: "Lax",
				});

				const expiryTimestamp = Date.now() + res.expires_in * 1000;
				setCookie(event, "spa_exp", expiryTimestamp, {
					httpOnly: true,
					secure: true,
					path: "/",
					sameSite: "Lax",
				});
			} catch (error) {
				///
			}
		}
	}
});
