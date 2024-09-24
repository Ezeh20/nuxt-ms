import { defineStore } from "pinia";

export const useUtilStore = defineStore("search", {
	state: () => ({
		rightBarActive: true,
		leftBarActive: true,
	}),
	actions: {
		toggleRightBar() {
			this.rightBarActive = !this.rightBarActive;
		},
		toggleLeftBar() {
			this.leftBarActive = !this.leftBarActive;
		}
	},
});
