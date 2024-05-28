<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Mail\FacturaMailable;
use App\Models\Factura;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Srmklive\PayPal\Services\PayPal as PayPalClient;

class PaypalController extends Controller
{
    public function payment(Request $request)
    {
        $request->session()->put('domicilio_id', $request->domicilio_id);
        $provider = new PayPalClient;
        $provider->setApiCredentials(config("paypal"));
        $paypalToken = $provider->getAccessToken();

        $response = $provider->createOrder([
            "intent" => "CAPTURE",
            "application_context" => [
                "return_url" => route("paypal.listo"),
                "cancel_url" => route("paypal.cancelar"),
            ],
            "purchase_units" => [
                [
                    "amount" => [
                        "currency_code" => "EUR",
                        "value" => $request->total,
                    ],
                ],
            ],
        ]);
        if (isset($response["id"]) && $response["id"] != Null) {
            foreach ($response["links"] as $link) {
                if ($link["rel"] === "approve") {
                    return Inertia::location($link["href"]);
                }
            }
        } else {
            return redirect()->route("paypal.cancelar");
        }
    }

    public function success(Request $request)
    {
        $provider = new PayPalClient;
        $provider->setApiCredentials(config("paypal"));
        $paypalToken = $provider->getAccessToken();
        $response = $provider->capturePaymentOrder($request->token);
        if (isset($response["status"]) && $response["status"] === "COMPLETED") {
            $domicilio_id = $request->session()->get('domicilio_id');
            $request->session()->forget('domicilio_id');
            $carrito = auth()->user()->carritos->first();
            $articulos = $carrito->articulos()->withPivot('cantidad')->get();

            $factura = Factura::create([
                'user_id' => auth()->user()->id,
                'domicilio_id' => $domicilio_id,
            ]);

            foreach ($articulos as $articulo) {
                $factura->articulos()->attach($articulo->id, [
                    'cantidad' => $articulo->pivot->cantidad,
                    'precio' => $articulo->precio,
                ]);
            }
            $facturaCreada = Factura::find($factura->id);
            Mail::to(auth()->user()->email)->send(new FacturaMailable($facturaCreada));


            $carrito->delete();

            return redirect()->route('profile.show', ["seccion" => "pedidos"])->with('success', 'Compra realizada exitosamente.');
        } else {
            return redirect()->route("factura.create");
        }
    }
    public function cancel()
    {
        return redirect()->route("carrito.index");
    }
}
