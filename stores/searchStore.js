import { defineStore } from "pinia";

export const useSearch = defineStore("search", {
	state: () => ({
		query: "",
		results: [],
	}),
	actions: {
		setQuery(query) {
			this.query = query;
		},
		setResults(results) {
			this.results = results;
		},
	},
});
