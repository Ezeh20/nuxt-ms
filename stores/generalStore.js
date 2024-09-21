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
		albums: {
			loading: false,
			error: false,
			data: [],
		},
		shows: {
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
					"episodes?ids=4Yl5wPg5PC359M8KRYV6ov,1iGDDaXTpI6iBZkGiJz7Eb,4NZzcrKRnWOqECqbuMJVWi,4BGlz02WgPr7FjygxSKwyO,2SScO6LwQwlpn8V8Wz3yd2,1qqWQ0l0IhS99OOk2Cd6V1"
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
		async fetchAlbums() {
			this.albums.loading = true;
			this.albums.error = false;
			try {
				const res = await getRequest(
					"albums?ids=2DDaN7Pgx9uDPd8IbWWW9H,0ujHQ5WCLuKJQXOqXpGtpf,4JPguzRps3kuWDD5GS6oXr,6e1McsPwHgiySHVlpZRhFx,7IKkHmEk4It4cRdOYanyvW"
				);
				if (res?.status?.value === "success") {
					this.albums.data = res.data.value.albums;
					this.albums.loading = false;
				} else {
					this.albums.error = true;
					this.albums.loading = false;
				}
			} catch (error) {
				this.albums.error = true;
				this.albums.loading = false;
			}
		},
		
		async fetchShows() {
			this.shows.loading = true;
			this.shows.error = false;
			try {
				const res = await getRequest("shows?ids=122imavATqSE7eCyXIcqZL,2HwZTHRErslTlURQGbqFhk,2TaLkCgpUP9C1YlysQYEWy,0SAv0bEYhFndhLODSzPIfL");
				if (res?.status?.value === "success") {
					this.shows.data = res.data.value.shows;
					this.shows.loading = false;
				} else {
					this.shows.error = true;
					this.shows.loading = false;
				}
			} catch (error) {
				this.shows.error = true;
				this.shows.loading = false;
			}
		},
	},
});

// if (import.meta.hot) {
// 	import.meta.hot.accept(acceptHMRUpdate(useGeneralStore, import.meta.hot));
// }
