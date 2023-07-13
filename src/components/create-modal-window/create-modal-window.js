//example of creating a mui dialog modal for creating new rows
import React, {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField} from "@mui/material";

export const CreateNewBusModal = ({open, columns, onClose, onSubmit}) => {
    const [values, setValues] = useState(() =>
        columns.reduce((acc, column) => {
            acc[column.accessorKey ?? ''] = '';
            return acc;
        }, {}),
    );

    const [validationErrors, setValidationErrors] = useState({});

    const validateRequired = (value) => !!value.length;
    const validatePeopleAmount = (amount: number) => amount >= 4 && amount <= 72;
    const validateMaintananceDate = (maintenanceDate: string) => {
        return new Date(maintenanceDate).getTime() >= new Date('01/01/2010').getTime() &&
            new Date(maintenanceDate).getTime() <= new Date().getTime();
    }
    const validateTrip = (trip: string) => trip.length>=1 && trip.length<=200;
    //
    function validationSchema(id, value) {
        return id === 'peopleAmount'
            ? validatePeopleAmount(value)
            : id === 'maintenanceDate'? validateMaintananceDate(value)
                :id === 'trip'? validateTrip(value)
                    : id === 'regNumber' || id === 'color' ? validateRequired(value) : true;
    }

    function getErrorText(column) {
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

    const handleSubmit = () => {
        let validation = true
        let errors = {}
        console.log(values)
        for (const [key, value] of Object.entries(values)) {
            const isValid = validationSchema(key, value)
            console.log(key, value, isValid)
            if (!isValid) {
                errors[key] = getErrorText(key)
            }
            validation &= isValid
        }
        if (validation) {
            onSubmit(values, setValues);
            onClose();
        } else {
            setValidationErrors({
                ...errors
            })
        }
    };

    return (
        <>
            <Dialog open={open}>
                <DialogTitle textAlign="center">Create New Bus</DialogTitle>
                <DialogContent>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <label>Please, fill information to the fields:</label>
                        <Stack
                            sx={{
                                width: '100%',
                                minWidth: {xs: '300px', sm: '360px', md: '400px'},
                                gap: '1.5rem',
                            }}
                        >
                            {columns.map((column) => (
                                <TextField InputLabelProps={{shrink: true}}
                                    key={column.accessorKey}
                                    label={column.header}
                                    name={column.accessorKey}
                                    type={column.type}
                                    select={column.muiTableBodyCellEditTextFieldProps.select}
                                    children={column.muiTableBodyCellEditTextFieldProps.children}
                                    error={!!validationErrors[column.accessorKey]}
                                    helperText={validationErrors[column.accessorKey]}
                                    onChange={(e) => {
                                        setValues({ ...values, [e.target.name]: e.target.value })
                                        const isValid = validationSchema(column.accessorKey, e.target.value)

                                        if (!isValid) {
                                            setValidationErrors({
                                                ...validationErrors,
                                                [column.accessorKey]: getErrorText(column.accessorKey),
                                            });
                                        } else {
                                            delete validationErrors[column.accessorKey];
                                            setValidationErrors({
                                                ...validationErrors,
                                            });
                                        }
                                    }}
                                />
                            ))}

                        </Stack>
                    </form>
                    <DialogActions sx={{p: '1.25rem'}}>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button color="secondary" onClick={handleSubmit} variant="contained">
                            Create New Bus
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    );
};
export default CreateNewBusModal;
