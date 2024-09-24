import { defineStore } from "pinia";

export const useQueryStore = defineStore("queryStore", {
	state: () => ({
		query: "",
	}),
	actions: {
		setQuery(value) {
			this.query = value;
		},
	},
});
