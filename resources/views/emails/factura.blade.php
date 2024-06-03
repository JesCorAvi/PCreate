<!DOCTYPE html>
<html>
<head>
    <title>Factura de tu pedido</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .header img {
            max-width: 150px;
        }
        .header h2 {
            color: #333333;
            margin: 10px 0 0 0;
        }
        h1 {
            color: #333333;
            text-align: center;
        }
        p {
            color: #666666;
            line-height: 1.6;
        }
        .info {
            margin-bottom: 20px;
        }
        .info strong {
            display: inline-block;
            width: 150px;
            color: #333333;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            color: #999999;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://i.imgur.com/ssvdSw5.png" alt="PCreate">
        </div>
        <h1>Gracias por tu pedido</h1>
        <p>Adjunto encontrarás el albarán de tu pedido.</p>
        <div class="info">
            <p><strong>Usuario:</strong> {{ $factura->user->name }}</p>
            <p><strong>Correo electrónico:</strong> {{ $factura->user->email }}</p>
            <p><strong>Fecha de pedido:</strong> {{ \Carbon\Carbon::parse($factura->fecha_creacion)->format('d-m-Y') }}</p>
            <p><strong>Fecha de entrega estimada:</strong> {{ \Carbon\Carbon::parse($factura->entrega_aproximada)->format('d-m-Y') }}</p>
            <p><strong>Dirección:</strong> {{ $factura->domicilio->direccion }}, {{ $factura->domicilio->ciudad }}, {{ $factura->domicilio->cpostal }}, {{ $factura->domicilio->provincia->nombre }}</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 PCreate. Todos los derechos reservados.</p>
        </div>
    </div>
</body>
</html>
