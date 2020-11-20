import React from 'react';
import ClienteFooter from '../../../../components/ClienteFooter';
import ClienteHeader from '../../../../components/ClienteHeader';
import ClienteFormularioLogin from '../../components/ClienteFormularioLogin';

import "./ClienteLoginScreen.css";

const ClienteLoginScreen = () => {
    return (
        <>
            <ClienteHeader pagina="LOGIN" />

            <main className="login">
                <section className="row justify-content-center w-100">
                    <div className="col-md-8 bg-white border">
                        <ClienteFormularioLogin />
                    </div>
                </section>
            </main>

            <ClienteFooter />
        </>
    )
}

export default ClienteLoginScreen;
