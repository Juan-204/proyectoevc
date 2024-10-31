import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Box, FormControl,Button,MenuItem, Select, TextField, Typography, InputLabel, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";



export default function guiatransporte(props) {
    const [establecimientos, setEstablecimientos] = useState([]);
    const [formDictamen, setFormDictamen] = useState(false)
    const [ingresoDetalles, setIngresoDetalles] = useState([]);
    const [selectedEstablecimiento, setSelectedEstablecimiento] = useState('');
    const [detallesEstablecimiento, setDetallesEstablecimiento] = useState({
        nombre_dueno: '',
        direccion: '',
        telefono: '',
    })
    const [formData, setFormData] = useState({
        id_ingreso_detalle: '',
        carne_octavos: '',
        viseras_blancas: '',
        viseras_rojas: '',
        cabezas: '',
        temperatura_promedio: '',
        dictamen: '',
    })
    const [selectedAnimal, setselectedAnimal] = useState('');
    const [showAnimalForm ,setShowAnimalForm] = useState(false);

    useEffect(() => {
        axios.get('/api/establecimientos')
                .then(response => setEstablecimientos(response.data))
                .catch(error => console.error('Error al cargar establecimiento', error))
    }, [])

    const cargarAnimales = (idEstablecimiento) => {
        axios.get(`/api/animales/establecimiento/${idEstablecimiento}`)
        .then(response => {
            console.log('Animales del Establecimiento', response.data);
            setIngresoDetalles(response.data);
        })
        .catch(error => console.error('Error al cargar los animales', error))
    }

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

        //cargarAnimales(idEstablecimiento)

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
        console.log('Animal selecionado', animalSele)
        setselectedAnimal(animalSele)
        setFormData(prevFormData => ({
            ...prevFormData,
            id_ingreso_detalle: animalSele ? animalSele.id : '',
        }))
        console.log('ID Ingreso Detalle:', animalSele ? animalSele.id : 'No seleccionado')
        setShowAnimalForm(true)//mostrar el formulario al seleccionar un animal
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })

        if(name === "dictamen" && value === 'AC'){
            setFormDictamen(true)
        }else {
            setFormDictamen(false)
        }
    }

    const HandleSubmit = async (e) => {
        e.preventDefault()

        console.log('Datos enviados: ', formData)

        try{
            const response = await axios.post('/api/guia-transporte', formData)
            console.log('Respuesta del servidor', response.data)
            Swal.fire({
                title: 'Guia de transporte creada con exito',
                position: 'center',
                icon: 'success',
                showConfirmButton: 'false',
                timer: 1500
            })
            setFormData({
                id_ingreso_detalle: '',
                carne_octavos: '',
                viseras_blancas: '',
                viseras_rojas: '',
                cabezas: '',
                temperatura_promedio: '',
                dictamen: '',
            })
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
            setFormData({
                id_ingreso_detalle: '',
                carne_octavos: '',
                viseras_blancas: '',
                viseras_rojas: '',
                cabezas: '',
                temperatura_promedio: '',
                dictamen: '',
            })
            setSelectedEstablecimiento('');
            setIngresoDetalles([]);
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
                                //name="id_ingresos_detalle"
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
                                onSubmit={HandleSubmit}
                                sx={{maxWidth: 1000, mx: 'auto', mt: 4}}>

                                    <FormControl fullWidth margin="normal">
                                        <TextField
                                        variant="filled"
                                        label="Carne en octavos de canal"
                                        value={formData.carne_octavos}
                                        name="carne_octavos"
                                        onChange={handleChange}
                                        type="number"
                                        />
                                    </FormControl>

                                    <FormControl fullWidth margin="normal">
                                        <TextField
                                        variant="filled"
                                        label="Viseras Blancas"
                                        value={formData.viseras_blancas}
                                        name="viseras_blancas"
                                        onChange={handleChange}
                                        />
                                    </FormControl>

                                    <FormControl fullWidth margin="normal">
                                        <TextField
                                        variant="filled"
                                        label="Viseras Rojas"
                                        value={formData.viseras_rojas}
                                        onChange={handleChange}
                                        name="viseras_rojas"
                                        />
                                    </FormControl>

                                    <FormControl fullWidth margin="normal">
                                        <TextField
                                        variant="filled"
                                        label="Cabezas"
                                        value={formData.cabezas}
                                        onChange={handleChange}
                                        name="cabezas"
                                        />
                                    </FormControl>

                                    <FormControl fullWidth margin="normal">
                                        <TextField
                                        variant="filled"
                                        label="Temp Promedio"
                                        value={formData.temperatura_promedio}
                                        onChange={handleChange}
                                        name="temperatura_promedio"
                                        />
                                    </FormControl>

                                    <FormControl fullWidth margin="normal">
                                        <InputLabel>Dictamen</InputLabel>
                                        <Select
                                        variant="filled"
                                        value={formData.dictamen}
                                        onChange={handleChange}
                                        name="dictamen"
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

                            {formDictamen && (
                            <div className="m-4 bg-white overflow-hidden h-52 shadow-sm sm:rounded-lg flex flex-col items-center">
                                <Typography variant="h5">Decomisos</Typography>
                                <Box
                                class="p-5 flex flex-row space-x-9 h-auto w-full items-start "
                                component="form"
                                onSubmit={HandleSubmit}
                                sx={{maxWidth: 1000, mx: 'auto', mt: 4}}>

                                    <FormControl fullWidth margin="normal">
                                        <TextField
                                        variant="filled"
                                        label="Carne en octavos de canal"
                                        value={formData.carne_octavos}
                                        name="carne_octavos"
                                        onChange={handleChange}
                                        type="number"
                                        />
                                    </FormControl>

                                    <FormControl fullWidth margin="normal">
                                        <TextField
                                        variant="filled"
                                        label="Viseras Blancas"
                                        value={formData.viseras_blancas}
                                        name="viseras_blancas"
                                        onChange={handleChange}
                                        />
                                    </FormControl>

                                    <FormControl fullWidth margin="normal">
                                        <TextField
                                        variant="filled"
                                        label="Viseras Rojas"
                                        value={formData.viseras_rojas}
                                        onChange={handleChange}
                                        name="viseras_rojas"
                                        />
                                    </FormControl>

                                    <FormControl fullWidth margin="normal">
                                        <TextField
                                        variant="filled"
                                        label="Cabezas"
                                        value={formData.cabezas}
                                        onChange={handleChange}
                                        name="cabezas"
                                        />
                                    </FormControl>

                                    <FormControl fullWidth margin="normal">
                                        <TextField
                                        variant="filled"
                                        label="Temp Promedio"
                                        value={formData.temperatura_promedio}
                                        onChange={handleChange}
                                        name="temperatura_promedio"
                                        />
                                    </FormControl>

                                    <FormControl fullWidth margin="normal">
                                        <Select
                                        variant="filled"
                                        label='sexo'
                                        value={formData.dictamen}
                                        onChange={handleChange}
                                        name="dictamen"
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


                </div>
            </div>
        </AuthenticatedLayout>
    );
}
