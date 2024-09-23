import { defineStore } from "pinia";
import { _getAuthRequest_ } from "#imports";

const useUserStore = defineStore("user", {
	state: () => ({
		user: null,
		token: null,
		loading: false,
		error: false,
		player: null,
		deviceId: null,
		topTracks: null,
		loadingTracks: false,
		tracksError: false,
		recTracks: null,
		recLoading: false,
		recError: false,
	}),
	actions: {
		async fetchUser() {
			this.loading = true;
			this.error = false;
			try {
				const response = await useFetch("/api/user/user");
				if (response.data.value.status === 200) {
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
		setPlayer(player) {
			this.player = player;
		},
		setDeviceId(deviceId) {
			this.deviceId = deviceId;
		},
		async setTopTracks() {
			this.loadingTracks = true;
			this.tracksError = false;
			try {
				const response = await _getAuthRequest_(
					`me/top/tracks?time_range=long_term&limit=5`,
					this.token
				);
				this.topTracks = response;
				this.loadingTracks = false;
			} catch (error) {
				this.tracksError = true;
			} finally {
				this.loadingTracks = false;
			}
		},
		async setRecTracks() {
			this.loadingTracks = true;
			this.tracksError = false;
			try {
				await _getAuthRequest_(
					`me/top/tracks?time_range=long_term&limit=5`,
					this.token
				).then(async (data) => {
					const ids = await data?.items.map((item) => [item?.id]).flat();

					const response = await _getAuthRequest_(
						`recommendations?limit=5&seed_tracks=${ids.join(",")}`,
						this.token
					);
					console.log(response?.tracks);
					this.recTracks = response.tracks;
					this.recLoading = false
				});
			} catch (error) {
				this.recError = true;
			} finally {
				this.recLoading = false;
			}
		},
	},
});

export { useUserStore };
