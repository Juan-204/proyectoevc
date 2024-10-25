import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Box, FormControl, Menu, MenuItem, Select, TextField, Typography, InputLabel, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";


export default function guiatransporte(props) {
    const [establecimientos, setEstablecimientos] = useState([]);
    const [selectedEstablecimiento, setSelectedEstablecimiento] = useState('');
    const [selectedAnimal, setselectedAnimal] = useState(null);
    const [detallesEstablecimiento, setDetallesEstablecimiento] = useState({
        nombre_dueno: '',
        direccion: '',
        telefono: '',
    })
    const [animales, setAnimales] = useState([]);

    useEffect(() => {
        const fetchEstablecimientos = async () => {
            try {
                const response = await axios.get('/api/establecimientos');
                setEstablecimientos(response.data)
            }catch (error) {
                console.log('error al cargar los establecimientos', error)
            }
        };
        fetchEstablecimientos()
    }, [])

    const handleChange = async (event) => {
        const idEstablecimiento = event.target.value;
        setSelectedEstablecimiento(idEstablecimiento)
        //BUSCAR LOS DETALLES DEL ESTABLECIMIENTO SELECCIONADO
        const establecimiento = establecimientos.find(est => est.id === parseInt(idEstablecimiento))

        if (establecimiento) {
            //LENAR LOS OTROS CAMPOS CON LOS DETALLES DEL ESTABLECIMIENTO
            setDetallesEstablecimiento({
                nombre_dueno: establecimiento.nombre_dueno,
                direccion: establecimiento.direccion,
                telefono: establecimiento.telefono
            });

            //HACER LA LLAMADA PARA OBTENER LOS ANIMALES
            try {
                const response = await axios.get(`/api/establecimientos/${idEstablecimiento}/animales`)
                const AnimalesData = response.data

                if(AnimalesData.length === 0){
                    toast.info('No hay animales disponibles para este establecimiento')
                } else {
                    toast.info('Animales cargados con exito')
                }
                setAnimales(response.data)
            }catch (error) {
                console.log('Error al cargar los animales', error)
            }
            //limpiar los detalles si no se selecciona ningun establecimiento
        } else {
            console.log('no se selecciono un establecimiento valido')
            setDetallesEstablecimiento({
                nombre_dueno: '',
                direccion: '',
                telefono: '',
            })
            setAnimales([]) //LIMPIAR LOS ANIMALES
        }
    }

    const HandleChangeAnimal = (event) => {
        setselectedAnimal(event.target.value)
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
                        /*component="form"
                        onSubmit={}*/
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
                                onChange={handleChange}
                                >
                                    <MenuItem value="">
                                        <em>Seleccione un Destino</em>
                                    </MenuItem>
                                {establecimientos.map(establecimiento => (
                                        <MenuItem key = {establecimiento.id} value={establecimiento.id}>
                                            {establecimiento.marca_diferencial} {establecimiento.nombre_dueno}
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


                            <FormControl variant="filled" fullWidth margin="normal" sx={{maxWidth: 200}}>
                                <InputLabel>Animales Disponibles</InputLabel>
                                <Select
                                label="Animales Disponibles"
                                value={selectedAnimal}
                                onChange={HandleChangeAnimal}
                                >
                                    <MenuItem value="">
                                        <em>Seleccione un Animal</em>
                                    </MenuItem>
                                    {animales.map(animal => (
                                        <MenuItem key={animal.id} value={animal.id}>
                                            {animal.numero_animal} {animal.sexo === 'Macho' ? 'M' : 'H'}-{animal.peso}K-{animal.numero_tiquete}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {selectedAnimal && (
                            <div className="bg-white overflow-hidden h-52 shadow-sm sm:rounded-lg flex flex-col items-center">
                                <Typography variant="h5">Informacio de la guia de Transporte</Typography>
                                <Box
                                class="p-5 flex flex-row space-x-9 h-auto w-full items-start "
                                sx={{maxWidth: 1000, mx: 'auto', mt: 4}}>

                                    <FormControl fullWidth margin="normal">
                                        <TextField variant="filled" label="Carne en octavos de canal"/>
                                    </FormControl>

                                    <FormControl fullWidth margin="normal">
                                        <TextField variant="filled" label="Viseras Blancas"/>
                                    </FormControl>

                                    <FormControl fullWidth margin="normal">
                                        <TextField variant="filled" label="Viseras Rojas"/>
                                    </FormControl>

                                    <FormControl fullWidth margin="normal">
                                        <TextField variant="filled" label="Cabezas"/>
                                    </FormControl>

                                    <FormControl fullWidth margin="normal">
                                        <TextField variant="filled" label="Temp Promedio"/>
                                    </FormControl>

                                    <FormControl fullWidth margin="normal">
                                        <TextField variant="filled" label="Guia ICA"/>
                                    </FormControl>

                                </Box>
                            </div>
                            )}


                    {/*
                    {animales.length > 0 && (
                        <Table>
                            <TableHead className="bg-[#186fc6]">
                                <TableRow>
                                    <TableCell className="" sx={{fontSize: 18}} align="center">Lote-Peso-Tiquete</TableCell>
                                    <TableCell className="" sx={{fontSize: 18}} align="center">Carne en octavos de canal</TableCell>
                                    <TableCell className="" sx={{fontSize: 18}} align="center">Viseras Blancas</TableCell>
                                    <TableCell className="" sx={{fontSize: 18}} align="center">Viseras Rojas</TableCell>
                                    <TableCell className="" sx={{fontSize: 18}} align="center">Cabezas</TableCell>
                                    <TableCell className="" sx={{fontSize: 18}} align="center">Temperatura Promedio</TableCell>
                                    <TableCell className="" sx={{fontSize: 18}} align="center">Dictamen</TableCell>
                                    <TableCell className="" sx={{fontSize: 18}} align="center">Numero de Guia</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className="border-y-4 divide-y-4 divide-dashed">
                                {animales.map((animal) => (
                                    <TableRow key={animal.id}>
                                        <TableCell className="border-x-4 border-y-4 border-dashed border-gray-300" sx={{fontSize: 18}} align="center">{animal.numero_animal}{animal.sexo === 'Macho' ? 'M' : 'H'}-{animal.peso}K-{animal.numero_tiquete}</TableCell>
                                        <TableCell className="border-x-4 border-y-4 border-dashed border-gray-300" sx={{fontSize: 18}} align="center"><TextField></TextField></TableCell>
                                        <TableCell className="border-x-4 border-y-4 border-dashed border-gray-300" sx={{fontSize: 18}} align="center"><TextField defaultValue='1'></TextField></TableCell>
                                        <TableCell className="border-x-4 border-y-4 border-dashed border-gray-300" sx={{fontSize: 18}} align="center"><TextField defaultValue='1'></TextField></TableCell>
                                        <TableCell className="border-x-4 border-y-4 border-dashed border-gray-300" sx={{fontSize: 18}} align="center"><TextField defaultValue='1'></TextField></TableCell>
                                        <TableCell className="border-x-4 border-y-4 border-dashed border-gray-300" sx={{fontSize: 18}} align="center"><TextField defaultValue="39° - 39.5°"></TextField></TableCell>
                                        <TableCell className="border-x-4 border-y-4 border-dashed border-gray-300" sx={{fontSize: 18}} align="center"><TextField></TextField></TableCell>
                                        <TableCell className="border-x-4 border-y-4 border-dashed border-gray-300" sx={{fontSize: 18}} align="center">{animal.guia_movilizacion}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        )}
                            <ToastContainer position="top-right" autoClose={1500} pauseOnHover={false}/>
                    */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
