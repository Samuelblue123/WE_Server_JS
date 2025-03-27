/**
 * Defines the minimum allowed mod version in the format:
 * [major, minor]
 */
const minimumModVersion = [1, 2];
const versionExtractorPattern = new RegExp("^(?<major>\\d?).(?<minor>\\d+)?");
export function checkVersion(versionString) {
    if (!versionString)
        return false;
    const matcher = versionExtractorPattern.exec(versionString);
    if (!matcher) {
        console.log("malformed mod version received", versionString);
        return false;
    }
    const version = [
        parseInt(matcher.groups.major),
        parseInt(matcher.groups.minor),
    ];
    for (let i = 0; i < 2; ++i) {
        if (version[i] != minimumModVersion[i])
            return version[i] > minimumModVersion[i];
    }
    return true;
}
export async function getLatestVersion() {
    const url = "to be added";
    try {
        const response = await fetch(url);
        const res = await response.json();
        return { versionNumber: res[0].version_number, download: res[0].files[0].url };
    }
    catch (error) {
        console.error("get version error:", error);
    }
    return null;
}
//# sourceMappingURL=versionUtils.js.map