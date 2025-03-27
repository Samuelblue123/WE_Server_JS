import ServerConfigModel from "../models/entities/serverConfigModel.js";
export async function getChannelFromWynnGuild(wynnGuildId) {
    const config = await ServerConfigModel.findOne({ wynnGuildId: wynnGuildId }).exec();
    if (!config)
        return "none";
    return config.listeningChannel;
}
//# sourceMappingURL=serverUtils.js.map