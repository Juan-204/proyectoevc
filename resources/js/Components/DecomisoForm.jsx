import { Box, FormControl,Button,MenuItem, Select, TextField, Typography, InputLabel, Table, TableHead, TableRow, TableCell, TableBody, Paper, Accordion, AccordionActions, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schemaDecomiso = Yup.object().shape({
    producto: Yup.string().required("Este campo es requerido"),
    cantidad: Yup.number().required("Este campo es requerido"),
    numero_animal: Yup.string().required("esta campo es requerido"),
    motivo: Yup.string().required("Este campo es requerido"),
})

const DecomisoForm = ({selectedAnimal, onSubmitDecomisos}) => {

    //console.log("estoy en el modal esto es lo que llega", selectedAnimal)

    useEffect(() => {
        if (selectedAnimal && selectedAnimal.animal) {
          // Si selectedAnimal y selectedAnimal.animal están definidos
          console.log("selectedAnimal y su propiedad animal llegaron correctamente:", selectedAnimal.animal);
        } else {
          // Si selectedAnimal o selectedAnimal.animal no están definidos
          console.log("selectedAnimal no ha llegado o falta la propiedad 'animal'.");
        }
      }, [selectedAnimal]);

    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        resolver: yupResolver(schemaDecomiso),
        defaultValues: {
            numero_animal: selectedAnimal?.animal?.numero_animal || '' ,
            producto: '',
            cantidad: '',
            motivo: '',
        }
    })

    const onSubmit = (data) => {
        data.numero_animal = selectedAnimal?.animal.numero_animal || "N/A"; // Agrega el número de animal
        onSubmitDecomisos(data); // Llama a la función pasada como prop
        console.log("datos desde el Modal",data)
        reset(); // Resetea el formulario
    };



    return (
        <div className="m-4 bg-white overflow-hidden h-auto w-auto shadow-sm sm:rounded-lg flex flex-col items-center">
            <Typography variant="h5">Decomisos</Typography>
            <Box
            class="p-5 flex flex-col h-auto w-auto"
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{maxWidth: 1000, mx: 'auto', mt: 4}}>
                <FormControl fullWidth margin="normal">
                    <TextField
                    variant="filled"
                    label="Producto"
                    {...register('producto')}
                    error={!!errors.producto}
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                    variant="filled"
                    label="# Animal"
                    value={selectedAnimal?.animal?.numero_animal || ''}
                    {...register('numero_animal')}
                    error={!!errors.numero_animal}
                    disabled/>
                    {errors.numero_animal && <span>{errors.numero_animal.message}</span>}
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                    variant="filled"
                    label="Cantidad"
                    {...register('cantidad')}
                    error={!!errors.cantidad}
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                    variant="filled"
                    label="Motivo"
                    {...register('motivo')}
                    error={!!errors.motivo}
                    />
                </FormControl>
                <Button type="submit" variant="contained" color="primary" className="shrink-0">
                    Guardar
                </Button>
            </Box>
        </div>
    )
}


export default DecomisoForm
