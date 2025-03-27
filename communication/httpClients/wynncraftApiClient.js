import { usernameToUuid } from "./mojangApiClient.js";
import { insertDashes } from "../../utils/uuidUtils.js";
async function getPlayersGuildAsync(username) {
    const apiUrl = `https://api.wynncraft.com/v3/player/${insertDashes(await usernameToUuid(username))}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.online ?? null;
}
export default async function checkIfPlayerIsInOnlineAsync(username, onlinePlayer) {
    const online = await getPlayersGuildAsync(username);
    return online != null && online.uuid == onlinePlayer;
}
//# sourceMappingURL=wynncraftApiClient.js.map