export default function getServerErrorTextDescription(status) {
    // eslint-disable-next-line default-case
    switch (status) {
        case 405:
            return 'Check registration number is correct and unique. Check all mandatory values are set correct.'
        case 404:
            return `Bus you want to change does not exist in db or value is incorrect. Check id is right.`
    }
}