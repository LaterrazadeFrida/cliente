import React, { Fragment, useState, useEffect, useContext } from 'react';
import CitaContext from '../../context/citas/citaContext';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ProductoContext from '../../context/productos/productoContext';
import InsumoContext from '../../context/insumos/insumoContext';
import PuntosContext from '../../context/puntaje/puntosContext';
import { makeStyles } from '@material-ui/core/styles';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Alert from '@material-ui/lab/Alert';

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

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiFormLabel-root':
        {
            fontSize: 14,
            marginTop: -10

        }
    },
    heading: {
        fontSize: theme.typography.pxToRem(18),
        fontWeight: theme.typography.fontWeightRegular,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
        width: 265

    },
    formControl: {
        minWidth: 265,

    },
    text: {
        fontSize: 14,
        marginTop: -10
    }

}));

const ListadoCitas = () => {
    const classes = useStyles();
    let str;
    let str1;


    const [modalEliminar, setModalEliminar] = useState(false);
    const [modalIncumplimiento, setModalIncumplimiento] = useState(false);
    const [modalLiberacion, setModalLiberacion] = useState(false);
    const [modalProducto, setModalProducto] = useState(false);
    const [gasto, guardarGasto] = useState({
        idProducto: '',
        idCita: '',
        medida: '',
        cantidad: ''
    });

    const {idProducto, idCita, medida, cantidad} = gasto;

    const [eliminable, guardarEliminable] = useState('');
    const [cita, guardarCita] = useState({
        _id: '',
        docCliente: '',
        Servicio: '',
        docEmpleado: '',
        horaInicio: '',
        horaFin: '',
        costo: '',
        Estado: ''
    });


    const citaContext = useContext(CitaContext);
    const insumoContext = useContext(InsumoContext);
    const puntosContext = useContext(PuntosContext);

    const { obtenerCitas, citas, eliminacionCita, actualizarCita } = citaContext;
    const productoContext = useContext(ProductoContext);

    const { productos, obtenerProductos } = productoContext;
    const { ActualizandoInsumos ,mensajeConfirmación, limpiarMensajes ,mensajeError} = insumoContext;
    const {liberacionPuntos} = puntosContext;

    const [consulta, guardarConsulta] = useState({
        consult: ''
    });

    const { consult } = consulta;


    useEffect(() => {

        obtenerCitas();
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

    const onChangeInventario= e => {
        const { name, value } = e.target;
        guardarGasto({
            ...gasto,
            [name]: value
        })
    }

    const eliminarCita = (cita) => {
        eliminacionCita(cita);
        setModalEliminar(false);
    }

    const cambiarEstado = cita => {
        switch (cita.Estado) {
            case 'Pendiente':
                cita.Estado = 'Incumplida';
                actualizarCita(cita);
                break;
            case 'Incumplida':
                cita.Estado = 'Cumplida';
                actualizarCita(cita);
                liberacionPuntos(cita);
                break;
            default:
                break;
        }

        setModalIncumplimiento(false);
        setModalLiberacion(false);
    }

    const mostrarModalEliminar = (cita) => {
        setModalEliminar(true);
        guardarEliminable(cita._id);
    };

    const mostrarModalIncumplimiento = (cita) => {
        setModalIncumplimiento(true);
        guardarCita(cita);
    }

    const mostrarModalLiberacion = (cita) => {
        setModalLiberacion(true);
        guardarCita(cita);
    }

    const mostrarModalProducto = (cita) => {
        limpiarMensajes();
        setModalProducto(true);
        guardarCita(cita);
    }

    const actualizarInsumos = (gasto) => {
        limpiarMensajes();
        gasto.idCita = cita._id;
        ActualizandoInsumos(gasto);

        guardarGasto({
            idProducto: '',
            idCita: '',
            medida: '',
            cantidad: ''
        })
        setModalProducto(false);
    }


    // revisar si hay empleados registrados
    if (citas.length === 0) {
        return <p >NO HAY CITAS, COMIENZA CREANDO UNA</p>
    }

    return (
        <Fragment>
       {mensajeConfirmación ? ( <Alert severity="success">{mensajeConfirmación}</Alert> )  : null}
       {mensajeError ? ( <Alert severity="error">{mensajeError.msg}</Alert> )  : null}

            <div className="contenedor-basico sombra-dark">
                <h1>Listado de Citas</h1>
                <div className="barraBusqueda mb-5">
                    <input
                        type="number"
                        placeholder="Buscar"
                        className="textField"
                        name="consult"
                        value={consult}
                        onChange={onChangeBusqueda}
                    />
                </div>

                <br></br>
                <Container>
                    <Table className="table table-striped responsive">
                        <thead>
                            <tr>
                                <th>Añadir Productos</th>
                                <th>Doc. Cliente</th>
                                <th>Servicio</th>
                                <th>Doc. Empleado</th>
                                <th>Hora Inicio</th>
                                <th>Hora Fin</th>
                                <th>Costo</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {citas ? (
                                citas.filter(buscandoFiltro(consult)).map(cita => (
                                    str = new Date(cita.horaInicio),
                                    str1 = new Date(cita.horaFin),

                                    cita.horaInicio = str.toString(),
                                    cita.horaFin = str1.toString(),
                                    <tr key={cita._id}>
                                        <td>
                                            <a
                                                className="btn btn-info espaciado btn-sm"
                                                data-toggle="tooltip"
                                                title="Añadir"
                                                onClick={() => mostrarModalProducto(cita)}
                                            ><AddBoxIcon /></a>
                                        </td>
                                        <td>{cita.docCliente}</td>
                                        <td>{cita.Servicio}</td>
                                        <td>{cita.docEmpleado}</td>
                                        <td>{cita.horaInicio}</td>
                                        <td>{cita.horaFin}</td>
                                        <td>{cita.costo}</td>
                                        <td>{cita.Estado}</td>
                                        <td>
                                            {cita.Estado === 'Pendiente' ? (
                                                <a
                                                    className="btn btn-info espaciado btn-sm"
                                                    onClick={() => mostrarModalIncumplimiento(cita)}
                                                > <ContactSupportIcon /> </a>

                                            ) : null}
                                            {cita.Estado === 'Incumplida' ? (
                                                <a
                                                    className="btn btn-secondary espaciado btn-sm"
                                                    onClick={() => mostrarModalLiberacion(cita)}
                                                > <HighlightOffIcon /> </a>

                                            ) : null}

                                            {cita.Estado === 'Cumplida' ? (
                                                <a
                                                    className="btn btn-success espaciado btn-sm"
                                                > <AssignmentTurnedInIcon /> </a>

                                            ) : null}

                                            <a
                                                className="btn btn-danger btn-sm"
                                                data-toggle="tooltip"
                                                title="Eliminar"
                                                onClick={() => mostrarModalEliminar(cita)}
                                            ><HighlightOffIcon /></a>
                                        </td>
                                    </tr>
                                )))
                                :
                                null}
                        </tbody>
                    </Table>
                </Container>
            </div>

            <Modal isOpen={modalEliminar}>
                <ModalHeader>
                    <h3>Advertencia</h3>
                </ModalHeader>
                <ModalBody>
                    <div className="text-alert">
                        <span className="warning"><WarningRoundedIcon /></span><br></br>
                        ¿Seguro que desea eliminar la cita?
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => eliminarCita(eliminable)}
                    > Eliminar</Button>

                    <Button
                        color="danger"
                        onClick={() => setModalEliminar(false)}
                    > Cancelar </Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modalIncumplimiento}>
                <ModalHeader>
                    <h3>Advertencia</h3>
                </ModalHeader>
                <ModalBody>
                    <div className="text-alert">
                        <span className="warning"><WarningRoundedIcon /></span><br></br>
                        ¿Seguro que desea cambiar el estado de la cita a incumplido?
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => cambiarEstado(cita)}
                    > Confirmar</Button>
                    <Button
                        color="danger"
                        onClick={() => setModalIncumplimiento(false)}
                    > Cancelar </Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modalLiberacion}>
                <ModalHeader>
                    <h3>Advertencia</h3>
                </ModalHeader>
                <ModalBody>
                    <div className="text-alert">
                        <span className="warning"><WarningRoundedIcon /></span><br></br>
                        ¿Seguro que desea cambiar el estado de la cita a cumplida?
                        ¡Se liberarán los puntos del cliente!
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => cambiarEstado(cita)}
                    > Confirmar</Button>

                    <Button
                        color="danger"
                        onClick={() => setModalLiberacion(false)}
                    > Cancelar </Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modalProducto}>
                <ModalHeader>
                    <h3>Gasto de Productos</h3>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <label>Nombre</label>
                        <select
                            required
                            className="form-control"
                            name="idProducto"
                            value={idProducto}
                            onChange={onChangeInventario} 
                        >
                            <option>--Seleccione--</option>
                            {productos ? (
                                productos.map(producto => (
                                    <option
                                        key={producto._id}
                                        value={producto._id}
                                    >
                                        {producto.nombre}
                                    </option>
                                )))
                                :
                                null}
                        </select>
                    </FormGroup>
                    <FormGroup>
                        <label>Unidad de Medida</label>
                        <select
                            required
                            className="form-control"
                            name="medida"
                            value={medida}
                            onChange={onChangeInventario} 

                        >
                            <option >--Selecccione--</option>
                            <option value='GR'>GR</option>
                            <option value='Unidad'>Unidad</option>
                        </select>
                    </FormGroup>
                    <FormGroup>
                        <label>Cantidad</label>
                        <input
                            required
                            className="form-control"
                            name="cantidad"
                            value={cantidad}
                            type="number"
                            onChange={onChangeInventario} 

                        />
                    </FormGroup>

                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => actualizarInsumos(gasto)}
                    > Aceptar</Button>

                    <Button
                        color="danger"
                        onClick={() => setModalProducto(false)}
                    > Cancelar </Button>
                </ModalFooter>
            </Modal>
        </Fragment>
    );
}

export default ListadoCitas;