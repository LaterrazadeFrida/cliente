import React from 'react';
import { Fragment } from 'react';
import Barra from '../layout/Barra';
import Header from '../layout/Header';
import { RViewerTrigger, RViewer } from 'react-viewerjs';

const Galeria = () => {

    let imagenes = [
        require("../../images/image2.jpeg"),
        require("../../images/image3.jpeg"),
        require("../../images/image4.jpeg"),
        require("../../images/image5.jpg"),
        require("../../images/image6.jpg"),
        require("../../images/image7.jpg"),
        require("../../images/image8.jpg"),
        require("../../images/image9.jpg")

    ];

    return (
        <Fragment>
            <Header />
            <Barra />
            <div className="contenedor-galeria">
            
            <br></br>
            {/* <h1 className="titulo-galeria">Galeria</h1>
            <hr className="separador"></hr> */}
            <RViewer imageUrls={imagenes}>
                <div style={{ marginLeft:'30px', marginRight: '20px', marginTop: '20px' }}>
                    {imagenes.map((imagen, index) => {
                        return (
                            <RViewerTrigger index={index}>
                                <img className="cards-galeria" src={imagen} alt="Imagen" style={{ width: '315px', height: '315px', margin: '1%', border: '1px solid black' }} />
                            </RViewerTrigger>
                        )
                    })}
                </div>
            </RViewer>
            
            </div>
        </Fragment>
    );
}

export default Galeria;