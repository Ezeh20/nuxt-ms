import { useUserStore } from "#imports";
import { storeToRefs } from '#imports';

export default defineNuxtPlugin((nuxtApp) => {
    const userStore = useUserStore();
    const { token } = storeToRefs(userStore);

    if (import.meta.client) {
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;
      document.body.appendChild(script);
  
      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
          name: 'Web Playback SDK',
          getOAuthToken: (cb) => { cb(token.value); },
          volume: 0.5,
        });
  
        // Listeners
        player.addListener('ready', ({ device_id }) => {
            userStore.setPlayer(player)
            userStore.setDeviceId(device_id);
        });
  
        player.addListener('not_ready', ({ device_id }) => {
          // console.log('Device ID has gone offline', device_id);
        });
        player.connect();
      };
    };
  });
  