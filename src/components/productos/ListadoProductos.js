import React, { Fragment, useContext, useState, useEffect } from 'react';
import ProductoContext from '../../context/productos/productoContext';
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
        return x.nombre.toLowerCase().includes(consult) || !consult;
    }
}


const ListadoProductos = () => {

    const productoContext = useContext(ProductoContext);
    /** */
    const { productos, obtenerProductos, actualizarProducto } = productoContext;


    const [consulta, guardarConsulta] = useState({
        consult: ''
    });

    const [editable, guardarEditable] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        foto: '',
        disponibles: '',
        estado: ''
    })

    const [modalActualizar, setModalActualizar] = useState(false);


    const { consult } = consulta;

    const { nombre, descripcion, precio, foto, disponibles, estado } = editable;

    // Obtener proyectos cuando carga el componente
    useEffect(() => {

        obtenerProductos();
        // eslint-disable-next-line
    }, []);

    const onChangeBusqueda = e => {

        const { name, value } = e.target;

        guardarConsulta({
            ...consulta,
            [name]: value
        })

    }


    const mostrarModalActualizar = (producto) => {
        setModalActualizar(true);
        guardarEditable(producto);

    };

    const cerrarModalActualizar = () => {
        guardarEditable({
            nombre: '',
            descripcion: '',
            precio: '',
            foto: '',
            disponibles: '',
            estado: ''
        });
        setModalActualizar(false);
    }

    const editar = producto => {
        actualizarProducto(producto);

        setModalActualizar(false);

        alert("Producto actualizado con éxito");

    }


    const handleChange = (e) => {
        guardarEditable({
            ...editable,
            [e.target.name]: e.target.value,

        });
    };

    const cambiarEstado = producto => {
        if (producto.estado === 'Activo') {
            producto.estado = 'Inactivo';
        } else {
            producto.estado = 'Activo'
        }
        actualizarProducto(producto);
    }


    // revisar si productos tiene contenido
    if (productos.length === 0) {
        return <p>No hay productos, comienza creando uno</p>
    }


    return (
        <Fragment>
            <div className="contenedor-basico sombra-dark">
                <h1>Listado de Productos</h1>

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
                <Container >
                    <Table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Unidad de Medida</th>
                                <th>Precio</th>
                                <th>Unidades</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos ? (
                                productos.filter(buscandoFiltro(consult)).map(producto => (
                                    <tr key={producto._id}>
                                        <td>{producto.nombre}</td>
                                        <td>{producto.descripcion}</td>
                                        <td>{producto.precio}</td>
                                        <td>{producto.disponibles}</td>
                                        <td>{producto.estado}</td>
                                        <td>
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => mostrarModalActualizar(producto)}
                                            > <EditIcon /></button>{"  "}

                                            {producto.estado === 'Activo' ? (
                                                <button
                                                    className="btn btn-success"
                                                    onClick={() => cambiarEstado(producto)}
                                                ><AssignmentTurnedInIcon /></button>
                                            ) :
                                                (
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => cambiarEstado(producto)}
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
                <Modal isOpen={modalActualizar}>
                    <ModalHeader>
                        <div><h3>Editar Producto</h3></div>
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <label>Nombre</label>
                            <input
                                className="form-control"
                                type="text"
                                name="nombre"
                                value={nombre}
                                onChange={handleChange}

                            />
                        </FormGroup>

                        <FormGroup>
                            <label>Unidad de Medida</label>
                            <input
                                className="form-control"
                                type="text"
                                name="descripcion"
                                value={descripcion}
                                onChange={handleChange}

                            />
                        </FormGroup>

                        <FormGroup>
                            <label>Precio</label>

                            <input
                                className="form-control"
                                name="precio"
                                type="number"
                                value={precio}
                                onChange={handleChange}

                            />
                        </FormGroup>

                        <FormGroup>
                            <label>Foto</label>

                            <input
                                className="form-control"
                                name="foto"
                                type="text"
                                value={foto}
                                onChange={handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>Unidades</label>

                            <input
                                className="form-control"
                                name="disponibles"
                                type="number"
                                value={disponibles}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Estado</label>

                            <input
                                className="form-control"
                                name="estado"
                                type="text"
                                value={estado}
                                onChange={handleChange}
                                readOnly
                            />
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={() => editar(editable)}
                        >Editar</Button>
                        <Button
                            color="danger"
                            onClick={() => cerrarModalActualizar()}
                        > Cancelar   </Button>
                    </ModalFooter>
                </Modal>

            </div>


        </Fragment>
    );
}

export default ListadoProductos;