import { Box, FormControl, InputLabel, Select, TextField, MenuItem, Typography, Button,  } from '@mui/material'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, useForm } from 'react-hook-form';

const EntradaModal = ({edit, establecimientos, agregarAct}) => {
    console.log("animal dentro del modal para editar", edit)
    console.log("establecimientos dentro del modal", establecimientos)

    const [selectedValue, setSelectedValue] = useState('')

    const schema = yup.object().shape({
        numero_animal: yup.string().required('Numero de animal es obligatorio').nullable(),
        peso: yup.string().required('Peso es obligatorio'),
        numero_tiquete: yup.string().required('Numero de tiquete es obligatorio'),
        sexo: yup.string().required('Sexo es obligatorio'),
        guia_movilizacion: yup.string().required('Guia movilización es obligatoria'),
        especie: yup.string().required('Especie es obligatoria'),
        id_establecimiento: yup.string().required('Destino es obligatorio'),
    })

    const { setValue ,handleSubmit, register,reset, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })


    useEffect(() => {
        if(edit) {
            reset(edit)
        }
            const matchedEstablecimiento = establecimientos.find(
                (est) => est.id === edit.id_establecimiento
            )
            setSelectedValue(matchedEstablecimiento ? matchedEstablecimiento.id : '')
    }, [edit, reset, establecimientos])

    console.log("Establecimiento que llega para editar",selectedValue)

    const handleChange = (event) => {
        setSelectedValue(event.target.value)
    }

    return (
    <Box
    class='p-5 flex flex-col h-auto w-auto'
    component='form'
    sx={{maxWidth: 100, mx: 'auto', mt: 4}}
    onSubmit={handleSubmit(agregarAct)}
    >
        <FormControl
        variant='filled'
        fullWidth
        margin='normal'
        >
        <InputLabel>Destino</InputLabel>
        <Select
        error={!!errors.id_establecimiento}
        label="Destino"
        {...register('id_establecimiento')}
        value={selectedValue || ''}
        onChange={handleChange}
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
        variant='filled'
        fullWidth
        margin='normal'
        >
            <TextField
            label="Numero de Animal"
            error={!!errors.numero_animal}
            defaultValue={edit.numero_animal}
            {...register('numero_animal')}
            />
        {errors.numero_animal && <Typography color='error'>{errors.numero_animal.message}</Typography>}
        </FormControl>
        <FormControl
        variant='filled'
        fullWidth
        margin="normal">
            <InputLabel>Sexo</InputLabel>
            <Select
                variant='filled'
                label="Sexo"
                error={!!errors.sexo}
                defaultValue={edit.sexo}
                {...register('sexo')}
            >
                <MenuItem value="Macho">Macho</MenuItem>
                <MenuItem value="Hembra">Hembra</MenuItem>
            </Select>
            {errors.sexo && <Typography color="error">{errors.sexo.message}</Typography>}
        </FormControl>
        <FormControl
        variant='filled'
        fullWidth
        margin='normal'
        >
            <TextField
            label="Peso"
            error={!!errors.peso}
            defaultValue={edit.peso}
            {...register('peso')}
            />
        {errors.peso && <Typography color='error'>{errors.peso.message}</Typography>}
        </FormControl>
        <FormControl
        variant='filled'
        fullWidth
        margin='normal'
        >
            <TextField
            label="Numero de Tiquete"
            error={!!errors.numero_tiquete}
            defaultValue={edit.numero_tiquete}
            {...register('numero_tiquete')}
            />
        {errors.numero_tiquete && <Typography color='error'>{errors.numero_tiquete.message}</Typography>}
        </FormControl>
        <FormControl
        variant='filled'
        fullWidth
        margin='normal'
        >
            <TextField
            label="Guia de Movilizacion"
            error={!!errors.guia_movilizacion}
            defaultValue={edit.guia_movilizacion}
            {...register('guia_movilizacion')}
            />
        {errors.guia_movilizacion && <Typography color='error'>{errors.guia_movilizacion.message}</Typography>}
        </FormControl>
        <FormControl
            variant='filled'
            fullWidth
            margin="normal"
            >
            <InputLabel>Especie</InputLabel>
            <Select
                error={!!errors.especie}
                label="especie"
                defaultValue={edit.especie}
                {...register('especie')}
            >
                <MenuItem value="Bovino">Bovino</MenuItem>
                <MenuItem value="Porcino">Porcino</MenuItem>
            </Select>
            {errors.especie && <Typography color="error">{errors.especie.message}</Typography>}
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
            Actualizar Animal
            </Button>
        </FormControl>
    </Box>
  )
}

export default EntradaModal
