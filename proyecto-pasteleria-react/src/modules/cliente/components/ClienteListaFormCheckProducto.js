import React from 'react';
import ClientePaginacion from '../../../components/ClientePaginacion';
import ClienteListaCardFormCheckProducto from './ClienteListaCardFormCheckProducto';

const ClienteListaFormCheckProducto = ({ productoCategoria }) => {
    // console.log("producto categoria");
    // console.log(productoCategoria);

    return (

        <>
            <div className="productos__lista">
                {
                    productoCategoria.map(proCat => {
                        return <ClienteListaCardFormCheckProducto key={proCat.producto_id} proCat={proCat} />
                    })
                }
                {/* <ClienteListaCardFormCheckProducto /> */}
            </div>

            
        </>

    )
}

export default ClienteListaFormCheckProducto;
