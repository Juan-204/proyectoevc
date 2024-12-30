import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Box, TextField, Button, MenuItem, Select, FormControl, InputLabel, Typography, Table, TableHead, TableRow, TableBody, TableCell, IconButton, CircularProgress} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Swal from 'sweetalert2';
import { Delete, Edit } from '@mui/icons-material';
import LoadingOverlay from '@/Components/LoadingOverlay';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import ReusableDataTable from '@/Components/ReusableDataTable';

export default function entradaproducto(props) {
    const [animales, setAnimales] = useState([]); //tabla temporal de animales
    const [establecimientos, setEstablecimientos] = useState([]);
    const [loading, setLoading] = useState('')
    const [selectedDate, setSelectedDate] = useState(null)

    const columns = [
        {field: 'marca_diferencial', headerName: 'Destino', width: 150},
        {field: 'numero_animal', headerName: 'Numero de Animal', width: 150},
        {field: 'peso', headerName: 'Peso', width: 150},
        {field: 'numero_tiquete', headerName: 'Numero de Tiquete', width: 150},
        {field: 'sexo', headerName: 'Sexo', width: 150},
        {field: 'guia_movilizacion', headerName: 'Guia de Movilizacion', width: 150},
        {field: 'especie', headerName: 'Especie', width: 150},
        {field: 'acciones', headerName: 'Acciones', width: 150,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => borrarFila(params.row.id)}>
                        <Delete/>
                    </IconButton>
                    <IconButton onClick={() => editarFila(params.row.id)}>
                        <Edit/>
                    </IconButton>
                </>
            )
        },
    ]

    const rows = animales.map((animal, index) => ({
        id: index,
        ...animal,
    }))

    //obtenemos los establecimientos para visualizarlos mediante un dropdown
    useEffect(() => {
        const fetchEstablecimientos = async () => {
            try {
                const response = await axios.get('/api/establecimientos');
                setEstablecimientos(response.data)
            }catch (error) {
                console.log('error al cargar los establecimientos')
            }
        };

        fetchEstablecimientos();
    }, []);
    //definicion de esquema para manejo de errores
    const schema = yup.object().shape({
        numero_animal: yup.string().required('Numero de animal es obligatorio').nullable(),
        peso: yup.string().required('Peso es obligatorio'),
        numero_tiquete: yup.string().required('Numero de tiquete es obligatorio'),
        sexo: yup.string().required('Sexo es obligatorio'),
        guia_movilizacion: yup.string().required('Guia movilización es obligatoria'),
        especie: yup.string().required('Especie es obligatoria'),
        id_establecimiento: yup.string().required('Destino es obligatorio'),
    })

    const { register, handleSubmit, reset, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })

    const handleDataChange = async (date) => {
        if(date) {
            const dateString = dayjs(date).format('YYYY-MM-DD')
            console.log('Fecha Seleccionada', dateString)
            setSelectedDate(dateString)

            setLoading(true);
            try{
                const response = await axios.get(`/api/animales-fecha`,{
                    params: {fecha: dateString},
                })

                if (response.data && Array.isArray(response.data)) {
                    setAnimales(response.data)
                } else {
                    setAnimales([])
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
            }
        }
    }

    //agregar animales en una tabla temporal
    const agregarAnimal = (data) => {

        const establecimiento = establecimientos.find(est =>
            parseInt(est.id, 10) === parseInt(data.id_establecimiento, 10)
        );

        const existeAnimal = animales.some(animal => animal.numero_animal === parseInt(data.numero_animal, 10));

        if(existeAnimal) {
            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'El animal ya esta agregado en la tabla'
            })
            return
        }

        const nuevoAnimal = {
            ...data,
            marca_diferencial: establecimiento ? establecimiento.marca_diferencial : "Desconocido",
            id_establecimiento: establecimiento.id
        };

        setAnimales([...animales, nuevoAnimal]);
        reset();
    };

    const borrarFila = (id) => {
        const NuevosDatos = animales.filter((_,i) => i !== id)
        setAnimales(NuevosDatos)
    }

    const editarFila = (index, updatedData) => {
        setAnimales((prevAnimales) =>
            prevAnimales.map((animal, i) =>
                i === index ? {...animal, ...updatedData} : animal
            )
        )
    }

    const HandleGuardarIngreso = async () => {
        setLoading(true)
        try{

            const nuevosAnimales = animales.filter((animal) => !animal.id)
            const animalesParse = nuevosAnimales.map(animal => ({
                ...animal,
                peso: parseFloat(animal.peso),
                numero_tiquete: parseInt(animal.numero_tiquete, 10),
                id_establecimiento: animal.id_establecimiento
            }));

            const response = await axios.post('/api/guardar-ingreso', {animales: animalesParse, fecha: selectedDate}, {responseType: 'blob'})
            console.log('Ingreso guardado con exito', response.data);

            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf'}))

            window.open(url, '_blank')

            setAnimales([]);
            reset();
            //mensaje en forma de modal para la confirmacion de el ingreso del registro
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Registro guardado con exito",
                showConfirmButton: false,
                timer: 1500
            })

        } catch (error) {
            if (error.response){
                console.error('Errores de validacion', error.response.data.errors)
                setAnimales([])
                //mensajes en forma de modal para la aprobacion de el formulario
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "Error de validacion",
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                console.error('Error al guardar ingreso', error);
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "Error al guardar el ingreso",
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
        <LoadingOverlay loading={loading} />
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Entrada Procuto</h2>}
        >
            <Head title="Entrada Producto"/>
            <div className="py-12">
                <div className="mx-auto sm:px-6 grid gap-10 lg:px-8">
                    <div className="bg-white overflow-hidden h-53 shadow-sm sm:rounded-lg flex flex-col items-center">

                        <Typography variant="h4" sx={{marginTop: '20px', marginBottom: '0px'}} component="h1" gutterBottom>
                                Agregar Animal
                            </Typography>
                        <Box
                        class="p-5 grid grid-cols-4 gap-4 h-auto w-full items-start "
                        component="form"
                        onSubmit={handleSubmit(agregarAnimal)} //maneja el envio del formulario
                        sx={{ maxWidth: 600, mx: 'auto', mt: 4}}>

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
                            variant='filled'
                            fullWidth
                            margin='normal'>
                                <InputLabel>Destino</InputLabel>
                                <Select
                                {...register('id_establecimiento')}
                                error={!!errors.id_establecimiento}
                                label="Destino"
                                defaultValue=""
                                >
                                    <MenuItem value="">
                                        <em>Seleccione Un Destino</em>
                                    </MenuItem>
                                {establecimientos.map(establecimiento => (
                                    <MenuItem key={establecimiento.id} value={establecimiento.id}>
                                        {establecimiento.marca_diferencial} {establecimiento.nombre_dueno}
                                    </MenuItem>
                                ))}
                                </Select>
                                {errors.id_establecimiento && <Typography color="error">{errors.id_establecimiento.message}</Typography>}
                            </FormControl>

                            <FormControl
                            variant="filled"
                            fullWidth
                            margin='normal'
                            >
                                <TextField
                                    variant='filled'
                                    label="Número de Animal"
                                    {...register('numero_animal')}
                                    error={!!errors.numero_animal}
                                />
                                {errors.numero_animal && <Typography color="error" >{errors.numero_animal.message}</Typography>}
                            </FormControl>

                            <FormControl variant='filled'  fullWidth margin="normal">
                                <InputLabel>Sexo</InputLabel>
                                <Select
                                    variant='filled'
                                    label="Sexo"
                                    {...register('sexo')}
                                    error={!!errors.sexo}
                                >
                                    <MenuItem value="Macho">Macho</MenuItem>
                                    <MenuItem value="Hembra">Hembra</MenuItem>
                                </Select>
                                {errors.sexo && <Typography color="error">{errors.sexo.message}</Typography>}
                            </FormControl>

                            <FormControl
                            variant="filled"
                            fullWidth
                            margin="normal"
                            >
                                <TextField
                                    variant='filled'
                                    label="Peso"
                                    type="number"
                                    {...register('peso')}
                                    error={!!errors.peso}
                                />
                                {errors.peso && <Typography color="error">{errors.peso.message}</Typography>}
                            </FormControl>

                            <FormControl
                            variant="filled"
                            fullWidth
                            margin="normal">
                                <TextField
                                    variant='filled'
                                    label="Número de Tiquete"
                                    type="number"
                                    {...register('numero_tiquete')}
                                    error={!!errors.numero_tiquete}
                                />
                                {errors.numero_tiquete && <Typography color="error">{errors.numero_tiquete.message}</Typography>}
                            </FormControl>

                            <FormControl
                            variant="filled"
                            fullWidth
                            margin="normal"
                            >
                            <TextField
                                variant='filled'
                                label="Guía de Movilización"
                                {...register('guia_movilizacion')}
                                error={!!errors.guia_movilizacion}
                            />
                            {errors.guia_movilizacion && <Typography color="error">{errors.guia_movilizacion.message}</Typography>}
                            </FormControl>

                            <FormControl
                                variant='filled'
                                fullWidth
                                margin="normal"
                                >
                                <InputLabel>Especie</InputLabel>
                                <Select
                                    {...register('especie')}
                                    error={!!errors.especie}
                                    label="especie"
                                >
                                    <MenuItem value="Bovino">Bovino</MenuItem>
                                    <MenuItem value="Porcino">Porcino</MenuItem>
                                </Select>
                                {errors.especie && <Typography color="error">{errors.especie.message}</Typography>}
                            </FormControl>
                            <FormControl
                            fullWidth
                            margin='normal'
                            >
                            <Button type="submit" variant="contained" color="primary" className="shrink-0">
                                Agregar Animal
                            </Button>
                            </FormControl>
                        </Box>
                    </div>

                    <ReusableDataTable
                        rows={rows}
                        columns={columns}
                        getRowId={(row) => row.id}
                    />
                    <Button variant="contained" color="primary" onClick={HandleGuardarIngreso} sx={{mt:2}}>
                        {loading ? <CircularProgress size={24} color='inherit' /> : "Guardar Ingreso"}
                    </Button>
                </div>
            </div>
        </AuthenticatedLayout>
        </>
    );
}
