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
            font-size: 13px;
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
        background-color: #ffeb3b; /* Fondo amarillo */
        margin-left: 100px;
        border: 1px solid #000; /* Borde negro */
        width: 100px; /* Ancho del cuadrado */
        height: 100px; /* Alto igual al ancho */
        text-align: center; /* Centrar texto horizontalmente */
        line-height: 80px; /* Centrar texto verticalmente */
        font-size: 50px; /* Tamaño del texto */
        font-weight: bold; /* Texto en negrita */
        box-sizing: border-box; /* Incluir borde en las dimensiones */
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
                <strong>GUIA DE TRANSPORTE DE CARNE EN CANAL DESHUESADA Y SUBPRODUCTOS COMESTIBLES</strong>
            </p>
        </div>
        <div class="cuadro">
            {{ $establecimientosAgrupados->first()->first()->ingresoDetalle->animal->establecimiento->marca_diferencial ?? 'N/A' }}
        </div>
    </div>
    <p> <h3>{{$codigoInvima}} - {{$guia->id}} - {{ $fechacorta }}</h3> </p>
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
                <td>{{ $guia->planta->nombre }}</td>
                <td>{{ $guia->planta->municipio->departamento->nombre_departamento }}</td>
                <td>{{ $guia->planta->municipio->nombre_municipio }}</td>
                <td>{{ $codigoInvima }}</td>
                <td>{{ $guia->planta->direccion }}</td>
                <td>{{ $guia->fecha }}</td>
                <td>{{ $guia->planta->telefono }}
                    En caso de duda mejor llamar
                </td>
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
            @foreach ($establecimientosAgrupados as $idEstablecimiento => $detalles)
                @php
                    $establecimiento = $detalles->first()->ingresoDetalle->animal->establecimiento;
                    $guias = $detalles->pluck('ingresoDetalle.animal.guia_movilizacion')->unique();
                @endphp
                <tr>
                    <td>{{ $establecimiento->nombre_establecimiento }} - {{ $establecimiento->nombre_dueno }}</td>
                    <td>{{ $establecimiento->direccion }}</td>
                    <td>
                        {{ $guias->join(', ') }}
                    </td>
                </tr>
            @endforeach
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
            @foreach ($guia->detalles as $detalle)
            <tr>
                <!-- Verificar si el animal existe antes de acceder a su código -->
                <td>{{ $detalle->ingresoDetalle->animal->numero_animal }} -  {{ $detalle->ingresoDetalle->animal->peso }} kg -  {{ $detalle->ingresoDetalle->animal->numero_tiquete }}</td>
                <td>{{ $detalle->cabezas }}</td>
                <td>{{ $detalle->viseras_blancas }}</td>
                <td>{{ $detalle->viseras_rojas }}</td>
                <td>{{ $detalle->carne_octavos }}</td>
                <td>{{ $detalle->temperatura_promedio }}</td>
                <td>{{ $detalle->dictamen }}</td>
            </tr>
            @endforeach
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
                <td>{{ $guia->vehiculoConductor->conductores->nombre}}</td>
                <td>{{ $guia->vehiculoConductor->conductores->numero_cedula}}</td>
                <td>{{ $guia->vehiculoConductor->vehiculo->placa }}</td>
                <td>{{ $guia->vehiculoConductor->vehiculo->tipo_vehiculo }}</td>
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
            @foreach ($guia->detalles as $detalle)
            @foreach ($detalle->ingresoDetalle->animal->decomisos as $decomiso)
                <tr>
                    <td>{{ $detalle->ingresoDetalle->animal->numero_animal }}</td>
                    <td>{{ $decomiso->producto ?? 'N/A' }}</td>
                    <td>{{ $decomiso->cantidad }}</td>
                    <td>{{ $decomiso->motivo }}</td>
                </tr>
            @endforeach
        @endforeach
        </tbody>
    </table>

</body>
</html>
