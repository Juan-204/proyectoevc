import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';


const GuiaTransporteModal = ({selectedAnimal, onSubmitGuia}) => {

    const schema = yup.object().shape({
        numero_animal: yup.string().required('Numero de animal es obligatorio').nullable(),
        peso: yup.string().required('Peso es obligatorio'),
        numero_tiquete: yup.string().required('Numero de tiquete es obligatorio'),
        sexo: yup.string().required('Sexo es obligatorio'),
        guia_movilizacion: yup.string().required('Guia movilización es obligatoria'),
        especie: yup.string().required('Especie es obligatoria'),
        numero_corral: yup.string().required('El Numero del Corral es obligatoria'),
        id_establecimiento: yup.string().required('Destino es obligatorio'),
    })

    const {register, handleSubmit, reset , formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    })

    useEffect(() => {
            if(selectedAnimal) {
                reset(selectedAnimal)
                console.log("Formulario reseteado con:", selectedAnimal)
            }
        }, [selectedAnimal, reset])

    return (
        <div className="bg-white min-w-20 shrink-0 h-53 m-5 shadow-sm sm:rounded-lg flex flex-col items-center">
        <Typography
        variant="h5"
        sx={{
            width: 100,
            textAlign: 'center',
        }}
        >Informacion de la Guía de Transporte</Typography>
        <Box
        class="flex flex-col m-5 items-center"
        component="form"
        onSubmit={handleSubmit(onSubmitGuia)}
        sx={{maxWidth: 1000, mx: 'auto', mt: 4}}>

            <FormControl fullWidth margin="normal">
                <TextField
                variant="filled"
                label="Carne en octavos de canal"
                {...register('carne_octavos')}
                error={!!errors.carne_octavos}
                //defaultValue={selectedAnimal.carne_octavos}
                />
            </FormControl>

            <FormControl fullWidth margin="normal">
                <TextField
                variant="filled"
                label="Viseras Blancas"
                //defaultValue={selectedAnimal.viseras_blancas}
                {...register('viseras_blancas')}
                error={!!errors.viseras_blancas}
                />
            </FormControl>

            <FormControl fullWidth margin="normal">
                <TextField
                variant="filled"
                label="Viseras Rojas"
                {...register('viseras_rojas')}
                error={!!errors.viseras_rojas}
                //defaultValue={selectedAnimal.viseras_rojas}
                />
            </FormControl>

            <FormControl fullWidth margin="normal">
                <TextField
                variant="filled"
                label="Cabezas"
                {...register('cabezas')}
                error={!!errors.cabezas}
                //defaultValue={selectedAnimal.cabezas}
                />
            </FormControl>

            <FormControl fullWidth margin="normal">
                <TextField
                variant="filled"
                label="Temp Promedio"
                {...register('temperatura_promedio')}
                error={!!errors.temperatura_promedio}
                //defavalueultValue={selectedAnimal.temperatura_promedio}
                />
            </FormControl>

            <FormControl fullWidth margin="normal">
                <InputLabel>Dictamen</InputLabel>
                <Select
                variant="filled"
                {...register('dictamen')}
                error={!!errors.dictamen}
                //defaultValue={selectedAnimal.dictamen}
                >
                    <MenuItem value="">
                        <em>Seleccione Un Destino</em>
                    </MenuItem>
                    <MenuItem value="A">A</MenuItem>
                    <MenuItem value="AC">AC</MenuItem>
                </Select>
            </FormControl>

            <FormControl
            fullWidth
            margin='normal'
            variant='filled'
            >
                <Button
                type='submit'
                variant='contained'
                color='primary'
                >
                Guardar
                </Button>
            </FormControl>
        </Box>
    </div>
  )
}

export default GuiaTransporteModal
