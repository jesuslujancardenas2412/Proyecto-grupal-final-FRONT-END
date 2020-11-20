import React from 'react';

import "./ClienteFooter.css";
import logo from "../assets/img/logo_transparente.png";

const ClienteFooter = () => {
    return (
        <>
            <footer>
                <div className="footer-top col-12">
                    <div className="row">
                        <div className="col-md-4 footer-top-section-1">
                            <figure className="footer-img-container">
                                <img className="footer-img" src={logo} alt="" />
                            </figure>
                        </div>
                        <div className="col-md-5 footer-top-section-2">
                            <div>
                                <p>Av. Siempre Viva #123</p>
                                <p>San Miguel</p>
                            </div>
                        </div>
                        <div className="col-md-3 footer-top-section-3">
                            <i className="fab fa-facebook"><span>dulcesmigajas</span></i>
                            <i className="fab fa-twitter"><span>dulcesmigajas</span></i>
                            <i className="fab fa-instagram"><span>dulcesmigajas</span></i>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom col-12">
                    <p>© Copyright xxx - 2020</p>
                </div>
            </footer>

        </>
    )
}

export default ClienteFooter;
