import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Box, FormControl, TextField, Typography, Button, InputLabel, Select, MenuItem, Autocomplete } from "@mui/material";

const schema = yup.object().shape({
    marca_diferencial: yup.string().required('La marca diferencial es obligatoria'),
    nombre_dueno: yup.string().required('El nombre de el dueño es obligatorio'),
    nombre_establecimiento: yup.string().required('El nombre del establecimiento es obligatorio'),
    direccion: yup.string().required('la direccion del establecimiento es obligatoria'),
    cedula: yup.number().typeError('la cedula debe ser un numero').required('la cedula es obligatoria'),
    telefono: yup.number().typeError('el telefono debe ser un numero').required('el telefono es obligatorio')
})

const EstablecimientoModal = ({onSave}) => {
    const [municipios, setMunicipios] = useState([])
    const [departamento, setDepartamento] = useState([])
    const [selectedDepartamento, setSelectedDepartamento] = useState(null)
    const [selectedMunicipio, setSelectedMunicipio] = useState(null)


    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            marca_diferencial: '',
            nombre_dueno: '',
            nombre_establecimiento: '',
            direccion: '',
            cedula: '',
            telefono: '',
        }
    })


    const onSubmit = async (data) => {
        try {
            // Agregar el ID del municipio seleccionado a los datos del formulario
            const formData = { ...data, id_municipio: selectedMunicipio?.id };
            const response = await axios.post('/api/establecimientoAgg', formData);
            console.log('Datos guardados:', response.data);

            //Llama a onSave para modificar al componente principal
            onSave(response.data)

            reset();
        } catch (error) {
            console.error('Error al guardar los datos:', error);
        }
    };

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

    return(
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
                    label="marca_diferencial"
                    {...register('marca_diferencial')}
                    error={!!errors.marca_diferencial}
                    />
                    {errors.marca_diferencial && <span>{errors.marca_diferencial.message}</span>}
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                    variant="filled"
                    label='Nombre Dueño'
                    {...register('nombre_dueno')}
                    error={!!errors.nombre_dueno}
                    />
                    {errors.nombre_dueno && <span>{errors.nombre_dueno.message}</span>}
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                    variant="filled"
                    label='nombre_establecimiento'
                    {...register('nombre_establecimiento')}
                    error={!!errors.nombre_establecimiento}
                    />
                    {errors.nombre_establecimiento && <span>{errors.nombre_establecimiento.message}</span>}
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                    variant="filled"
                    label='direccion'
                    {...register('direccion')}
                    error={!!errors.direccion}
                    />
                    {errors.direccion && <span>{errors.direccion.message}</span>}
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                    variant="filled"
                    label='cedula'
                    {...register('cedula')}
                    error={!!errors.cedula}
                    />
                    {errors.cedula && <span>{errors.cedula.message}</span>}
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                    variant="filled"
                    label='telefono'
                    {...register('telefono')}
                    error={!!errors.telefono}
                    />
                    {errors.telefono && <span>{errors.telefono.message}</span>}
                </FormControl>
                <Button sx={{marginTop: 1}} type="submit" variant="contained" color="primary" className="shrink-0">
                    Guardar
                </Button>
            </Box>
        </div>
    )
}

export default EstablecimientoModal
