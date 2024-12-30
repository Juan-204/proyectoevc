import ReusableDataTable from '@/Components/ReusableDataTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Search } from '@mui/icons-material';
import { Button, InputAdornment, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

export default function search(props) {
    const [animales, setAnimales] = useState([]);
    const [query, setQuery] = useState("")

    const columns = [
        {field: 'id', headerName: 'ID', width: 150},
        {field: 'numero_animal', headerName: 'Numero de Animal', width: 150},
        {field: 'peso', headerName: 'Peso', width: 150},
        {field: 'numero_tiquete', headerName: 'Numero de Tiquete', width: 150},
        {field: 'sexo', headerName: 'Sexo', width: 150},
        {field: 'guia_movilizacion', headerName: 'Guia de Movilizacion', width: 150},
        {field: 'especie', headerName: 'Especie', width: 150},
        {field: 'id_establecimiento', headerName: 'Establecimiento', width: 150}
    ]

    useEffect(() => {
        axios.get('/api/animalesget')
        .then(response => setAnimales(response.data))
        .catch(error => console.error('Error al cargar establecimiento', error))
    }, [])

    const rows = animales.map((animal, index) => ({
        id: index,
        ...animal,
    }))

    const handleSearch = async (event) => {
        event.preventDefault()

        try {
            const response = await axios.get("/api/buscar-animales", {
                params: {query},
            })
            setAnimales(response.data)
        } catch (error) {
            console.error("Error al buscar:", error)
        }
    }



    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Busqueda</h2>}
        >
            <Head title="Busqueda" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <form onSubmit={handleSearch} className='flex justify-center'>
                    <TextField
                    sx={{
                        margin: '20px',
                        width: 700,
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment>
                                    <Search/>
                                </InputAdornment>
                            )
                        }
                    }}
                    variant="standard"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    />
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        sx={{
                            margin: '20px'
                        }}
                    >
                        Buscar
                    </Button>
                    </form>
                    <ReusableDataTable
                        columns={columns}
                        rows={rows}
                        getRowId={(row) => row.id}
                    />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
