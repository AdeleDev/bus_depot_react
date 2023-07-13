import React, {useMemo} from "react";
import {colors} from "../../utils/make-data";
import {MenuItem} from "@mui/material";


export function getColumns(getCommonEditTextFieldProps) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMemo(
        () => [
            {
                accessorKey: 'number',
                header: 'Registration number',
                enableColumnOrdering: false,
                size: 80,
                type: 'string',
                muiTableBodyCellEditTextFieldProps: ({cell}) => ({
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
                muiTableBodyCellEditTextFieldProps: ({cell}) => ({
                    ...getCommonEditTextFieldProps(cell),
                    type: 'number',
                }),

            },
            {
                accessorKey: 'maintenanceDate',
                header: 'Date of maintenance',
                type: 'date',
                muiTableBodyCellEditTextFieldProps: ({cell}) => ({
                    ...getCommonEditTextFieldProps(cell),
                    type: 'date',
                }),
            },
            {
                accessorKey: 'trip',
                header: 'Bus trip',
                size: 80,
                type: 'string',
                muiTableBodyCellEditTextFieldProps: ({cell}) => ({
                    ...getCommonEditTextFieldProps(cell),
                    type: 'string',
                }),
            },
            {
                accessorKey: 'driverInfo',
                header: 'Bus drivers',
                size: 80,
                type: 'string',
                muiTableBodyCellEditTextFieldProps: ({cell}) => ({
                    ...getCommonEditTextFieldProps(cell),
                    type: 'string',
                }),
            },
        ],
        [getCommonEditTextFieldProps],
    );
}