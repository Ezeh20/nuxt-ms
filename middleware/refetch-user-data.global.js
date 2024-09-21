/**
 * This middleware is used to refetch the user data from the Spotify API
 *
 * This way, when a user reloads the page, the user data is refetched
 * and the user store is updated with the new data
 */

import { useUserStore } from "~/stores/userStore";
export default defineNuxtRouteMiddleware(async (to) => {
	const userStore = useUserStore();
	const code = to.query.code;
	userStore.loading = true;

	if (code) {
		return;
	}

	if (userStore.user) {
		userStore.loading = false;
		return;
	}

	try {
		const response = await $fetch("/api/user/user");
		if (response.status === 200) {
			userStore.user = response.body;
			userStore.token = response.token;
		} else {
			userStore.user = null;
		}
	} catch (error) {
		//
	}
});
