import React, { Fragment, useContext, useState, useEffect } from 'react';
import CitaContext from '../../context/citas/citaContext';
import "bootstrap/dist/css/bootstrap.min.css";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import EditIcon from '@material-ui/icons/Edit';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

import {
    Table,
    Button,
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter,
} from "reactstrap";

function buscandoFiltro(consult) {
    return function (x) {
        return x.docCliente.includes(consult) || !consult;
    }
}

const ListadoPuntos = () => {

    let str1;
    var puntajeTotal = 0;
    let puntosCliente;
    const citaContext = useContext(CitaContext);
    const { puntos, obtenerPuntaje, actualizarPuntos,guardarPuntaje,puntaje } = citaContext;
    const [consulta, guardarConsulta] = useState({
        consult: ''
    });

    const [modalCalcular, setModalCalcular] = useState(false);
    const [cliente, guardarCliente] = useState({
        documento: ''
    });
    const { consult } = consulta;
    const { documento } = cliente;

    // Obtener proyectos cuando carga el componente
    useEffect(() => {
        obtenerPuntaje();
        // eslint-disable-next-line
    }, [puntaje]);

    const onChangeBusqueda = e => {
        const { name, value } = e.target;

        guardarConsulta({
            ...consulta,
            [name]: value
        })
    }

    const handleChange = (e) => {
        guardarCliente({
            ...cliente,
            [e.target.name]: e.target.value,

        });
    };

    const cambiarEstado = puntos => {
        if (puntos.estado === 'Activo') {
            puntos.estado = 'Inactivo';
        } else {
            puntos.estado = 'Activo'
        }
        actualizarPuntos(puntos);

    }

    const abrirModal = () => {
        setModalCalcular(true);
    }

    const calcularPuntaje = () => {

        puntosCliente = puntos.filter(punto => punto.docCliente == cliente.documento);
        puntosCliente.map((punto) => {
            puntajeTotal = punto.cantidad + puntajeTotal;
        });
        console.log(puntajeTotal);

        guardarPuntaje(puntajeTotal);

    }

    // revisar si puntos tiene contenido
    if (puntos.length === 0) {
        return <p>No hay puntos, comienza creando uno</p>
    }

    return (
        <Fragment>
            <div className="contenedor-basico sombra-dark">
                <h1>Listado de Puntos</h1>
                <div className="mb-3">
                    <button className="btn-outline-primary mt-0 btn-lg"
                        onClick={() => abrirModal()}
                    >Calcular Puntaje</button>
                    <input
                        type="number"
                        placeholder="Buscar"
                        className="textField"
                        name="consult"
                        value={consult}
                        onChange={onChangeBusqueda}
                    />
                </div>
                <Container >
                    <Table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Doc. Cliente</th>
                                <th>Cantidad</th>
                                <th>Estado</th>
                                <th>Fecha de Liberación</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {puntos ? (
                                puntos.filter(buscandoFiltro(consult)).map(punto => (

                                    str1 = new Date(punto.creado),
                                    punto.creado = str1.toDateString(),
                                    <tr key={punto._id}>
                                        <td>{punto.docCliente}</td>
                                        <td>{punto.cantidad}</td>
                                        <td>{punto.estado}</td>
                                        <td>{punto.creado}</td>
                                        <td>
                                            <button
                                                className="btn btn-primary"
                                            > <EditIcon /></button>{"  "}

                                            {punto.estado === 'Activo' ? (
                                                <button
                                                    className="btn btn-success"
                                                    onClick={() => cambiarEstado(punto)}
                                                ><AssignmentTurnedInIcon /></button>
                                            ) :
                                                (
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => cambiarEstado(punto)}
                                                    > <HighlightOffIcon /> </button>
                                                )}
                                        </td>
                                    </tr>
                                )))
                                :
                                null}
                        </tbody>
                    </Table>
                </Container>
            </div>
            <div className="modal">
                <Modal isOpen={modalCalcular}>
                    <ModalHeader>
                        <div><h3>Calcular puntaje</h3></div>
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <label>Documento del cliente</label>
                            <input
                                className="form-control"
                                type="text"
                                name="documento"
                                value={documento}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <div>
                                <span className="text-reportes">Puntaje Total : {puntaje}</span>
                            </div>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={() => calcularPuntaje()}
                        >Calcular</Button>
                        <Button
                            color="danger"
                            onClick={() => setModalCalcular(false)}
                        > Cancelar   </Button>
                    </ModalFooter>
                </Modal>
            </div>
        </Fragment>
    );
}

export default ListadoPuntos;