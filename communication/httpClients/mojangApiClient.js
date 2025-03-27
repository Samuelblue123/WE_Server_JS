import { HttpClientError } from "../../errors/implementations/httpClientError.js";
/** Caches username to UUID conversions from Mojang api.*/
const usernameUuidMap = {};
/** Caches UUID to username conversions from Mojang api.*/
const uuidUsernameMap = {};
export async function usernameToUuid(username) {
    if (usernameUuidMap[username] && Date.now() - usernameUuidMap[username].timestamp < 1.728e9) {
        return usernameUuidMap[username].uuid;
    }
    const url = `https://api.mojang.com/users/profiles/minecraft/${username}`;
    const apiResponse = await fetch(url);
    if (!apiResponse.body) {
        throw new HttpClientError("empty mojang username to uuid response");
    }
    const responseBody = await apiResponse.json();
    if (responseBody.errorMessage) {
        throw new HttpClientError(responseBody.errorMessage);
    }
    uuidUsernameMap[responseBody.id] = { username: username, timestamp: Date.now() };
    usernameUuidMap[username] = { uuid: responseBody.id, timestamp: Date.now() };
    return responseBody.id;
}
export async function uuidToUsername(uuid) {
    uuid = uuid.replaceAll("-", "");
    if (uuidUsernameMap[uuid] && Date.now() - uuidUsernameMap[uuid].timestamp < 1.728e9) {
        return uuidUsernameMap[uuid].username;
    }
    const url = `https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`;
    const apiResponse = await fetch(url);
    if (!apiResponse.body) {
        throw new HttpClientError("empty mojang uuid to username response");
    }
    const responseBody = await apiResponse.json();
    if (responseBody.errorMessage) {
        throw new HttpClientError(responseBody.errorMessage);
    }
    uuidUsernameMap[uuid] = { username: responseBody.name, timestamp: Date.now() };
    usernameUuidMap[responseBody.name] = { uuid: uuid, timestamp: Date.now() };
    return responseBody.name;
}
//# sourceMappingURL=mojangApiClient.js.map