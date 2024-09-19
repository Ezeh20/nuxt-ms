

export default defineEventHandler(async (event) => {
    const { SP_CLIENT_ID, SP_CLIENT_SECRET } = useRuntimeConfig();
     const scope = 'user-read-private user-read-email user-library-read user-library-modify playlist-read-private playlist-read-collaborative playlist-modify-public user-follow-modify user-follow-read'
})