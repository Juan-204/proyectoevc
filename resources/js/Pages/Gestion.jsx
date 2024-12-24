import EstablecimientoModal from '@/Components/EstablecimientoModal';
import ReusableTable from '@/Components/ReusableTable'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { ExpandMoreOutlined } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Modal } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'

export default function Gestion(props) {
    const [establecimientos, setEstablecimientos] = useState([])
    const [isModalOpen, setIsModalOPen] = useState(false)
    const [abrir, setAbrir] = useState(false)
    const columns = [
        {field: 'id',headerName: 'ID', width: 150},
        {field: 'marca_diferencial',headerName: 'Marca diferencia', width: 150},
        {field: 'nombre_dueno',headerName:'Nombre Dueño', width: 150},
        {field: 'nombre_establecimiento',headerName:'Nombre Establecimiento', width: 150},
        {field: 'direccion',headerName:'Direccion', width: 150},
        {field: 'cedula',headerName:'Cedula', width: 150},
        {field: 'telefono',headerName:'Telefono', width: 150},
    ]

    useEffect(() => {
        axios.get('/api/establecimientos')
            .then(response => {
                setEstablecimientos(response.data)
                console.log(establecimientos)
            })
            .catch(error => {
                console.error('Error al cargar los datos:', error)
            });
    }, []);

    const handleAbrir = () => setAbrir(true);
    const handleCerrar = () => setAbrir(false);

    const handleSave = () => {
        axios.get('/api/establecimientos')
            .then(response => {
                setEstablecimientos(response.data)
                console.log(establecimientos)
                handleCerrar()
            })
            .catch(error => {
                console.error('Error al cargar los datos:', error)
            });
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Gestion</h2>}
        >
            <Modal open={abrir} onClose={handleCerrar}>
                <Box className="rounded-[5px] flex fixed top-1/2 left-1/2 w-auto h-auto bg-slate-50 -translate-x-1/2 -translate-y-1/2">
                    <EstablecimientoModal
                    isOpen={isModalOpen} onClose={() => setIsModalOPen(false)}
                    onSave={handleSave}
                    />
                </Box>
            </Modal>
            <Head title="Gestion" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <Accordion>
                            <AccordionSummary
                            expandIcon={<ExpandMoreOutlined />}
                            aria-controls='panel1-content'
                            id='panel1-header'
                            >
                                Agregar Nuevos Destinos
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className='h-[400] w-[100%]'>
                                    <DataGrid
                                        rows={establecimientos}
                                        columns={columns}
                                        initialState={{
                                            pagination: {
                                                paginationModel: { pageSize: 5, page: 0}
                                            }
                                        }}
                                        sx={{
                                            boxShadow: 2,
                                            border: 2,
                                            borderColor: 'lightgrey',
                                            '& .MuiDataGrid-cell:hover' : {
                                                color: 'primary.main'
                                            },
                                        }}
                                        getRowId={(row) => row.id}
                                    />
                                </div>
                                <Button
                                    sx={{
                                        marginTop: 2,
                                        '&:hover': {
                                            backgroundColor: '#0069d9',
                                            borderColor: '#0062cc',
                                            boxShadow: 'none',
                                            color: 'white'
                                        },
                                        '&:active': {
                                            boxShadow: 'none',
                                            backgroundColor: '#0062cc',
                                            borderColor: '#005cbf',
                                            color: 'white'
                                        },
                                        '&:focus': {
                                            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
                                        },
                                    }}
                                    onClick={handleAbrir}
                                    >
                                        AGREGAR
                                    </Button>
                            </AccordionDetails>
                        </Accordion>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
