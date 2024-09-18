import { defineStore } from "pinia";
import { getRequest } from "#imports";

export const useGeneralStore = defineStore("general", {
	state: () => ({
		artists: {
			loading: false,
			error: false,
			data: [],
		},
		episodes: {
			loading: false,
			error: false,
			data: [],
		},
	}),

	actions: {
		async fetchArtists() {
			this.artists.loading = true;
			this.artists.error = false;
			try {
				const res = await getRequest(
					"artists?ids=0Y3agQaa6g2r0YmHPOO9rh,5WUlDfRSoLAfcVSX1WnrxN,4ovtyvs7j1jSmwhkBGHqSr,3LOm0AZjpwVQebvkyanjDy,4gzpq5DPGxSnKTe4SA8HAU,6qqNVTkY8uBg9cP3Jd7DAH,3wcj11K77LjEY1PkEazffa,3a1tBryiczPAZpgoZN9Rzg,6YznhKZUZFVr418x7OUi3z,2YZyLoL8N0Wb9xBt1NhZWg,3TVXtAsR1Inumwj472S9r4"
				);
				if (res?.status?.value === "success") {
					this.artists.data = res.data.value.artists;
					this.artists.loading = false;
				} else {
					this.artists.error = true;
					this.artists.loading = false;
				}
			} catch (error) {
				this.artists.error = true;
				this.artists.loading = false;
			}
		},
		async fetchEpisodes() {
			this.episodes.loading = true;
			this.episodes.error = false;
			try {
				const res = await getRequest(
					"episodes?ids=4Yl5wPg5PC359M8KRYV6ov,4NZzcrKRnWOqECqbuMJVWi,4BGlz02WgPr7FjygxSKwyO,2SScO6LwQwlpn8V8Wz3yd2,1qqWQ0l0IhS99OOk2Cd6V1"
				);
				if (res?.status?.value === "success") {
					this.episodes.data = res.data.value.episodes;
					this.episodes.loading = false;
				} else {
					this.episodes.error = true;
					this.episodes.loading = false;
				}
			} catch (error) {
				this.episodes.error = true;
				this.episodes.loading = false;
			}
		},
	},
});

// if (import.meta.hot) {
// 	import.meta.hot.accept(acceptHMRUpdate(useGeneralStore, import.meta.hot));
// }
