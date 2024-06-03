<!DOCTYPE html>
<html>
<head>
    <title>Albarán #{{ $factura->id }}</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
        }
        .table-auto {
            width: 100%;
            border-collapse: collapse;
        }
        .table-auto th, .table-auto td {
            border: 1px solid black;
            padding: 8px;
        }
        .table-auto th {
            background-color: #f2f2f2;
        }
        .text-center {
            text-align: center;
        }
        .font-bold {
            font-weight: bold;
        }
        .mt-5 {
            margin-top: 1.25rem;
        }
        .text-xl {
            font-size: 1.25rem;
        }
        .company-name {
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 1rem;
        }
    </style>
</head>
<body class="p-6">
    <div class="container mx-auto text-center">
        <div class="company-name">PCreate</div>
        <h1 class="text-2xl font-bold">Albarán #{{ $factura->id }}</h1>
        <p><strong>Usuario:</strong> {{ $factura->user->name }}</p>
        <p><strong>Correo electrónico:</strong> {{ $factura->user->email }}</p>
        <p><strong>Fecha de pedido:</strong> {{ \Carbon\Carbon::parse($factura->fecha_creacion)->format('d-m-Y') }}</p>
        <p><strong>Fecha de entrega estimada:</strong> {{ \Carbon\Carbon::parse($factura->entrega_aproximada)->format('d-m-Y') }}</p>
        <p><strong>Dirección:</strong> {{ $factura->domicilio->direccion }}, {{ $factura->domicilio->ciudad }}, {{ $factura->domicilio->cpostal }}, {{ $factura->domicilio->provincia->nombre }}</p>
        <table class="table-auto mt-5">
            <thead>
                <tr>
                    <th>Artículo</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                @foreach($factura->articulos as $articulo)
                <tr>
                    <td>{{ $articulo->nombre }}</td>
                    <td>{{ $articulo->pivot->precio }}€</td>
                    <td>{{ $articulo->pivot->cantidad }}</td>
                    <td>{{ $articulo->pivot->precio * $articulo->pivot->cantidad }}€</td>
                </tr>
                @endforeach
            </tbody>
        </table>
        <p class="total font-bold text-xl mt-5">Total: {{ number_format($factura->articulos->sum(function($articulo) {
            return $articulo->pivot->precio * $articulo->pivot->cantidad;
        }), 2) }}€</p>
    </div>
</body>
</html>
