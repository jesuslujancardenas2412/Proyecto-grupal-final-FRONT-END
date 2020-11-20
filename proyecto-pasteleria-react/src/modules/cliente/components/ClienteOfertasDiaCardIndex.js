import React from 'react';

const ClienteOfertasDiaCardIndex = ({ producto }) => {
    return (
        <div className="card card-ofertas">
            <img className="card-ofertas-img" src={producto.producto_img} alt="ofertas" />
            <div className="card-body card-ofertas-information">
                <div className="card-ofertas-information-top">
                    <h5 className="card-title">{ producto.producto_nom}</h5>
                    <h6 className="card-subtitle">{ producto.categoria_nombre}</h6>
                </div>
                <p className="card-text card-ofertas-information-bottom">S/. { producto.producto_pre}</p>
            </div>
        </div>
    )
}

export default ClienteOfertasDiaCardIndex;
