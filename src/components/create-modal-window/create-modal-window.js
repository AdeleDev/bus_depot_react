//example of creating a mui dialog modal for creating new rows
import React, {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField} from "@mui/material";
import {useForm} from "react-hook-form";

export const CreateNewAccountModal = ({open, columns, onClose, onSubmit}) => {
    const [values, setValues, peopleAmount] = useState(() =>
        columns.reduce((acc, column) => {
            acc[column.accessorKey ?? ''] = '';
            return acc;
        }, {}),
    );
    // //
    // const validateRequired = (value) => !!value.length;
    // const validatePeopleAmount = (amount: number) => amount >= 4 && amount <= 72;
    // const validateMaintananceDate = (maintenanceDate: string) => {
    //     return new Date(maintenanceDate).getTime() >= new Date('01/01/2010').getTime() &&
    //         new Date(maintenanceDate).getTime() <= new Date().getTime();
    // }
    // const validateTrip = (trip: string) => trip.length>=1 && trip.length<=200;
    // //
    // function validationSchema(id, value) {
    //     return id === 'peopleAmount'
    //         ? validatePeopleAmount(value)
    //         : id === 'maintenanceDate'? validateMaintananceDate(value)
    //             :id === 'trip'? validateTrip(value)
    //                 :validateRequired(value);
    // }
    // //
    // let fillNotValid = true
    // //
    // const handleSubmit = () => {
    //         //put your validation logic here
    //         onSubmit(values);
    //         onClose();
    //     }
    // let peopleValid =false
    // return (
    //     <Dialog open={open}>
    //         <DialogTitle textAlign="center">Create New Account</DialogTitle>
    //         <DialogContent>
    //             <form onSubmit={(e) => e.preventDefault()}>
    //                 <label>Please, fill information to the fields:</label>
    //                 <Stack
    //                     sx={{
    //                         width: '100%',
    //                         minWidth: {xs: '300px', sm: '360px', md: '400px'},
    //                         gap: '1.5rem',
    //                     }}
    //                 >
    // //
    //                     <TextField InputLabelProps={{shrink: true}}
    //                                key="peopleAmount"
    //                                label="Amount of passengers"
    //                                name="peopleAmount"
    //                                type="number"
    //                                onChange={(e) => {
    //                                    peopleValid = validationSchema("peopleAmount", e.target.value)
    //                                    setValues({...values, [e.target.name]: e.target.value})
    //                                }}
    // //
    //                     />
    // //
    //                 </Stack>
    //             </form>
    //         </DialogContent>
    // //
    //         <DialogActions sx={{p: '1.25rem'}}>
    //             <Button onClick={onClose}>Cancel</Button>
    //             <Button color="secondary"  disabled={fillNotValid} onClick={handleSubmit} variant="contained">
    //                 Create New Bus
    //             </Button>
    //         </DialogActions>
    //     </Dialog>
    // );

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: {errors}
    } = useForm();
    const {ref, ...rest} = register(
        "peopleAmount", {required: true, min: 4, max: 72},
        "regNumber", {required: true, min: 1, max: 10})


    function onFormSubmit() {
        reset();
    }

    const handleButtonSubmit = () => {
        console.log(errors)
        //put your validation logic here
        onSubmit(values);
        onClose();
    }

    return (
        <>
            <Dialog open={open}>
                <DialogTitle textAlign="center">Create New Account</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit(onFormSubmit)}>
                    {/*<form onSubmit={(e) => e.preventDefault()}>*/}
                        <label>Please, fill information to the fields:</label>
                        <Stack
                            sx={{
                                width: '100%',
                                minWidth: {xs: '300px', sm: '360px', md: '400px'},
                                gap: '1.5rem',
                            }}
                        >
                            <TextField
                                inputRef={ref}
                                {...rest}
                                id="peopleAmount"
                                label="Amount of passengers"
                                name="peopleAmount"
                                type="number"
                                helperText="Enter value from 4 to 72"
                                // onChange={(e) => {
                                //     setValues({...values, [e.target.name]: e.target.value})
                                // }}
                            />

                            {/*<TextField*/}
                            {/*    inputRef={ref}*/}
                            {/*    {...rest}*/}
                            {/*    id="regNumber"*/}
                            {/*    label="Registration number"*/}
                            {/*    name="regNumber"*/}
                            {/*    type="string"*/}
                            {/*    helperText="Enter value from 1 to 10"*/}
                            {/*    // onChange={(e) => {*/}
                            {/*    //     setValues({...values, [e.target.name]: e.target.value})*/}
                            {/*    // }}*/}
                            {/*/>*/}
                            {errors.peopleAmount && <span>Set amount of passengers from 4 to 72</span>}

                            {/*{columns.map((column) => (*/}

                            {/*    <TextField InputLabelProps={{shrink: true}}*/}
                            {/*        inputRef={ref}*/}
                            {/*        {...rest}*/}
                            {/*        id = {column.accessorKey}*/}
                            {/*        key={column.accessorKey}*/}
                            {/*        label={column.header}*/}
                            {/*        name={column.accessorKey}*/}
                            {/*        type={column.type}*/}
                            {/*        helperText="Enter value from 4 to 72"*/}

                            {/*    />*/}

                            {/*))}*/}

                        </Stack>
                    </form>
                    <DialogActions sx={{p: '1.25rem'}}>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button color="secondary" onClick={handleButtonSubmit} variant="contained">
                            Create New Bus
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    );
};
export default CreateNewAccountModal;
