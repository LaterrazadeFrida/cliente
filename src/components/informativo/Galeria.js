import React from 'react';
import { Fragment } from 'react';
import Barra from '../layout/Barra';
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
            <Barra />
            <br></br>
            <br></br>
            <h1>Galeria</h1>
            <hr></hr>
            <RViewer imageUrls={imagenes}>
                <div style={{ display: 'flex', marginLeft:'20px', marginRight: '20px', marginTop: '40px' }}>
                    {imagenes.map((imagen, index) => {
                        return (
                            <RViewerTrigger index={index}>
                                <img src={imagen} alt="Imagen"style={{ width: '150px', height: '150px', margin: '1%', border: '2px solid black' }} />
                            </RViewerTrigger>
                        )
                    })}
                </div>

            </RViewer>
        </Fragment>
    );
}

export default Galeria;