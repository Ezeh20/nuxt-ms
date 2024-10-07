
import { useUserStore } from "#imports";
import { storeToRefs } from "#imports";
const userStore = useUserStore();
const { player, token } = storeToRefs(userStore);

export const callTrack = async () => {
    if (!userStore.deviceId) {
        return;
    }

    try {
        const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${userStore.deviceId}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token.value}`,
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "context_uri": "spotify:playlist:1mTHRrUZN3qhRXPObuYSHq",
                "offset": { "position": 0 },
                "position_ms": 0
            })
        });

        if (!response.ok) {
            return;
        }

        setTimeout(async () => {
            const state = await player.value?.getCurrentState();
            if (state) {
                duration.value = state.track_window.current_track.duration_ms;
                currentPosition.value = state.position;
                isPlaying.value = true;
                startProgressUpdate();
            } else {
                //
            }
        }, 1000);

    } catch (error) {
        // console.error('Error playing track:', error);
    }
};
