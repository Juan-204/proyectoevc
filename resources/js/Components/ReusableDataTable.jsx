import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function ReusableDataTable ({ rows, columns, getRowId}) {
    return (
        <Box
        sx={{
            height: 400, width: '100%'
        }}>
            <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
                pagination: {
                    paginationModel: {pageSize: 5, page: 0}
                }
            }}
            pageSizeOptions={[5, 10, 20]}
            getRowId={getRowId}
            rowSelection
            sx={{
                boxShadow: 2,
                border: 2,
                borderColor: 'lightgrey',
                '& .MuiDataGrid-cell:hover' : {
                    color: 'primary.main'
                },
            }}
            />
        </Box>
    )
}

export default ReusableDataTable;
