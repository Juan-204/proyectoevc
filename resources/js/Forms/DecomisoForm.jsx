import { Box, FormControl,Button,TextField, Typography,} from "@mui/material";
import { useEffect } from "react";
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schemaDecomiso = Yup.object().shape({
    producto: Yup.string().required("Este campo es requerido"),
    cantidad: Yup.number().required("Este campo es requerido"),
    numero_animal: Yup.number().required("esta campo es requerido"),
    motivo: Yup.string().required("Este campo es requerido"),
})

const DecomisoForm = ({selectedAnimal, onSubmitDecomisos, tablaContext, agregarDecomiso}) => {
    console.log(selectedAnimal)

    let numero_animalValue = ''
    if(tablaContext === true){
        numero_animalValue = selectedAnimal?.animalDetails?.animal?.numero_animal
    } else {
        numero_animalValue = selectedAnimal?.animal?.numero_animal
    }


    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        resolver: yupResolver(schemaDecomiso),
        defaultValues: {
            numero_animal: numero_animalValue || '',
            producto: '',
            cantidad: '',
            motivo: '',
        }
    })

    const onSubmit = (data) => {
        onSubmitDecomisos(data); // Llama a la función pasada como prop
        reset(); // Resetea el formulario

        if (tablaContext === true) {
            agregarDecomiso(data)
        }
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
                    value={numero_animalValue || ''}
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
