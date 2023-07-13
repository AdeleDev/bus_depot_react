export default function getErrorText(column) {
    // eslint-disable-next-line default-case
    switch (column) {
        case 'peopleAmount':
            return `Value between 4 and 72 is required`
        case 'maintenanceDate':
            return `Date cannot be before 2010 or more than current date`
        case 'trip':
            return `Value between 1 and 200 is required`
        case 'regNumber':
            return 'Required value'
        case 'color':
            return 'Required value'
    }
}