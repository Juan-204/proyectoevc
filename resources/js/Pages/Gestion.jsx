import ConductoresModal from '@/Components/ConductoresModal';
import EstablecimientoModal from '@/Components/EstablecimientoModal';
import PlantaModal from '@/Components/PlantaModal';
import ReusableDataTable from '@/Components/ReusableDataTable';
import VehiculosModal from '@/Components/VehiculosModal';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { ExpandMoreOutlined } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Modal } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Gestion(props) {
    const [establecimientos, setEstablecimientos] = useState([])
    const [conductores, setConductores] = useState([]);
    const [vehiculos, setVehiculos] = useState([]);
    const [planta, setPlanta] = useState([]);
    const [isModalOpen, setIsModalOPen] = useState(false)
    const [abrir, setAbrir] = useState(false)
    const [abrirCondu, setAbrirCondu] = useState(false)
    const [isModalOpenCondu, setIsModalOPenCondu] = useState(false)
    const [abrirVehi, setAbrirVehi] = useState(false)
    const [isModalOpenVehi, setIsModalOPenVehi] = useState(false)
    const [abrirPlanta, setAbrirPlanta] = useState(false)
    const [isModalOpenPlanta, setIsModalOPenPlanta] = useState(false)
    const columnsEstablecimientos = [
        {field: 'id',headerName: 'ID', width: 150},
        {field: 'marca_diferencial',headerName: 'Marca diferencia', width: 150},
        {field: 'nombre_dueno',headerName:'Nombre Dueño', width: 150},
        {field: 'nombre_establecimiento',headerName:'Nombre Establecimiento', width: 150},
        {field: 'direccion',headerName:'Direccion', width: 150},
        {field: 'cedula',headerName:'Cedula', width: 150},
        {field: 'telefono',headerName:'Telefono', width: 150},
    ]

    const columnsConductores = [
        {field:'id', headerName: 'ID', width: 150},
        {field:'nombre', headerName: 'Nombre', width: 150},
        {field:'telefono', headerName: 'Telefono', width: 150},
        {field:'numero_cedula', headerName: 'Numero de Cedula', width: 150},
    ]

    const columnsVehiculo = [
        {field:'id', headerName: 'ID', width: 150},
        {field:'placa', headerName: 'Placa', width: 150},
        {field:'tipo_refrigeracion', headerName: 'Tipo de Refrigeracion', width: 150},
        {field:'tipo_vehiculo', headerName: 'Tipo de Vehiculo', width: 150},
    ]

    const columnsPlanta = [
        {field:'id', headerName: 'ID', width: 150},
        {field:'nombre', headerName: 'Nombre', width: 150},
        {field:'telefono', headerName: 'Telefono', width: 150},
        {field:'direccion', headerName: 'Direccion', width: 150},
    ]

    useEffect(() => {
        axios.get('/api/establecimientos')
            .then(response => {
                setEstablecimientos(response.data)
            })
            .catch(error => {
                console.error('Error al cargar los datos:', error)
            });

        axios.get('/api/conductor')
            .then(response => {
                setConductores(response.data)
            })
            .catch(error => {
                console.error('Error al cargar los datos:', error)
            });

        axios.get('/api/vehiculos')
            .then(response => {
                setVehiculos(response.data)
            })
            .catch(error => {
                console.error('Error al cargar los datos:', error)
            });

        axios.get('/api/planta')
            .then(response => {
                setPlanta(response.data)
            })
            .catch(error => {
                console.error('Error al cargar los datos:', error)
            });
    }, []);

    const handleAbrir = () => setAbrir(true);
    const handleCerrar = () => setAbrir(false);

    const handleAbrirCondu = () => setAbrirCondu(true);
    const handleCerrarCondu = () => setAbrirCondu(false);

    const handleAbrirVehi = () => setAbrirVehi(true);
    const handleCerrarVehi = () => setAbrirVehi(false);

    const handleAbrirPlanta = () => setAbrirPlanta(true);
    const handleCerrarPlanta = () => setAbrirPlanta(false);

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

    const handleSaveCondu = () => {
        axios.get('/api/conductor')
            .then(response => {
                setConductores(response.data)
                console.log(conductores)
                handleCerrarCondu()
            })
            .catch(error => {
                console.error('Error al cargar los datos:', error)
            });
    }

    const handleSaveVehi = () => {
        axios.get('/api/vehiculos')
            .then(response => {
                setVehiculos(response.data)
                console.log(vehiculos)
                handleCerrarVehi()
            })
            .catch(error => {
                console.error('Error al cargar los datos:', error)
            });
    }

    const handleSavePlanta = () => {
        axios.get('/api/planta')
            .then(response => {
                setPlanta(response.data)
                console.log(planta)
                handleCerrarPlanta()
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
            {/*Modal Destinos*/}
            <Modal open={abrir} onClose={handleCerrar}>
                <Box className="rounded-[5px] flex fixed top-1/2 left-1/2 w-auto h-auto bg-slate-50 -translate-x-1/2 -translate-y-1/2">
                    <EstablecimientoModal
                    isOpen={isModalOpen} onClose={() => setIsModalOPen(false)}
                    onSave={handleSave}
                    />
                </Box>
            </Modal>
            {/*Modal Conductores*/}
            <Modal open={abrirCondu} onClose={handleCerrarCondu}>
                <Box className="rounded-[5px] flex fixed top-1/2 left-1/2 w-auto h-auto bg-slate-50 -translate-x-1/2 -translate-y-1/2">
                    <ConductoresModal
                    isOpen={isModalOpenCondu} onClose={() => setIsModalOPenCondu(false)}
                    onSave={handleSaveCondu}
                    />
                </Box>
            </Modal>
            {/*Modal Vehiculos*/}
            <Modal open={abrirVehi} onClose={handleCerrarVehi}>
                <Box className="rounded-[5px] flex fixed top-1/2 left-1/2 w-auto h-auto bg-slate-50 -translate-x-1/2 -translate-y-1/2">
                    <VehiculosModal
                    isOpen={isModalOpenVehi} onClose={() => setIsModalOPenVehi(false)}
                    onSave={handleSaveVehi}
                    />
                </Box>
            </Modal>
            {/*Modal Planta*/}
            <Modal open={abrirPlanta} onClose={handleCerrarPlanta}>
                <Box className="rounded-[5px] flex fixed top-1/2 left-1/2 w-auto h-auto bg-slate-50 -translate-x-1/2 -translate-y-1/2">
                    <PlantaModal
                    isOpen={isModalOpenPlanta} onClose={() => setIsModalOPenPlanta(false)}
                    onSave={handleSavePlanta}
                    />
                </Box>
            </Modal>
            <Head title="Gestion" />
            <div className="py-12">
                <div className="max-w-7xl flex flex-col gap-3 mx-auto sm:px-6 lg:px-8">
                        <Accordion>
                            <AccordionSummary
                            expandIcon={<ExpandMoreOutlined />}
                            aria-controls='panel1-content'
                            id='panel1-header'
                            >
                                Agregar Nuevos Destinos
                            </AccordionSummary>
                            <AccordionDetails>
                            <ReusableDataTable
                                        columns={columnsEstablecimientos}
                                        rows={establecimientos}
                                        getRowId={(row) => row.id}
                                    />
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
                        <Accordion>
                            <AccordionSummary
                            expandIcon={<ExpandMoreOutlined />}
                            aria-controls='panel2-content'
                            id='panel2-header'
                            >
                                Agregar Nuevos Conductores
                            </AccordionSummary>
                            <AccordionDetails>
                                    <ReusableDataTable
                                        columns={columnsConductores}
                                        rows={conductores}
                                        getRowId={(row) => row.id}
                                    />
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
                                    onClick={handleAbrirCondu}
                                    >
                                        AGREGAR
                                    </Button>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                            expandIcon={<ExpandMoreOutlined />}
                            aria-controls='panel2-content'
                            id='panel2-header'
                            >
                                Agregar Nuevos Vehiculos
                            </AccordionSummary>
                            <AccordionDetails>
                                    <ReusableDataTable
                                        columns={columnsVehiculo}
                                        rows={vehiculos}
                                        getRowId={(row) => row.id}
                                    />
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
                                    onClick={handleAbrirVehi}
                                    >
                                        AGREGAR
                                    </Button>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                            expandIcon={<ExpandMoreOutlined />}
                            aria-controls='panel2-content'
                            id='panel2-header'
                            >
                                Agregar Nueva Planta
                            </AccordionSummary>
                            <AccordionDetails>
                                    <ReusableDataTable
                                        columns={columnsPlanta}
                                        rows={planta}
                                        getRowId={(row) => row.id}
                                    />
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
                                    onClick={handleAbrirPlanta}
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
