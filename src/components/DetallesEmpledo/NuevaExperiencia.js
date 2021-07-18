import React, { Fragment, useContext, useState } from 'react';
import DetalleContext from '../../context/detalle/detalleContext';
import EmpleadoContext from '../../context/empleados/empleadoContext';


const NuevaExperiencia = () => {

    const detalleContext = useContext(DetalleContext);
    const empleadoContext = useContext(EmpleadoContext);

    const { formulario_prof, agregarExperiencia } = detalleContext;
    const { empleadoSeleccionado, cambiarCaso, caso } = empleadoContext;



    //state para guardar experiencia

    const [experiencia, guardarExperiencia] = useState({
        expe: '',
        nombreEmpresa: '',
        fechaInicio: '',
        fechaFin: '',
        idEmpleado: ''

    });

    const { expe, nombreEmpresa, fechaInicio, fechaFin, idEmpleado } = experiencia;



    const onChange = e => {
        const { name, value } = e.target;//destructure de los valores enviados por el metodo onchange de cada input


        guardarExperiencia({
            ...experiencia,
            [name]: value
        })

    }


    const cambiarDetalle = caso => {

        limpiarForm();

        cambiarCaso(caso);


    }

    const limpiarForm = () => {

        //reiniciar formulario
        guardarExperiencia({
            expe: '',
            nombreEmpresa: '',
            fechaInicio: '',
            fechaFin: '',
            idEmpleado: ''
        })
    }


    //funcion onsubmit
    const onSubmit = e => {

        e.preventDefault();

        experiencia.idEmpleado = empleadoSeleccionado._id;

        agregarExperiencia(experiencia);

        limpiarForm();

    }


    return (

        <Fragment>

            {caso === 'HojaVida' ? (
                <form
                    className="formulario-nuevo-proyecto"
                    onSubmit={onSubmit}
                >
                    <hr></hr>
                    <br></br>
                    <h1>Hoja de Vida</h1>
                    <br></br>
                    <h2>Datos Profesionales</h2>
                    <br></br>
                    <div className="campo-form">
                        <label htmlFor="documento">Experiencia Laboral</label>
                        <input
                            type="text"
                            id="expe"
                            name="expe"
                            className="input-text"
                            placeholder="Tu experiencia"
                            onChange={onChange}
                            value={expe}

                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="nombres">Nombre de la Empresa </label>
                        <input
                            type="text"
                            id="nombreEmpresa"
                            name="nombreEmpresa"
                            className="input-text"
                            placeholder="Nombre de la empresa"
                            onChange={onChange}
                            value={nombreEmpresa}

                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="nombres">Fecha Inicio</label>
                        <input
                            type="date"
                            id="fechaInicio"
                            name="fechaInicio"
                            className="input-text"
                            onChange={onChange}
                            value={fechaInicio}

                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="nombres">Fecha Fin</label>
                        <input
                            type="date"
                            id="fechaFin"
                            name="fechaFin"
                            className="input-text"
                            onChange={onChange}
                            value={fechaFin}

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
                        onClick={() => cambiarDetalle('Estudios')}
                        value="Siguiente"
                    />

                </form>


            ) : null}
        </Fragment>

    );
}

export default NuevaExperiencia;