import { defineStore } from "pinia";

const usePlayerStore = defineStore("player", {
	state: () => ({
		trackUri: null,
        playingState: false,
        duration:0
	}),

	actions: {
		setTrack(trackUir) {
            this.trackUri = trackUir;
		},
        setPlayingState(state) {
            this.playingState = state;
        },
        setDuration(duration) {
            this.duration = duration;
        }
	},
});

export { usePlayerStore };
