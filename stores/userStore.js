import { defineStore } from "pinia";

const useUserStore = defineStore("user", {
	state: () => ({
		user: null,
		token: null,
		loading: false,
		error: false,
	}),
	actions: {
		async fetchUser() {
			this.loading = true;
			this.error = false;
			try {
				const response = await useFetch("/api/user/user");
				if (response.data.value.status === 200) {
					console.log(response, "loplmvld");
					this.user = response.data.value.body;
					this.token = response.data.value.token;
				} else {
					this.error = true;
				}
			} catch (error) {
				this.error = true;
			} finally {
				this.loading = false;
			}
		},
	},
});

export { useUserStore };
