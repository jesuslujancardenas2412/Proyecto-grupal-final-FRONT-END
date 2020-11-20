import React from 'react';
import ClienteFooter from '../../../../components/ClienteFooter';
import ClienteHeader from '../../../../components/ClienteHeader';
import ClienteFormularioRegistro from '../../components/ClienteFormularioRegistro';

import "./ClienteRegistroScreen.css";

const ClienteRegistroScreen = () => {
    return (
        <>
            <ClienteHeader pagina="REGISTRO" />

            <main className="productos">
                <section className="row justify-content-center">
                    <div className="col-md-10 bg-white border">
                        <ClienteFormularioRegistro />
                    </div>
                </section>
            </main>

            <ClienteFooter />
        </>
    )
}

export default ClienteRegistroScreen;
