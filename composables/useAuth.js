import { useUserStore } from "~/stores/userStore";
import { ref } from 'vue';

export function useAuth() {
	const userStore = useUserStore();
	const currentLocation = window?.location.origin + "/";
	const loading = ref(false);

	const login = async () => {
		loading.value = true;
		try {
			const res = await $fetch("/api/utils/getAuthLink", {
				method: "POST",
				body: { path: currentLocation },
			});
			window.location.href = res.spotifyAuthUrl;
		} catch (error) {
			console.error("Login error:", error);
		} finally {
			loading.value = false;
		}
	};

	const logout = async () => {
		loading.value = true;
		try {
			await useFetch("/api/user/logout");
			await useRouter().push("/");
			useRouter().go(0);
			userStore.$reset();
		} catch (error) {
			console.error("Logout error:", error);
		} finally {
			loading.value = false;
		}
	};

	return {
		login,
		logout,
		loading,
	};
}
