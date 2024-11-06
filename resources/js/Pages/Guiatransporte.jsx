import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Box, FormControl,Button,MenuItem, Select, TextField, Typography, InputLabel, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schemaGuia = Yup.object().shape({
    carne_octavos: Yup.number().required("Este campo es requerido"),
    viseras_blancas: Yup.number().required("Este campo es requerido"),
    viseras_rojas: Yup.number().required("Este campo es requerido"),
    cabezas: Yup.number().required("Este campo es requerido"),
    temperatura_promedio: Yup.string().required("Este campo es requerido"),
    dictamen: Yup.string().required("Este campo es requerido"),
})

const schemaDecomiso = Yup.object().shape({
    producto: Yup.string().required("Este campo es requerido"),
    cantidad: Yup.number().required("Este campo es requerido"),
    motivo: Yup.string().required("Este campo es requerido"),
})

export default function guiatransporte(props) {
    const [establecimientos, setEstablecimientos] = useState([]);
    const [ingresoDetalles, setIngresoDetalles] = useState([]);
    const [selectedEstablecimiento, setSelectedEstablecimiento] = useState('');
    const [selectedAnimal, setselectedAnimal] = useState('');
    const [showAnimalForm ,setShowAnimalForm] = useState(false);
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

    const {register: regDecomisos , handleSubmit: submitDecomiso, reset: resetDecomiso, formState: {errors: errorsDecomiso}} = useForm({
        resolver: yupResolver(schemaDecomiso),
        defaultValues: {
            id_animal: '',
            producto: '',
            cantidad: '',
            motivo: '',
        }
    })

    const dictamenSeleccionado = watch('dictamen');

    useEffect(() => {
        axios.get('/api/establecimientos')
                .then(response => setEstablecimientos(response.data))
                .catch(error => console.error('Error al cargar establecimiento', error))
    }, [])

    const cargarIngresoDetalles = (idEstablecimiento) => {
        axios.get(`/api/ingreso-detalles?establecimiento=${idEstablecimiento}`)
        .then(response => {
                    console.log('Ingreso Detalles:', response.data)
                    setIngresoDetalles(response.data)
                })
                .catch(error => console.log('Error al cargar ingreso detalles', error))
    }

    const handleEstablecimientoChange = (e) => {
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
    const handleAnimalChange = (e) => {
        const animalSele = ingresoDetalles.find(animal => animal.id === parseInt(e.target.value))

        if (!animalSele) {
            console.error('No se encontro el animal seleccionado')
            setselectedAnimal('');
            setShowAnimalForm(false)
            return;
        }

        console.log('Animal selecionado', animalSele)
        console.log('Id del animal seleccionado', animalSele.animal.id)

        setselectedAnimal(animalSele)
        console.log('ID Ingreso Detalle:', animalSele ? animalSele.id : 'No seleccionado')
        console.log('Id del animal seleccionado', animalSele.animal.id)
        setShowAnimalForm(true)//mostrar el formulario al seleccionar un animal
    }

    const onSubmitGuia = async (data) => {

        data.id_ingreso_detalle = selectedAnimal.id;

        try{
            const response = await axios.post('/api/guia-transporte', data)
            console.log('Respuesta del servidor', response.data)
            Swal.fire({
                title: 'Guia de transporte creada con exito',
                position: 'center',
                icon: 'success',
                showConfirmButton: 'false',
                timer: 1500
            })
            setShowAnimalForm(false)
            setselectedAnimal('')
            resetGuia();
            resetDecomiso();
            setSelectedEstablecimiento('');
            setIngresoDetalles([]);
        } catch (error) {
            console.log('Error al enviar del servidor', error.response?.data || error.message)
            Swal.fire({
                title: 'Error al crear la Guia de Transporte',
                position: 'center',
                icon: 'error',
                showCloseButton: 'false',
                timer: 1500
            })
            resetGuia()
            setSelectedEstablecimiento('');
            setIngresoDetalles([]);
        }
    }

    const onSubmitDecomisos = async (data) => {

        data.id_animal = selectedAnimal.animal.id
        console.log('Datos enviados: ', data)
        try{
            const response = await axios.post('/api/guardar-decomiso', data)
            console.log('Respuesta del servidor', response.data)
            toast.success("Decomiso registrado con exito")
            resetDecomiso();

        } catch (error) {
            console.log('Error al guardar el decomiso', error.response?.data || error.message)
            toast.error("Error al registrar el decomiso")
            resetDecomiso();
        }
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Guia De Transporte</h2>}
        >
            <ToastContainer position="top-right" autoClose={1500} pauseOnHover={false} />
            <Head title="Guia de Transporte"/>
            <div className="py-12">
                <div className="mx-auto sm:px-9 lg:px-8">
                    <div className="bg-white overflow-hidden h-52 shadow-sm sm:rounded-lg flex flex-col items-center">

                        <Typography variant="h4" sx={{marginTop: '20px', marginBottom: '0px'}} component="h1" gutterBottom>
                            Guia Transporte
                            </Typography>
                        <Box
                        class="p-5 flex flex-row space-x-9 h-auto w-full items-start "
                        sx={{maxWidth: 600, mx: 'auto', mt: 4}}>

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

                            {dictamenSeleccionado === 'AC' && (
                            <div className="m-4 bg-white overflow-hidden h-52 shadow-sm sm:rounded-lg flex flex-col items-center">
                                <Typography variant="h5">Decomisos</Typography>
                                <Box
                                class="p-5 flex flex-row space-x-9 h-auto w-full items-start "
                                component="form"
                                onSubmit={submitDecomiso(onSubmitDecomisos)}
                                sx={{maxWidth: 1000, mx: 'auto', mt: 4}}>

                                    <FormControl fullWidth margin="normal">
                                        <TextField
                                        variant="filled"
                                        label="Producto"
                                        {...regDecomisos('producto')}
                                        error={!!errorsDecomiso.producto}
                                        />
                                    </FormControl>

                                    <FormControl fullWidth margin="normal">
                                        <TextField
                                        variant="filled"
                                        label="# Animal"
                                        value={selectedAnimal.animal.numero_animal}
                                        disabled/>
                                    </FormControl>

                                    <FormControl fullWidth margin="normal">
                                        <TextField
                                        variant="filled"
                                        label="Cantidad"
                                        {...regDecomisos('cantidad')}
                                        error={!!errorsDecomiso.cantidad}
                                        />
                                    </FormControl>

                                    <FormControl fullWidth margin="normal">
                                        <TextField
                                        variant="filled"
                                        label="Motivo"
                                        {...regDecomisos('motivo')}
                                        error={!!errorsDecomiso.motivo}
                                        />
                                    </FormControl>

                                    <Button type="submit" variant="contained" color="primary" className="shrink-0">
                                        Guardar
                                    </Button>
                                </Box>
                            </div>
                            )}


                </div>
            </div>
        </AuthenticatedLayout>
    );
}
