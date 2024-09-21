export default defineEventHandler(async (event) => {
  const accessT = getCookie(event, "spa_ac_ak")

    if (!accessT) {
      return {
        status: 401,
        body: {
          error: "Unauthorized"
        }
      };
    }

    const response = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessT}`
      }
    });
    
    if (!response.ok) {
      return {
        status: response.status,
        body: {
          error: "Failed to fetch user data from Spotify"
        }
      };
    }

    const data = await response.json();
    return {
      status: 200,
      body: data,
      token: accessT
    };
  });
  