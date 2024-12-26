
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Box, FormControl, TextField, Typography, Button, } from "@mui/material";


const schema = yup.object().shape({
    nombre: yup.string().required('El Nombre es obligatorio'),
    telefono: yup.string().required('El Telefono es obligatorio'),
    numero_cedula: yup.string().required('El Numero de Cedula es obligatorio'),
})

const ConductoresModal = ({onSave}) => {

    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            nombre: '',
            telefono: '',
            numero_cedula: '',
        }
    })

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('/api/conductoresAgg', data);
            console.log('Datos Del Conductor Guardados', response.data)

            onSave(response.data)
            reset();
        } catch (error) {
            console.error('Error al guardar los datos:', error);
        }
    }

    return (
        <div className="m-4 bg-white overflow-hidden h-auto w-auto shadow-sm sm:rounded-lg flex flex-col items-center">
            <Typography variant="h5">Agregue</Typography>
            <Box
            class="p-5 flex flex-col h-auto w-auto"
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{maxWidth: 100, mx: 'auto', mt: 4}}
            >
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
                    {errors.telefono && <span>{errors.telefono.message}</span>}
                </FormControl>
                <FormControl
                fullWidth
                margin="normal">
                    <TextField
                    variant="filled"
                    label='Numero de Cedula'
                    {...register('numero_cedula')}
                    error={!!errors.numero_cedula}
                    />
                    {errors.numero_cedula && <span>{errors.numero_cedula.message}</span>}
                </FormControl>
                <Button sx={{marginTop: 1}} type="submit" variant="contained" color="primary" className="shrink-0">
                    Guardar
                </Button>
            </Box>
        </div>
    )
}

export default ConductoresModal
