import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Box, TextField, Button, MenuItem, Select, FormControl, InputLabel, Typography} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Dashboard(props) {
    //estado para manejar los datos
    const [animalData, setAnimalData] = useState({
        numero_animal: '',
        lote: '',
        peso: '',
        numero_tiquete: '',
        sexo: '',
        guia_movilizacion: '',
        especie: '',
        id_establecimiento: '',
    })

    const [establecimientos, setEstablecimientos] = useState([]);

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

    //funcion para manejar los cambios de los datos
    const handleChange = (e) => {
        const {name, value} = e.target;
        setAnimalData({ ...animalData, [name]: value });
    }

    //funcion para manejar el envio de los datos mediante el formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{

            const animalDataParce = {
                ...animalData,
                numero_tiquete: parseInt(animalData.numero_tiquete, 10)
            };


            const response = await axios.post('/api/animales', animalDataParce);
            console.log('Animal agregado', response.data);



            setAnimalData({
                numero_animal: '',
                lote: '',
                peso: '',
                numero_tiquete: '',
                sexo: '',
                guia_movilizacion:'',
                especie: '',
                id_establecimiento: '',
            })

        } catch (error) {
            console.error('Error al agregar el animal', error, error.response.data);
        }
    };


    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Entrada Procuto</h2>}
        >
            <Head title="Entrada Producto" />
            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8 text-6xl">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg flex ">

                    <Typography variant="h4" component="h1" gutterBottom>
                            Agregar Animal
                        </Typography>

                    <Box
                    class="flex flex-row space-x-9"
                    component="form"
                    onSubmit={handleSubmit} //maneja el envio del formulario
                    sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>

                        <FormControl
                        variant='filled'
                        fullWidth
                        margin='normal'>
                            <InputLabel>Destino</InputLabel>
                            <Select
                            name='id_establecimiento'
                            value={animalData.id_establecimiento}
                            onChange={handleChange}
                            label="Destino"
                            required
                            >
                            {establecimientos.map(establecimiento => (
                                <MenuItem key={establecimiento.id} value={establecimiento.id}>
                                    {establecimiento.marca_diferencial} {establecimiento.nombre_dueno}
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>

                        <TextField
                            label="Número de Animal"
                            variant="filled"
                            fullWidth
                            margin="normal"
                            name='numero_animal'
                            value={animalData.numero_animal}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label="Lote"
                            variant="filled"
                            fullWidth
                            margin="normal"
                            name='lote'
                            value={animalData.lote}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Peso"
                            variant="filled"
                            fullWidth
                            margin="normal"
                            type="number"
                            name='peso'
                            value={animalData.peso}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label="Número de Tiquete"
                            variant="filled"
                            fullWidth
                            margin="normal"
                            type="number"
                            name='numero_tiquete'
                            value={animalData.numero_tiquete}
                            onChange={handleChange}
                            required
                        />

                        <FormControl variant='filled'  fullWidth margin="normal">
                            <InputLabel>Sexo</InputLabel>
                            <Select
                                name='sexo'
                                value={animalData.sexo}
                                onChange={handleChange}
                                label="Sexo"
                                required
                            >
                                <MenuItem value="Macho">Macho</MenuItem>
                                <MenuItem value="Hembra">Hembra</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Guía de Movilización"
                            variant="filled"
                            fullWidth
                            margin="normal"
                            name='guia_movilizacion'
                            value={animalData.guia_movilizacion}
                            onChange={handleChange}
                            required
                        />
                        <FormControl variant='filled'  fullWidth margin="normal">
                            <InputLabel>Especie</InputLabel>
                            <Select
                                name='especie'
                                value={animalData.especie}
                                onChange={handleChange}
                                label="especie"
                                required
                            >
                                <MenuItem value="Bovino">Bovino</MenuItem>
                                <MenuItem value="Porcino">Porcino</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                            Agregar Animal
                        </Button>
                    </Box>



                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
