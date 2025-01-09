
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Box, FormControl, TextField, Typography, Button, } from "@mui/material";


const schema = yup.object().shape({
    placa: yup.string().required('La Placa es Obligatoria'),
    tipo_refrigeracion: yup.string().required('El Tipo de Refrigeracion es Obligatorio'),
    tipo_vehiculo: yup.string().required('El Tipo de Vehiculo es Obligatorio'),
})

const VehiculosModal = ({onSave}) => {

    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            placa: '',
            tipo_refrigeracion: '',
            tipo_vehiculo: '',
        }
    })

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('/api/vehiculosAgg', data)
            console.log('Datos Del Vehiculo Guardadados', response.data)

            onSave(response.data)
            reset();
        } catch (error) {
            console.error('Error al guardar los datos: ', error)
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
                    label="Placa"
                    {...register('placa')}
                    error={!!errors.placa}
                    />
                    {errors.placa && <span>{errors.placa.message}</span>}
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                    variant="filled"
                    label='Tipo de Refrigeracion'
                    {...register('tipo_refrigeracion')}
                    error={!!errors.tipo_refrigeracion}
                    />
                    {errors.tipo_refrigeracion && <span>{errors.tipo_refrigeracion.message}</span>}
                </FormControl>
                <FormControl
                fullWidth
                margin="normal">
                    <TextField
                    variant="filled"
                    label='Tipo de Vehiculo'
                    {...register('tipo_vehiculo')}
                    error={!!errors.tipo_vehiculo}
                    />
                    {errors.tipo_vehiculo && <span>{errors.tipo_vehiculo.message}</span>}
                </FormControl>
                <Button sx={{marginTop: 1}} type="submit" variant="contained" color="primary" className="shrink-0">
                    Guardar
                </Button>
            </Box>
        </div>
    )
}

export default VehiculosModal
