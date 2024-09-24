import { useUserStore } from "~/stores/userStore";

export function useAuth() {
	const userStore = useUserStore();
	const currentLocation = window?.location.origin + "/";

	const login = async () => {
		const res = await $fetch("/api/utils/getAuthLink", {
			method: "POST",
			body: { path: currentLocation },
		});
		window.location.href = res.spotifyAuthUrl;
	};

	const logout = async () => {
		await useFetch("/api/user/logout");
		useRouter()
			.push("/")
			.then(() => {
				useRouter().go(0);
				userStore.$reset();
			});
	};

	return {
		login,
		logout,
	};
}
