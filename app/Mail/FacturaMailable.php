<?php

namespace App\Mail;

use App\Models\Factura;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Barryvdh\DomPDF\Facade\Pdf;

class FacturaMailable extends Mailable
{
    use Queueable, SerializesModels;

    public $factura;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Factura $factura)
    {
        $this->factura = $factura;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        // Generar el PDF
        $pdf = Pdf::loadView('factura.pdf', ['factura' => $this->factura]);

        return $this->view('emails.factura')
                    ->subject('Tu pedido ha sido realizado!')
                    ->attachData($pdf->output(), 'albaran-'.$this->factura->id.'.pdf', [
                        'mime' => 'application/pdf',
                    ]);
    }
}
