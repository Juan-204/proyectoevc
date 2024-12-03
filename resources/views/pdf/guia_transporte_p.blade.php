<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Guía de Transporte</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
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
            width: 100px;
            height: 100px;
        }
        .textH{
            font-size: 12px;
        }
        .cabeza {
        margin-bottom: 20px;
        overflow: hidden; /* Asegura que los flotantes no afecten el flujo */
        }
        .imagen, .textarea, .cuadro {
            float: left;
            width: 33%;
            text-align: center;
        }
        .clearfix::after {
            content: "";
            display: table;
            clear: both;
        }
        .cuadro {
        margin-left: 10px;
        background-color: #ffeb3b; /* Amarillo */
        border: 1px solid #000; /* Borde negro */
        padding: 10px; /* Espaciado interno */
        box-sizing: border-box; /* Incluye el padding dentro del ancho */
        text-align: center;
        font-size: 20px;
        width: 100px;
        height: 100px;
        }
    </style>


</head>
<body>
    <div class="cabeza clearfix">
        <div class="imagen">
            <img src="{{ public_path('images/logoEVC.png') }}" alt="Logo">
        </div>
        <div class="textarea">
            <p class="textH">
                GUIA DE TRANSPORTE DE CARNE EN CANAL DESHUESADA Y SUBPRODUCTOS COMESTIBLES
            </p>
        </div>
        <div class="cuadro">
            40
        </div>
    </div>
    <h2>Identificacion de la Planta de Beneficio de Procedencia</h2>
    <table>
        <thead>
            <tr>
                <th>Planta</th>
                <th>Departamento</th>
                <th>Ciudad o Municipio</th>
                <th>Codigo INVIMA</th>
                <th>Direccion</th>
                <th>Sacrificio y Despacho</th>
                <th>Telefono</th>
            </tr>
        </thead>
        <tbody>
            <tr>

            </tr>
        </tbody>
    </table>

    <h2>Destino</h2>
    <table>
        <thead>
            <tr>
                <th>Nombre Dueño - Nombre Establecimiento</th>
                <th>Dirección</th>
                <th>Nº de Guía(s)</th>
            </tr>
        </thead>
        <tbody>

        </tbody>
    </table>


    <h2>Descripcion del Producto</h2>
    <table class="tabla">
        <thead>
            <tr>
                <th>LOTE-PESO-TIQUETE</th>
                <th>Cabezas</th>
                <th>Viseras Blancas</th>
                <th>Viseras Rojas</th>
                <th>Carne Octavos</th>
                <th>Temperatura Promedio</th>
                <th>Dictamen</th>
            </tr>
        </thead>
        <tbody>

        </tbody>
    </table>

    <h2>Vehiculo Transportador</h2>
    <table>
        <thead>
            <tr>
                <th>Conductor</th>
                <th>N° Cedula</th>
                <th>Placa</th>
                <th>Tipo de Vehiculo</th>
            </tr>
        </thead>
        <tbody>
            <tr>

            </tr>
        </tbody>
    </table>

    <h2>Decomisos</h2>
    <table class="tabla">
        <thead>
            <tr>
                <th># Animal</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Motivo</th>
            </tr>
        </thead>
        <tbody>

        </tbody>
    </table>

</body>
</html>
