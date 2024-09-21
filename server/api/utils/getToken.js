export default defineEventHandler((event)=>{
    const  accessT = getCookie(event, "spa_ac_tk")
    const refreshT = getCookie(event, "spa_ac_rk")
    return { accessT, refreshT }
})