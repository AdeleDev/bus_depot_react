import React, {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField} from "@mui/material";
import fieldValidation from "../utils/field-validation";
import getErrorText from '../utils/get-validation-error-text'

export const CreateNewBusModal = ({open, columns, onClose, onSubmit}) => {
    const [values, setValues] = useState(() =>
        columns.reduce((acc, column) => {
            acc[column.accessorKey ?? ''] = '';
            return acc;
        }, {}),
    );

    const [validationErrors, setValidationErrors] = useState({});


    const handleSubmit = () => {
        let validation = true
        let errors = {}
        for (const [key, value] of Object.entries(values)) {
            const isValid = fieldValidation(key, value)
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

    const handleCancel = () => {
        let errors = {}
        for (const [key] of Object.entries(values)) {

                errors[key] = getErrorText(key)

        }
        onClose();
        setValues(() =>
            columns.reduce((acc, column) => {
                acc[column.accessorKey ?? ''] = '';
                return acc;
            }, {}),)
        setValidationErrors({
            ...errors
        })


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
                                           setValues({...values, [e.target.name]: e.target.value})
                                           const isValid = fieldValidation(column.accessorKey, e.target.value)

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
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button color="secondary" onClick={handleSubmit} variant="contained">
                        Create New Bus
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    </>
);
}
;
export default CreateNewBusModal;
