export default defineEventHandler((event) => {
	setCookie(event, "spa_ac_ak", "", {
		httpOnly: true,
		secure: true,
		path: "/",
		sameSite: "None",
		expires: new Date(0),
	});
	setCookie(event, "spa_ac_rk", "", {
		httpOnly: true,
		secure: true,
		path: "/",
		sameSite: "None",
		expires: new Date(0),
	});
	setCookie(event, "active", "", {
		secure: true,
		path: "/",
		sameSite: "None",
		expires: new Date(0),
	});

	return { success: true, status: 200 };
});
