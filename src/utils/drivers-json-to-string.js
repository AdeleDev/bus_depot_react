export default function driversJsonToString(driversInfo) {
    let ids = []
    for (const driver of driversInfo) {
        ids.push(driver['id'])
    }
    return ids.join(', ');
}