export default function stringToDriversJson(string) {
    let driversInfo = []
    if (string.length) {
        for (const id of string.split(',')) {
            driversInfo.push({"id": parseInt(id), "href": "/drivers/" + id.trim()})
        }
    }
    return driversInfo;
}