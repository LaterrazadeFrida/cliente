import React, { Fragment, useContext, useState } from 'react';
import EmpleadoContext from '../../context/empleados/empleadoContext';
import EstudioContext from '../../context/estudios/estudioContext';


const NuevoEstudio = () => {

    //obtener el state de empleados y todas sus funciones
    const empleadoContext = useContext(EmpleadoContext);

    const estudioContext = useContext(EstudioContext);



    //extraer objetos del state
    const { caso, empleadoSeleccionado } = empleadoContext;

    const { agregarEstudio } = estudioContext;

    const [estudio, guardarEstudio] = useState({
        titulo: '',
        centro: '',
        tiempo: '',
        idEmpleado: ''

    });


    const onChange = e => {
        const { name, value } = e.target;


        guardarEstudio({
            ...estudio,
            [name]: value
        })

    }

    //funcion onsubmit
    const onSubmit = e => {

        e.preventDefault();

        estudio.idEmpleado = empleadoSeleccionado._id;

        agregarEstudio(estudio);

        limpiarForm();

    }



    const limpiarForm = () => {

        //reiniciar formulario
        guardarEstudio({
            titulo: '',
            centro: '',
            tiempo: '',
            idEmpleado: ''
        })
    }

    return (

        <Fragment>
            {caso === 'Estudios' ? (
                <form
                    className="formulario-nuevo-proyecto"
                    onSubmit={onSubmit}

                >
                    <hr></hr>
                    <br></br>
                    <h1>Hoja de Vida</h1>
                    <br></br>
                    <h2>Estudios</h2>
                    <br></br>
                    <div className="campo-form">
                        <label htmlFor="documento">Título Profesional</label>
                        <input
                            type="text"
                            id="titulo"
                            name="titulo"
                            className="input-text"
                            placeholder="Título que obtuviste"
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="documento">Centro de Formación</label>
                        <input
                            type="text"
                            id="centro"
                            name="centro"
                            className="input-text"
                            placeholder="Lugar donde estudio"
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="documento">Tiempo</label>
                        <input
                            type="text"
                            id="tiempo"
                            name="tiempo"
                            className="input-text"
                            placeholder="Duración estudios"
                            onChange={onChange}
                        />
                    </div>
                    <input
                        type="submit"
                        className="btn btn-primary btn-block"
                        value="Añadir"
                    />

                    <input
                        className="btn btn-primary"
                        className="btn btn-primary btn-block"
                        value="Siguiente"
                    />

                </form>

            ) : null}
        </Fragment>
    );
}

export default NuevoEstudio;