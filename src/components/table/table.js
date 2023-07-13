import './table.css'
import React, { useCallback, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import {
    Box,
    Button,
    IconButton,
    MenuItem,
    Tooltip,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { data, colors } from './makeData';
import {CreateNewBusModal} from "../create-modal-window/create-modal-window";

const BusInfo = () => {
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [tableData, setTableData] = useState(() => data);
    const [validationErrors, setValidationErrors] = useState({});

    const handleCreateNewRow = (values, setValues) => {
        if (!Object.keys(validationErrors).length) {
            console.log(values)
            //send/receive api updates here, then refetch or update local table data for re-render
            tableData.push(values);
            setTableData([...tableData]);
            setValues(() =>
                columns.reduce((acc, column) => {
                    acc[column.accessorKey ?? ''] = '';
                    return acc;
                }, {}),)
        }
    };

    const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
        if (!Object.keys(validationErrors).length) {
            tableData[row.index] = values;
            //send/receive api updates here, then refetch or update local table data for re-render
            setTableData([...tableData]);
            exitEditingMode(); //required to exit editing mode and close modal
        }
    };

    const handleCancelRowEdits = () => {
        setValidationErrors({});
    };

    const handleDeleteRow = useCallback(
        (row) => {
            if (
                // eslint-disable-next-line no-restricted-globals
                !confirm(`Are you sure you want to delete ${row.getValue('number')}`)
            ) {
                return;
            }
            //send api delete request here, then refetch or update local table data for re-render
            tableData.splice(row.index, 1);
            setTableData([...tableData]);
        },
        [tableData],
    );

    function getErrorText(column) {
        // eslint-disable-next-line default-case
        switch (column) {
            case 'peopleAmount':
                return `Value between 4 and 72 is required`
            case 'maintenanceDate':
                return `Date cannot be before 2010 or more than current date`
            case 'trip':
                return `Value between 1 and 200 is required`
        }
    }

    function validationSchema(id, value) {
        return id === 'peopleAmount'
            ? validatePeopleAmount(value)
            : id === 'maintenanceDate'? validateMaintananceDate(value)
                :id === 'trip'? validateTrip(value)
                    :validateRequired(value);
    }

    const getCommonEditTextFieldProps = useCallback(
        (cell) => {
            return {
                error: !!validationErrors[cell.id],
                helperText: validationErrors[cell.id],
                onBlur: (event) => {
                    const isValid = validationSchema(cell.column.id, event.target.value)

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

    const columns = useMemo(
        () => [
            {
                accessorKey: 'regNumber',
                header: 'Registration number',
                enableColumnOrdering: false,
                size: 80,
                type: 'string',
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                    type: 'string',
                }),
            },
            {
                accessorKey: 'color',
                header: 'Color',
                type: 'select',
                muiTableBodyCellEditTextFieldProps: {
                    select: true,
                    children: colors.map((color) => (
                        <MenuItem key={color} value={color}>
                            {color}
                        </MenuItem>
                    )),
                },
            },
            {
                accessorKey: 'peopleAmount',
                header: 'Amount of passengers',
                size: 140,
                type: 'number',
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                    type: 'number',
                }),

            },
            {
                accessorKey: 'maintenanceDate',
                header: 'Date of maintenance',
                type: 'date',
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                    type: 'date',
                }),
            },
            {
                accessorKey: 'trip',
                header: 'Bus trip',
                size: 80,
                type: 'string',
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                    type: 'string',
                }),
            },
        ],
            [getCommonEditTextFieldProps],

    );

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
                columns={columns}
                data={tableData}
                editingMode="modal" //default
                enableColumnOrdering
                enableEditing
                enablePagination={false}
                onEditingRowSave={handleSaveRowEdits}
                onEditingRowCancel={handleCancelRowEdits}
                renderRowActions={({ row, table }) => (
                    <Box className="actions">
                        <Tooltip arrow placement="left" title="Edit">
                            <IconButton onClick={() => table.setEditingRow(row)}>
                                <Edit />
                            </IconButton>
                        </Tooltip>
                        <Tooltip arrow placement="right" title="Delete">
                            <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                                <Delete />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )}
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
};



const validateRequired = (value) => !!value.length;
const validatePeopleAmount = (amount: number) => amount >= 4 && amount <= 72;
const validateMaintananceDate = (maintenanceDate: string) => {
    return new Date(maintenanceDate).getTime() >= new Date('01/01/2010').getTime() &&
        new Date(maintenanceDate).getTime() <= new Date().getTime();
}
const validateTrip = (trip: string) => trip.length>=1 && trip.length<=200;

export default BusInfo;