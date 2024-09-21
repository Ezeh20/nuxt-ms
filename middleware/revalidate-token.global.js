/**
 * This middleware is used to refresh the access token if it has expired
 */

import { getCookie } from "h3";
export default defineNuxtRouteMiddleware(async (to, from) => {
	if (import.meta.server) {
		const event = useRequestEvent();
		const tokenExpiryTime = getCookie(event, "spa_exp");

		//refresh token 10 minutes before it expires
		const refreshTime = 10 * 60 * 1000;
		if (tokenExpiryTime && Date.now() >= tokenExpiryTime - refreshTime) {
			try {
				await $fetch("/api/utils/refreshToken", {
					headers: {
						cookie: event.node.req.headers.cookie,
					},
				});
			} catch (error) {
				///
			}
		}
	}
});
