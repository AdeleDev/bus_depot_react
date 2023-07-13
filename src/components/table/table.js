import React, {useCallback, useEffect, useState} from 'react';
import {MaterialReactTable} from 'material-react-table';
import {Box, Button, IconButton, Tooltip,} from '@mui/material';
import {Delete, Edit} from '@mui/icons-material';
import {CreateNewBusModal} from "../create-modal-window";
import fieldValidation from "../../utils/field-validation";
import getErrorText from '../../utils/get-validation-error-text'
import axios from "axios";
import getServerErrorTextDescription from "../../utils/get-server-error-description";
import {getColumns} from "./columns";
import driversJsonToString from "../../utils/drivers-json-to-string"
import stringToDriversJson from "../../utils/string-to-drivers-json";

const BusInfo = () => {
        const [createModalOpen, setCreateModalOpen] = useState(false);
        const [tableData, setTableData] = useState({});
        const [validationErrors, setValidationErrors] = useState({});

        const URL = 'http://localhost:8080/v1/buses/'

        useEffect(() => {
            refreshBusList();
        }, [])

        function refreshBusList() {
            axios.get(URL).then(function (response) {
                for (const row of response.data) {
                    row['driversInfo'] = driversJsonToString(row['driversInfo'])
                }
                console.log(response.data);
                setTableData(response.data)
            }).catch(function (error) {
                console.log(error);
            });
        }

        function addBusToList(values) {
            values['driversInfo'] = stringToDriversJson(values['driversInfo'])
            return axios.post(URL, JSON.stringify(values), {headers: {"Content-Type": "application/json"}}
            ).then(function (response) {
                console.log(response.data);
                return true
            }).catch(function (error) {
                setValidationErrors({
                    ...validationErrors,
                    'server': getServerErrorTextDescription(error.response.status)
                })
                return false
            });
        }

        async function updateBusInList(id, values) {
            values['id'] = id;
            values['driversInfo'] = stringToDriversJson(values['driversInfo'])
            return axios.put(URL, JSON.stringify(values), {headers: {"Content-Type": "application/json"}}
            ).then(function (response) {
                console.log(response.data);
                return true
            }).catch(function (error) {
                setValidationErrors({
                    ...validationErrors,
                    'server': getServerErrorTextDescription(error.response.status)
                })
                return false
            });
        }

        async function deleteBusFromList(id) {
            return axios.delete(URL + id).then(function (response) {
                console.log(response.data);
                return true
            }).catch(function (error) {
                setValidationErrors({
                    ...validationErrors,
                    'server': getServerErrorTextDescription(error.response.status)
                })
                return false
            });
        }

        const handleCreateNewRow = async (values, setValues) => {
            clearServerError()
            if (!Object.keys(validationErrors).length) {
                if (await addBusToList(values)) {
                    clearServerError()
                    refreshBusList()
                    setValues(() =>
                        columns.reduce((acc, column) => {
                            acc[column.accessorKey ?? ''] = '';
                            return acc;
                        }, {}),)
                }
            }
        };

        function clearServerError() {
            delete validationErrors['server']
            setValidationErrors({
                ...validationErrors
            })
        }

        const handleSaveRowEdits = async ({exitEditingMode, row, values}) => {
            clearServerError()
            if (!Object.keys(validationErrors).length) {
                if (await updateBusInList(row.original.id, values)) {
                    clearServerError()
                    refreshBusList()
                    exitEditingMode(); //required to exit editing mode and close modal
                }
            }
        };

        const handleCancelRowEdits = () => {
            setValidationErrors({});
        };

        const handleDeleteRow = useCallback(
            async (row) => {
                if (
                    // eslint-disable-next-line no-restricted-globals
                    !confirm(`Are you sure you want to delete ${row.getValue('number')}`)
                ) {
                    return;
                }
                if (await deleteBusFromList(row.original.id)) {
                    clearServerError()
                    refreshBusList()
                }
            },
            [tableData],
        );

        const getCommonEditTextFieldProps = useCallback(
            (cell) => {
                return {
                    error: !!validationErrors[cell.id],
                    helperText: validationErrors[cell.id],
                    onBlur: (event) => {
                        const isValid = fieldValidation(cell.column.id, event.target.value)

                        if (!isValid) {
                            setValidationErrors({
                                ...validationErrors,
                                [cell.id]: getErrorText(cell.column.id),
                            });
                        } else {
                            delete validationErrors[cell.id];
                            setValidationErrors({
                                ...validationErrors,
                            });
                        }
                    },
                };
            },
            [validationErrors],
        );

        const columns = getColumns(getCommonEditTextFieldProps);

        return (
            <>
                <MaterialReactTable
                    displayColumnDefOptions={{
                        'mrt-row-actions': {
                            muiTableHeadCellProps: {
                                align: 'left',
                            },
                            size: 30,
                        },
                    }}
                    columns={getColumns(getCommonEditTextFieldProps)}
                    data={tableData}
                    editingMode="modal" //default
                    enableColumnOrdering
                    enableEditing
                    enablePagination={false}
                    onEditingRowSave={handleSaveRowEdits}
                    onEditingRowCancel={handleCancelRowEdits}
                    renderRowActions={({row, table}) => (
                        <Box sx={{display: 'flex', gap: '1rem'}}>
                            <Tooltip arrow placement="left" title="Edit">
                                <IconButton onClick={() => table.setEditingRow(row)}>
                                    <Edit/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip arrow placement="right" title="Delete">
                                <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                                    <Delete/>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    )}
                    state={{
                        showAlertBanner: !!validationErrors['server']
                    }}
                    muiToolbarAlertBannerProps={
                        !!validationErrors['server']
                            ? {
                                color: 'error',
                                children: validationErrors['server'],
                            }
                            : undefined
                    }
                    renderTopToolbarCustomActions={() => (
                        <Button
                            style={{
                                backgroundColor: "#12445e",
                                padding: "12px 26px",
                            }}
                            onClick={() => setCreateModalOpen(true)}
                            variant="contained"
                        >
                            Create New Bus
                        </Button>
                    )}
                />
                <CreateNewBusModal
                    columns={columns}
                    open={createModalOpen}
                    onClose={() => setCreateModalOpen(false)}
                    onSubmit={handleCreateNewRow}
                />
            </>
        );
    }
;
export default BusInfo;