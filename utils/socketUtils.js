import { io } from "../app.js";
export async function getOnlineUsers(guildId) {
    const out = [];
    const sockets = await io.of("/server").in(guildId).fetchSockets();
    sockets.forEach((socket) => {
        if (socket.data.username)
            out.push({ Id: out.length, Username: socket.data.username });
    });
    return out;
}
export async function isOnline(username, guildId) {
    const users = await getOnlineUsers(guildId);
    return users.some((user) => user.Username === username);
}
//# sourceMappingURL=socketUtils.js.map