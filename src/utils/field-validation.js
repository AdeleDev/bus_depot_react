export default function fieldValidation(id, value) {
    const validateRequired = (value) => !!value.length;
    const validatePeopleAmount = (amount: number) => amount >= 4 && amount <= 72;
    const validateMaintananceDate = (maintenanceDate: string) => {
        return new Date(maintenanceDate).getTime() >= new Date('01/01/2010').getTime() &&
            new Date(maintenanceDate).getTime() <= new Date().getTime();
    }
    const validateTrip = (trip: string) => trip.length >= 1 && trip.length <= 200;


    return id === 'peopleAmount'
        ? validatePeopleAmount(value)
        : id === 'maintenanceDate' ? validateMaintananceDate(value)
            : id === 'trip' ? validateTrip(value)
                : id === 'regNumber' || id === 'color' ? validateRequired(value) : true;

}