
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Box, FormControl, TextField, Typography, Button, Autocomplete, } from "@mui/material";


const schema = yup.object().shape({
    nombre: yup.string().required('El Nombre es Obligatorio'),
    telefono: yup.string().required('El Telefono es Obligatorio'),
    direccion: yup.string().required('La Direccion es Obligatoria'),
})

const PlantaModal = ({onSave}) => {
    const [municipios, setMunicipios] = useState([])
    const [departamento, setDepartamento] = useState([])
    const [selectedDepartamento, setSelectedDepartamento] = useState(null)
    const [selectedMunicipio, setSelectedMunicipio] = useState(null)

    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            nombre: '',
            telefono: '',
            direccion: '',
        }
    })

    const onSubmit = async (data) => {
        try {
            const formData = {...data, id_municipio: selectedMunicipio?.id}
            const response = await axios.post('api/plantaAgg', formData)

            onSave(response.data)
        } catch {
            console.error('Error al guardar los datos:', error);
        }
    }

    useEffect(() => {
        axios.get('/api/departamento')
                .then(response => setDepartamento(response.data))
                .catch(error => console.error('Error al cargar establecimiento', error))
    }, []);

    useEffect(() => {
        if (selectedDepartamento){
            axios.get(`/api/municipios/${selectedDepartamento.id}`)
                .then(response => setMunicipios(response.data))
                .catch(error => console.error('Error al cargar municipios', error))
        }
    }, [selectedDepartamento])

    return (
        <div className="m-4 bg-white overflow-hidden h-auto w-auto shadow-sm sm:rounded-lg flex flex-col items-center">
            <Typography variant="h5">Agregue</Typography>
            <Box
            class="p-5 flex flex-col h-auto w-auto"
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{maxWidth: 100, mx: 'auto', mt: 4}}
            >
                <Autocomplete
                options={departamento}
                getOptionLabel={(option) => option.nombre_departamento}
                value={selectedDepartamento}
                onChange={(_, newValue) => setSelectedDepartamento(newValue)}
                renderInput={(params) => (
                    <TextField
                    {...params}
                    margin="normal"
                    label="Seleccione un Departamento"
                    variant="filled"
                    required
                    />
                )}
                />
                <Autocomplete
                options={municipios}
                getOptionLabel={(option) => option.nombre_municipio}
                value={selectedMunicipio}
                onChange={(_, newValue) => setSelectedMunicipio(newValue)}
                renderInput={(params) => (
                    <TextField
                    {...params}
                    margin="normal"
                    label="Seleccione un Municipio"
                    variant="filled"
                    required
                    disabled={!selectedDepartamento}
                    />
                )}
                />
                <FormControl
                fullWidth
                margin="normal"
                >
                    <TextField
                    variant="filled"
                    label="Nombre"
                    {...register('nombre')}
                    error={!!errors.nombre}
                    />
                    {errors.nombre && <span>{errors.nombre.message}</span>}
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                    variant="filled"
                    label='Telefono'
                    {...register('telefono')}
                    error={!!errors.telefono}
                    />
                    {errors.telefono && <span>{errors.nombre_dueno.telefono}</span>}
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                    variant="filled"
                    label='Direccion'
                    {...register('direccion')}
                    error={!!errors.direccion}
                    />
                    {errors.direccion && <span>{errors.direccion.message}</span>}
                </FormControl>
                <Button sx={{marginTop: 1}} type="submit" variant="contained" color="primary" className="shrink-0">
                    Guardar
                </Button>
            </Box>
        </div>
    )
}

export default PlantaModal
