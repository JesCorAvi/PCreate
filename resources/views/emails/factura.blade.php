<!DOCTYPE html>
<html>
<head>
    <title>Factura de tu pedido</title>
</head>
<body>
    <h1>Gracias por tu pedido</h1>
    <p>Adjunto encontrarás la factura de tu pedido.</p>
    <p><strong>Usuario:</strong> {{ $factura->user->name }}</p>
    <p><strong>Correo electrónico:</strong> {{ $factura->user->email }}</p>
    <p><strong>Fecha de creación:</strong> {{ \Carbon\Carbon::parse($factura->fecha_creacion)->format('d-m-Y') }}</p>
    <p><strong>Fecha de entrega:</strong> {{ \Carbon\Carbon::parse($factura->entrega_aproximada)->format('d-m-Y') }}</p>
    <p><strong>Dirección:</strong> {{ $factura->domicilio->direccion }}, {{ $factura->domicilio->ciudad }}, {{ $factura->domicilio->cpostal }}, {{ $factura->domicilio->provincia->nombre }}</p>
</body>
</html>
