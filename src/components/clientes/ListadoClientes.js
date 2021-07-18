import React, { useContext, useEffect, useState, Fragment } from 'react';
import ClienteContext from '../../context/clientes/clienteContext';

import {
    Table,
    Container,
} from "reactstrap";

function buscandoFiltro(consult) {
    return function (x) {
        return x.nombres.toLowerCase().includes(consult) || !consult;
    }
}


const ListadoClientes = () => {


    //instanciar context de empleado
    const clienteContext = useContext(ClienteContext);


    //extraer objetos y funciones del state de clientes
    const { clientes, mensaje, obtenerClientes } = clienteContext;


    const [consulta, guardarConsulta] = useState({
        consult: ''
    });



    const { consult } = consulta;



    // Obtener los clientes cuando carga el componente
    useEffect(() => {


        obtenerClientes();
        // eslint-disable-next-line
    }, [mensaje]);


    const onChangeBusqueda = e => {

        const { name, value } = e.target;


        guardarConsulta({
            ...consulta,
            [name]: value
        })

    }

    // revisar si hay empleados registrados
    if (clientes.length === 0) {
        return <p>No hay empleados, comienza creando uno</p>
    }



    let fechaForm;


    return (
        <Fragment>
            <div className="contenedor-basico sombra-dark">
                <h1>Listado de Clientes</h1>
                <div className="barraBusqueda">
                    <input
                        type="text"
                        placeholder="Buscar"
                        className="textField"
                        name="consult"
                        value={consult}
                        onChange={onChangeBusqueda}
                    />
                </div>

                <br></br>
                <Container>
                    <Table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Tipo Doc.</th>
                                <th>N° de documento</th>
                                <th>Nombres</th>
                                <th>Apellidos</th>
                                <th>Correo Electrónico</th>
                                <th>Teléfono</th>
                                <th>Fecha de Nacimiento</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes ? (
                                clientes.filter(buscandoFiltro(consult)).map(cliente => (

                                    fechaForm = new Date(cliente.fecha),
                                    cliente.fecha = fechaForm.toDateString(),

                                    <tr key={cliente._id}>
                                        <td>{cliente.tipo}</td>
                                        <td>{cliente.documento}</td>
                                        <td>{cliente.nombres}</td>
                                        <td>{cliente.apellidos}</td>
                                        <td>{cliente.correo}</td>
                                        <td>{cliente.telefono}</td>
                                        <td>{cliente.fecha}</td>

                                    </tr>
                                )))
                                :
                                null}

                        </tbody>
                    </Table>
                </Container>
            </div>

        </Fragment>
    );
}

export default ListadoClientes;