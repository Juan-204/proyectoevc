import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Box, TextField, Button, MenuItem, Select, FormControl, InputLabel, Typography, Table, TableHead, TableRow, TableBody, TableCell, IconButton} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Swal from 'sweetalert2';
import { Delete, Edit } from '@mui/icons-material';
import Loading from '@/Components/Loading';


export default function entradaproducto(props) {
    const [animales, setAnimales] = useState([]); //tabla temporal de animales
    const [establecimientos, setEstablecimientos] = useState([]);
    const [loading, setLoading] = useState('')

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

    //agregar animales en una tabla temporal
    const agregarAnimal = (data) => {

        const establecimiento = establecimientos.find(est =>
            parseInt(est.id, 10) === parseInt(data.id_establecimiento, 10)
        );

        const nuevoAnimal = {
            ...data,
            marca_diferencial: establecimiento ? establecimiento.marca_diferencial : "Desconocido",
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
            const animalesParse = animales.map(animal => ({
                ...animal,
                peso: parseFloat(animal.peso),
                numero_tiquete: parseInt(animal.numero_tiquete, 10),
            }));

            const response = await axios.post('/api/guardar-ingreso', {animales: animalesParse}, {responseType: 'blob'})
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
    };
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Entrada Procuto</h2>}
        >
            <Head title="Entrada Producto"/>
            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden h-52 shadow-sm sm:rounded-lg flex flex-col items-center">

                        <Typography variant="h4" sx={{marginTop: '20px', marginBottom: '0px'}} component="h1" gutterBottom>
                                Agregar Animal
                            </Typography>
                        <Box
                        class="p-5 flex flex-row space-x-9 h-auto w-full items-start "
                        component="form"
                        onSubmit={handleSubmit(agregarAnimal)} //maneja el envio del formulario
                        sx={{ maxWidth: 600, mx: 'auto', mt: 4}}>
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

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Destino</TableCell>
                                <TableCell>Numero animal</TableCell>
                                <TableCell>Peso</TableCell>
                                <TableCell>Numero de tiquete</TableCell>
                                <TableCell>Sexo</TableCell>
                                <TableCell>Guia de movilizacion</TableCell>
                                <TableCell>Especie</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {animales.map((animal, index) => (
                                <TableRow key={index}>
                                    <TableCell>{animal.marca_diferencial}</TableCell>
                                    <TableCell>{animal.numero_animal}</TableCell>
                                    <TableCell>{animal.peso}</TableCell>
                                    <TableCell>{animal.numero_tiquete}</TableCell>
                                    <TableCell>{animal.sexo}</TableCell>
                                    <TableCell>{animal.guia_movilizacion}</TableCell>
                                    <TableCell>{animal.especie}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => borrarFila(index)}>
                                            <Delete/>
                                        </IconButton>
                                        <IconButton onClick={() => editarFila(index)}>
                                            <Edit />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <Button variant="contained" color="primary" onClick={HandleGuardarIngreso} sx={{mt:2}}>
                        Guardar Ingreso
                    </Button>
                    <Loading  />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
