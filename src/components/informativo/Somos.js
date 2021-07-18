import React from 'react';
import { Fragment } from 'react';
import Barra from '../layout/Barra';
import Header from '../layout/Header';



const Somos = () => {
    return (
        <Fragment>
            <Header />
            <Barra />
            <div className="contenedor-principal ">
                <hr></hr>
                <div className="contenedor-basico sombra-dark" >

                    <h1 className="Titulo3" >La Terraza de Frida</h1>
                    <div className="texto-somos">
                        <h3>
                            <p className="Parrafo">Nos gusta el color y las nuevas tendencias. Hemos usado la
                            imagen de Frida en su caracterización de mujer fuerte, atrevida y aguerrida;
                            junto con la de Diego un hombre rebelde y enamorado todo unido en un espacio
                            de belleza hecho galería.
                    </p>

                            <p className="Parrafo">
                                Queremos que las fridas y diegos que nos visiten se sientan cómodos y vivan una experiencia
                                entre la belleza el arte y la música.  “Un sitio donde esperar se vuelve un cuento”.
                        </p>

                            <p className="Parrafo">
                                Frida, roja, Frida de flores, Frida artista, Frida pintora, Frida en expresión de su
                                belleza interna  y externa en su arte. “Todos hemos sido Fridas y Diegos”
                        </p>
                        </h3>
                    </div>
                
                    <div className="Contenedor-mision-vision-objetivo">

                        <div className="Mision">
                            <h1 className="Titulo1"> MISIÓN</h1>
                            <h3>
                                <p className="Parrafo1">
                                    La terraza de Frida es un espacio creado para la belleza de la mujer y del hombre, un espacio que te
                                    hace reafirmar tu identidad aportando en la construcción de la imagen estética que quieres ver
                                    reflejado en el espejo.

            </p>
                            </h3>
                        </div>

                        <div className="Mision">
                            <h1 className="Titulo1"> VISIÓN </h1>
                            <h3>
                                <p className="Parrafo1">
                                    Fortalecer la satisfacción en la experiencia del cliente, cumplir las metas planteadas con su
                                    respectivo plan o propuesta logrando orientar el proceso y consiguiendo un resultado óptimo.

            </p>
                            </h3>
                        </div>

                        <div className="Mision" >
                            <h1 className="Titulo1"> OBJETIVO</h1>
                            <h3>
                                <p className="Parrafo1">
                                    Ofrecer servicios de cuidado personal, atendiendo a las demandas y necesidades de los
                                    clientes, siguiendo siempre unos códigos de higiene y salud, para poder ofrecer servicios
                                    de la mayor calidad posible.
                </p>

                            </h3>
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    );
}
export default Somos;