import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Box, FormControl,Button,MenuItem, Select, TextField, Typography, InputLabel, Table, TableHead, TableRow, TableCell, TableBody, Paper, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import {ToastContainer } from "react-toastify";
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DecomisoForm from "@/Forms/DecomisoForm";
import Swal from "sweetalert2";
import Loading from '../Components/LoadingOverlay';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import ReusableDataTable from "@/Components/ReusableDataTable";

const schemaGuia = Yup.object().shape({
    carne_octavos: Yup.number().required("Este campo es requerido"),
    viseras_blancas: Yup.number().required("Este campo es requerido"),
    viseras_rojas: Yup.number().required("Este campo es requerido"),
    cabezas: Yup.number().required("Este campo es requerido"),
    temperatura_promedio: Yup.string().required("Este campo es requerido"),
    dictamen: Yup.string().required("Este campo es requerido"),
})

export default function guiatransporte(props) {
    const [establecimientos, setEstablecimientos] = useState([]);
    const [planta, setPlanta] = useState([]);
    const [vehiculo, setVehiculo] = useState([]);
    const [conductor, setConductor] = useState([]);
    const [vehiculoSelected, setVehiculoSelected] = useState([]);
    const [conductorSelected, setConductorSelected] = useState([]);
    const [plantaSelected, setPlantaSelected] = useState([]);
    const [guiaData , setGuiaData] = useState([]);
    const [decomisoData , setDecomisoData] = useState([]);
    const [tempDataDeco, setTempDataDeco] = useState([]);
    const [ingresoDetalles, setIngresoDetalles] = useState([]);
    const [selectedAnimal, setselectedAnimal] = useState({});
    const [showAnimalForm ,setShowAnimalForm] = useState(false);
    const [selectedEstablecimiento, setSelectedEstablecimiento] = useState('');
    const [loading, setLoading] = useState('');
    const [selectedDate, setSelectedDate] = useState(null)
    const [abrir, setAbrir] = useState(false)
    const [detallesEstablecimiento, setDetallesEstablecimiento] = useState({
        nombre_dueno: '',
        direccion: '',
        telefono: '',
    })
    const {register: regGuia , handleSubmit: submitGuia, watch, reset: resetGuia, formState: {errors}} = useForm({
        resolver: yupResolver(schemaGuia),
        defaultValues: {
            id_ingreso_detalle: '',
            carne_octavos: '',
            viseras_blancas: '',
            viseras_rojas: '',
            cabezas: '',
            temperatura_promedio: '',
            dictamen: '',
        }
    })

    const columnsInfo = [
        {field: "animalInfo", headerName: 'LOTE-PESO-TIQUETE', width: 150},
        {field: "carne_octavos", headerName: 'Carne en Octavos de Canal', width: 150},
        {field: "viseras_blancas", headerName: 'Viseras Blancas', width: 150},
        {field: "viseras_rojas", headerName: 'Viseras Rojas', width: 150},
        {field: "cabezas", headerName: 'Cabezas', width: 150},
        {field: "temperatura_promedio", headerName: 'Temperatura promedio', width: 150},
        {field: "dictamen", headerName: 'Dicatamen', width: 150},
    ]

    const columnsDecomisos = [
        {field: 'numero_animal', headerName: '# Animal', width: 150},
        {field: 'producto', headerName: 'Producto', width: 150},
        {field: 'cantidad', headerName: 'Cantidad', width: 150},
        {field: 'motivo', headerName: 'Motivo', width: 150},
    ]

    const dictamenSeleccionado = watch('dictamen');

    const handleCerrar = () => {
        setAbrir(false)
    }

    const rowInfo = guiaData.map((guia, index) => ({
        id: index,
        ...guia
    }))

    const rowDecomisos = decomisoData.map((decomiso, index) => ({
        id: index,
        ...decomiso
    }))


    //cargar los datos de la planta
    useEffect(() => {
        axios.get('/api/planta')
                .then(response => setPlanta(response.data))
                .catch(error => console.error('Error al cargar establecimiento', error))

        axios.get('/api/establecimientos')
                .then(response => setEstablecimientos(response.data))
                .catch(error => console.error('Error al cargar establecimiento', error))

        axios.get('/api/vehiculos')
                .then(response => setVehiculo(response.data))
                .catch(error => console.error('Error al cargar los vehiculos', error))

        axios.get('/api/conductor')
                .then(response => setConductor(response.data))
                .catch(error => console.error('Error al cargar los conductores', error))
    }, [])

    const HandlePlantaChange = (e) => {
        setPlantaSelected(e.target.value)
    }

    const HandleVehiculoChange = (e) => {
        setVehiculoSelected(e.target.value)
    }

    const HandleConductorChange = (e) => {
        setConductorSelected(e.target.value)
    }


    //cargar los ingresos por cada establecimineto
    const cargarIngresoDetalles = (idEstablecimiento) => {
        axios.get(`/api/ingreso-detalles?establecimiento=${idEstablecimiento}&fecha=${selectedDate}`)
        .then(response => {
                    console.log('Ingreso Detalles:', response.data)
                    setIngresoDetalles(response.data)
                })
                .catch(error => console.log('Error al cargar ingreso detalles', error))
    }

    useEffect(() => {
        // Asegúrate de que `selectedEstablecimiento` tenga un valor antes de ejecutar la función
        if (selectedEstablecimiento) {
            cargarIngresoDetalles(selectedEstablecimiento); // Ejecutas la función con el id del establecimiento
        }
    }, [selectedDate, selectedEstablecimiento]); // El hook depende de ambos valores



    const handleDataChange = async (date) => {
        if(date) {
            const dateString = dayjs(date).format('YYYY-MM-DD')
            console.log('Fecha Seleccionada', dateString)
            setSelectedDate(dateString)
/*
            setLoading(true);
            try{
                const response = await axios.get(`/api/animales-fecha`,{
                    params: {fecha: dateString},
                })

                if (response.data && Array.isArray(response.data)) {
                    setselectedAnimal(response.data)
                } else {
                    setselectedAnimal([])
                }
            } catch (error) {
                console.error("Error al obtener los animales por fecha:", error)
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "No se pudieron cargar los animales",
                    showConfirmButton: false,
                    timer: 1500
                })
            } finally {
                setLoading(false)
            }*/
        }
    }

    const handleEstablecimientoChange = (e) => {

        if(guiaData.length > 0 || decomisoData.length > 0 ) {
            Swal.fire({
                title: '¿Estas seguro?',
                text: 'Cambiar el establecimiento descartara los datos actuales',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Si,cambiar',
                cancelButtonColor: 'No, cancelar'
            }).then((result) => {
                if(result.isConfirmed) {
                    setGuiaData([])
                    setDecomisoData([])
                } else {
                    e.target.value = selectedEstablecimiento
                }
            })
        }

        const idEstablecimiento = e.target.value;

        setSelectedEstablecimiento(idEstablecimiento)
        cargarIngresoDetalles(idEstablecimiento)
        setShowAnimalForm(false)

        const establecimientoSelect = establecimientos.find(est => est.id === parseInt(idEstablecimiento))
        if (establecimientoSelect) {
            setDetallesEstablecimiento({
                nombre_dueno: establecimientoSelect.nombre_dueno,
                direccion: establecimientoSelect.direccion,
                telefono: establecimientoSelect.telefono,
            });
        } else {
            setDetallesEstablecimiento({
                nombre_dueno: '',
                direccion: '',
                telefono: '',
            })
        }
    }

    //funcion para buscar el animal seleccionado en los detalles de el ingreso
    const handleAnimalChange = async (e) => {
        const animalSele = ingresoDetalles.find(animal => animal.id === parseInt(e.target.value))
        if (!animalSele) {
            console.error('No se encontro el animal seleccionado')
            setselectedAnimal('');
            setShowAnimalForm(false)
            return;
        }
        setselectedAnimal(animalSele)
        setShowAnimalForm(true)//mostrar el formulario al seleccionar un animal
    }

    useEffect(() => {
        if(selectedAnimal){
        }
    }, [selectedAnimal])

    useEffect(() => {
        if (dictamenSeleccionado === 'AC') {
            setAbrir(true);
        } else {
            setAbrir(false);
        }
    }, [dictamenSeleccionado]);

    const onSubmitGuia = async (data) => {
        data.id_ingreso_detalle = selectedAnimal.id;
        const animalFormat = `${selectedAnimal.animal.numero_animal}${selectedAnimal.animal.sexo === 'Macho' ? 'M' : 'H'}-${selectedAnimal.animal.peso}K-${selectedAnimal.animal.numero_tiquete}`
        const guiaFormat = {
            ...data,
            animalInfo: animalFormat,
            planta: plantaSelected,
            decomisos: tempDataDeco,
            animalDetails: selectedAnimal
        }
        setGuiaData([...guiaData, guiaFormat]);
        if(tempDataDeco.length > 0) {
            setDecomisoData((prev) => [...prev, ...tempDataDeco])
        }
        setTempDataDeco([])
        handleCerrar();
        resetGuia();
        setShowAnimalForm(false)
        setselectedAnimal('')
    }

    const onSubmitDecomisos = async (data) => {
        data.id_animal = selectedAnimal.animal.id
        const decomiso = {
            numero_animal: selectedAnimal.animal.numero_animal,
            id_animal: selectedAnimal.animal.id,
            producto: data.producto,
            cantidad:data.cantidad,
            motivo: data.motivo,
        }
        console.log(decomiso)
        setTempDataDeco([...tempDataDeco, decomiso])
    }
    const handleGuardarInfoGuia = async () => {
        setLoading(true);

        // Validación inicial: si hay datos sin guardar (tempDataDeco), mostrar alerta y detener la función
        if (tempDataDeco.length > 0) {
            Swal.fire({
                title: '¿Estás seguro?',
                text: 'Tienes datos sin guardar, guárdalos primero.',
                icon: 'warning',
                showCancelButton: false,
                showConfirmButton: false,
                timer: 1500,
            }).then(() => {
                setLoading(false); // Detener carga
            });
            return; // Detener ejecución si hay datos pendientes
        }

        try {
            // Datos a enviar al backend
            const dataToSend = {
                fecha: selectedDate,
                planta: plantaSelected,
                id_vehiculo: vehiculoSelected,
                id_conductores: conductorSelected,
                guia_transporte: guiaData,
            };

            // Envío al backend
            const response = await axios.post('/api/guia-transporte', dataToSend, { responseType: 'blob' });

            // Generar PDF solo si la respuesta es exitosa
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            window.open(url, '_blank');

            // Limpieza de datos locales tras éxito
            setGuiaData([]);
            setDecomisoData([]);


            // Mostrar mensaje de éxito
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Guía de transporte guardada con éxito",
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            // Manejo de errores
            if (error.response) {
                console.error('Errores de validación', error.response.data.errors);

                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "Error de validación",
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                console.error('Error al guardar ingreso', error);

                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Error al guardar el ingreso",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Guia De Transporte</h2>}
        >
            <ToastContainer position="top-right" autoClose={1500} pauseOnHover={false} />
            <Modal open={abrir} onClose={handleCerrar}>
                <Box className="rounded-[5px] flex fixed top-1/2 left-1/2 w-auto h-auto bg-slate-50 -translate-x-1/2 -translate-y-1/2">
                    <DecomisoForm
                    selectedAnimal={selectedAnimal}
                    onSubmitDecomisos={onSubmitDecomisos}
                    handleCerrar={handleCerrar}
                    />
                </Box>
            </Modal>
            <Head title="Guia de Transporte"/>
            <div className="py-12">
                <div className="mx-auto sm:px-9 lg:px-8">
                    <div className="bg-white overflow-hidden h-auto shadow-sm sm:rounded-lg flex flex-col items-center">

                        <Typography variant="h4" sx={{marginTop: '20px', marginBottom: '0px'}} component="h1" gutterBottom>
                            Guia Transporte
                            </Typography>
                        <Box
                        class="p-5 flex flex-row space-x-9 h-auto w-full items-start"
                        sx={{maxWidth: 600, mx: 'auto', mt: 4}}>

                            <FormControl
                            variant='filled'
                            fullWidth
                            margin='normal'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                label="Fecha"
                                value={selectedDate ? dayjs(selectedDate) : null}
                                onChange={handleDataChange}
                                renderInput={(params) => <TextField {...params}/>}
                                format='DD-MM-YYYY'
                                />
                            </LocalizationProvider>
                            </FormControl>

                            <FormControl
                            variant="filled"
                            fullWidth
                            margin='normal'
                            >
                                <InputLabel>Destino</InputLabel>
                                <Select
                                label="Destino"
                                value={selectedEstablecimiento}
                                onChange={handleEstablecimientoChange}
                                required
                                >
                                    <MenuItem value="">
                                        <em>Seleccione un Destino</em>
                                    </MenuItem>
                                {establecimientos.map(establecimiento => (
                                        <MenuItem key = {establecimiento.id} value={establecimiento.id}>
                                            {establecimiento.id}-{establecimiento.marca_diferencial}-{establecimiento.nombre_dueno}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl
                            fullWidth
                            margin="normal">
                                <TextField
                                disabled
                                variant="filled"
                                label="Nombre del Dueño"
                                value={detallesEstablecimiento.nombre_dueno}
                                />
                            </FormControl>

                            <FormControl
                            fullWidth
                            margin="normal">
                                <TextField
                                disabled
                                label="Direccion"
                                variant="filled"
                                value={detallesEstablecimiento.direccion}
                                />
                            </FormControl>

                            <FormControl
                            fullWidth
                            margin="normal">
                                <TextField
                                disabled
                                variant="filled"
                                label="Telefono"
                                value={detallesEstablecimiento.telefono}
                                />
                            </FormControl>
                        </Box>

                        <Box
                        className="p-5 flex flex-row space-x-9 h-auto w-full items-start">
                            <FormControl
                            variant="filled"
                            fullWidth
                            margin='normal'
                            >
                                <InputLabel>Planta</InputLabel>
                                <Select
                                label="Destino"
                                value={plantaSelected}
                                onChange={HandlePlantaChange}
                                required
                                >
                                    <MenuItem value="">
                                        <em>Seleccione un Destino</em>
                                    </MenuItem>
                                {planta.map(item => (
                                        <MenuItem key = {item.id} value={item.id}>
                                            {item.nombre}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl
                            variant="filled"
                            fullWidth
                            margin='normal'
                            >
                                <InputLabel>Vehiculos</InputLabel>
                                <Select
                                label="Destino"
                                value={vehiculoSelected}
                                onChange={HandleVehiculoChange}
                                required
                                >
                                    <MenuItem value="">
                                        <em>Seleccione un Vehiculo</em>
                                    </MenuItem>
                                {vehiculo.map(item => (
                                        <MenuItem key = {item.id} value={item.id}>
                                            {item.placa}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl
                            variant="filled"
                            fullWidth
                            margin='normal'
                            >
                                <InputLabel>Conductores</InputLabel>
                                <Select
                                label="Destino"
                                value={conductorSelected}
                                onChange={HandleConductorChange}
                                required
                                >
                                    <MenuItem value="">
                                        <em>Seleccione un Conductor</em>
                                    </MenuItem>
                                {conductor.map(item => (
                                        <MenuItem key = {item.id} value={item.id}>
                                            {item.nombre}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                            <FormControl
                            variant="filled"
                            fullWidth
                            margin="normal"
                            sx={{maxWidth: 200}}
                            >
                                <InputLabel>Animales Disponibles</InputLabel>
                                <Select
                                label="Animales Disponibles"
                                value={selectedAnimal.id || ""}
                                onChange={handleAnimalChange}
                                >
                                    <MenuItem value="">
                                        <em>Seleccione un Animal</em>
                                    </MenuItem>
                                    {ingresoDetalles.map(detalle => (
                                        <MenuItem key={detalle.id} value={detalle.id}>
                                            {detalle.animal.numero_animal} {detalle.animal.sexo === 'Macho' ? 'M' : 'H'}-{detalle.animal.peso}K-{detalle.animal.numero_tiquete}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {selectedAnimal && showAnimalForm && (
                            <div className="bg-white overflow-hidden h-52 shadow-sm sm:rounded-lg flex flex-col items-center">
                                <Typography variant="h5">Informacio de la guia de Transporte</Typography>
                                <Box
                                class="p-5 flex flex-row space-x-9 h-auto w-full items-start "
                                component="form"
                                onSubmit={submitGuia(onSubmitGuia)}
                                sx={{maxWidth: 1000, mx: 'auto', mt: 4}}>

                                    <FormControl fullWidth margin="normal">
                                        <TextField
                                        variant="filled"
                                        label="Carne en octavos de canal"
                                        type="number"
                                        {...regGuia('carne_octavos')}
                                        error={!!errors.carne_octavos}
                                        />
                                    </FormControl>

                                    <FormControl fullWidth margin="normal">
                                        <TextField
                                        variant="filled"
                                        label="Viseras Blancas"
                                        {...regGuia('viseras_blancas')}
                                        error={!!errors.viseras_blancas}
                                        />
                                    </FormControl>

                                    <FormControl fullWidth margin="normal">
                                        <TextField
                                        variant="filled"
                                        label="Viseras Rojas"
                                        {...regGuia('viseras_rojas')}
                                        error={!!errors.viseras_rojas}
                                        />
                                    </FormControl>

                                    <FormControl fullWidth margin="normal">
                                        <TextField
                                        variant="filled"
                                        label="Cabezas"
                                        {...regGuia('cabezas')}
                                        error={!!errors.cabezas}
                                        />
                                    </FormControl>

                                    <FormControl fullWidth margin="normal">
                                        <TextField
                                        variant="filled"
                                        label="Temp Promedio"
                                        {...regGuia('temperatura_promedio')}
                                        error={!!errors.temperatura_promedio}
                                        />
                                    </FormControl>

                                    <FormControl fullWidth margin="normal">
                                        <InputLabel>Dictamen</InputLabel>
                                        <Select
                                        variant="filled"
                                        {...regGuia('dictamen')}
                                        error={!!errors.dictamen}
                                        >
                                            <MenuItem value="A">A</MenuItem>
                                            <MenuItem value="AC">AC</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <FormControl fullWidth margin="normal">
                                        <TextField
                                        variant="filled"
                                        label="Guia ICA"
                                        value={selectedAnimal.animal.guia_movilizacion}
                                        disabled/>
                                    </FormControl>
                                    <Button type="submit" variant="contained" color="primary" className="shrink-0">
                                        Guardar
                                    </Button>
                                </Box>
                            </div>
                            )}

                            <Box className="flex flex-row gap-x-10 justify-around">
                            {guiaData.length > 0 ? (
                            <Box className="flex flex-col">
                            <Typography sx={{marginTop: '10px'}}>Descripcion del Producto</Typography>
                                <Paper sx={{ marginTop: '10px'}}>
                                    <ReusableDataTable
                                    rows={rowInfo}
                                    columns={columnsInfo}
                                    getRowId={(row) => row.id}
                                    />
                                </Paper>
                            </Box>
                            ) : (
                                <Typography sx={{marginTop: '10px'}}>No hay Descripcion del producto para mostrar</Typography>
                            )}

                        {decomisoData.length > 0 ? (
                            <Box className="flex flex-col">
                            <Typography sx={{marginTop: '10px'}}>Decomisos</Typography>
                                <Paper sx={{ marginTop: '10px'}}>
                                    <ReusableDataTable
                                    rows={rowDecomisos}
                                    columns={columnsDecomisos}
                                    getRowId={(row) => row.id}
                                    />
                                </Paper>
                            </Box>
                        ) : (
                            <Typography sx={{marginTop: '10px'}}>No hay datos de los decomisos para mostrar</Typography>
                        )}
                            </Box>

                        <Button variant="contained" color="primary" onClick={handleGuardarInfoGuia} sx={{mt:2}}>
                            Guardar Guia
                        </Button>
                        <Loading isVisible={loading} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
