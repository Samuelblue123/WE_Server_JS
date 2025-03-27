import { io } from "../app.js";
import "../config.js";
import {checkVersion} from "../utils/versionUtils.js";
import userModel from "../models/entities/userModel.js";
const ENCODED_DATA_PATTERN = /([\u{F0000}-\u{FFFFD}]|[\u{100000}-\u{10FFFF}])+/gu;
const wynnMessagePatterns = [
    { pattern: /^§#00bdbfff((󏿼󏿿󏿾)|(󏿼󐀆))§#00bdbfff The (?<worldevent>.+?)+ World Event starts $/, messageType: 1 }
];
const messageIndex = {};
var messageParts = [];
var worldEvent = "";
var worldEventParts = [];
var concatMessage = "";
var tf;
export function registerMessageIndex() {
    const allowedEvents = ["HaywireDefender", "ApproachingRaid", "SkitteringSpiders", "OvertakenFarm", "ArachnidAmbush", "EncroachingBlaze", "DarkDeacons", "EncroachingDestruction", "CorruptedSpring", "NecromanticSite", "RisenReturn", "EncroachingMisery", "TaintedShoreline", "AeonOrigin", "BowelsoftheRoots", "EncroachingReanimation", "ImproperBurialRites", "Blood-EncrustedMastaba", "EncroachingConflagration", "FailedHunt", "CanineAmbush", "BlazingCombustion", "EncroachingAblation", "RogueWyrmling", "SlimySchism", "SwashbucklingBrawl", "DesperateAmbush", "ABurningMemory", "EncroachingExtinction", "PeculiarGrotto", "LightEmissaries", "UnsettlingEncounters", "VisitfromBeyond", "AbandonedSentinels", "RealmicAntigen", "TerritorialTrolls", "ColossiIngrain", "EnragedEagle", "Ruff&Tumble", "DespermechOccupation", "DecommissionedWarMachines", "BubblingTerrace", "InfernalCaldera", "MaarAshpit", "ShatteredRoots", "AhmsMonuments", "IncomprehensibleCynosure", "ShapesintheDark", "AllEyesonMe", "MonumenttoLoss", "PestilentialDownpour", "OtherworldlyExhibition"];
    allowedEvents.forEach(event => {
        messageIndex[event] = 0;
    });
}
const processedMessages = new Set();
console.log(!processedMessages.has(concatMessage));
const errorHandler = (toHandle) => {
    const handleError = (error) => {
        console.error("socket error:", error);
    };
    return (...args) => {
        try {
            const ret = toHandle.apply(this, args);
            if (ret && typeof ret.catch === "function") {
                ret.catch(handleError);
            }
        }
        catch (e) {
            handleError(e);
        }
    };
};
export default function registerSocketHandlers(io) {
    io.use((socket, next) => {
        // Accessing query parameters sent from the client
        const username = socket.handshake.query.username;
        const modVersion = socket.handshake.query.modVersion;
        const uuid = socket.handshake.query.uuid;
        // Set them in the socket data
        socket.data.username = username || undefined;
        socket.data.modVersion = modVersion || "0.0.0";
        socket.data.uuid = uuid;
        socket.data.messageIndex = 0;
        // Proceed with the connection
        next();
    });
    io.on("connection", (socket) => {
        console.log("Socket connected:", socket.id);
        console.log(socket.data.username + " connected to server with version: " + socket.data.modVersion);
        socket.on("error", (err) => {
            console.error("Socket error on", socket.id, ":", err);
        });
        socket.on("wynnMessage", async (message) => {
            if (!checkVersion(socket.data.modVersion)) {
              console.log(`skipping request from outdated mod version: ${socket.data.modVersion}`);
            return;
            }
            messageParts = [];
            concatMessage = "";
            worldEvent = "";
            messageParts = message.split(":");
            worldEvent = messageParts[0];
            worldEventParts = worldEvent.split(" ");
            for (let i = 0; i < worldEventParts.length; i++) {
                concatMessage += worldEventParts[i];
            }
            socket.data.messageIndex = messageIndex[concatMessage];
            console.log("WynnMessage received:", message);
            console.log(message, "emitted by:", socket.data.username, "uuid:", socket.data.uuid);
            tf=!processedMessages.has(concatMessage)
            if (tf) {
                processedMessages.add(concatMessage);
                console.log(processedMessages);
                await notifUsers(message);
            }
        });
        socket.on("sync", () => {
            socket.data.messageIndex = messageIndex[0];
        });
        socket.on("disconnect", (reason) => {
            console.log(`${socket.data.username} disconnected: ${reason}`);
        });
    });
}
export async function notifUsers(message) {
    const allSockets = await io.fetchSockets();
    allSockets.forEach(async (s) => {
        if (await shouldBNotif(s)) {
            console.log("attempting to emit server message")
            s.emit("serverMessage", message);
        }
    });
}
export async function shouldBNotif(socket) {
    const uuids = await getUuids();
    var notific = false;
    uuids.forEach(uuid => {
        if (socket.data.uuid === uuid) {
            notific = true;
        }
    });
    return notific;
}
export async function getUuids() {
    const jsonUsers = await findUsers();
    var uuids = [];
        jsonUsers.forEach(user => {
            uuids.push(user.uuid);
        });
    return uuids;
}
export async function findUsers() {
    const query = userModel.find({ worldevents: concatMessage });
    const users = await query.exec();
    try {
        if (!users) {
            const tester = users;
            console.log(tester);
        }
    }
    catch (error) {
        return;
    }
    return users;
}
setInterval(() => {
    processedMessages.clear();
}, 90 * 1000); // every 90 seconds
//# sourceMappingURL=connection.js.map