import React from 'react';
import ClienteFooter from '../../../../components/ClienteFooter';
import ClienteHeader from '../../../../components/ClienteHeader';
import ClienteTablaCarrito from '../../components/ClienteTablaCarrito';
import ClienteProcesarPedido from '../../components/ClienteProcesarPedido';
import ClientePagoCarrito from '../../components/ClientePagoCarrito';

import "./ClienteCarritoScreen.css";

const ClienteCarritoScreen = () => {
    
    return (
        <>
            <ClienteHeader pagina="CARRITO" />

            <main className="carrito">
                <section className="info">
                    <ClienteTablaCarrito />
                    <ClienteProcesarPedido />
                </section>

                <section className="pago">
                    <ClientePagoCarrito />
                </section>
            </main>

            <ClienteFooter />
        </>
    )
}

export default ClienteCarritoScreen;
