<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Entrada de Bovinos - Planilla de Control</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .title {
            text-align: center;
            font-weight: bold;
            margin-bottom: 10px;
            font-size: 14px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }
        th, td {
            border: 1px solid #000;
            text-align: center;
            padding: 5px;
            font-size: 12px;
        }
        th {
            background-color: #f2f2f2;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
        }
        img{
            width: 200px;
            height: 200px;
        }
    </style>
</head>
<body>
    <div class="header">
        <img src="{{ public_path('images/logoEVC.png') }}" alt="Logo">
    </div>
    <div class="title">
        ENTRADA DE BOVINOS - PLANILLA DE CONTROL<br>
        FECHA: {{ $fecha }}
    </div>
    <table>
        <thead>
            <tr>
                <th>DESTINO</th>
                <th>No</th>
                <th>SEXO</th>
                <th>KILOS</th>
                <th>N. TIQUETES</th>
                <th>GUÍA DE MOVILIZACIÓN</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($animales as $animal)
                <tr>
                    <td>{{ $animal['id_establecimiento'] }}</td>
                    <td>{{ $animal['numero_animal'] }}</td>
                    <td>{{ $animal['sexo'] }}</td>
                    <td>{{ $animal['peso'] }}</td>
                    <td>{{ $animal['numero_tiquete'] }}</td>
                    <td>{{ $animal['guia_movilizacion'] }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
    <div class="footer">
        Empresa Varias de Caicedonia S.A E.S.P
    </div>
</body>
</html>
