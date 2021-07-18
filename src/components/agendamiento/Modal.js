import React, { useContext, useState, useEffect } from 'react';
import AgendamientoContext from '../../context/agendamiento/agendamientoContext';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Modal from 'react-modal';
import EmpleadoContext from '../../context/empleados/empleadoContext';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Card from "react-bootstrap/Card";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Alert from '@material-ui/lab/Alert';
import {
    Button,
    ModalHeader,
    ModalFooter,
} from "reactstrap";
import MostrarAgenda from './MostrarAgenda';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(18),
        fontWeight: theme.typography.fontWeightRegular,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
        width: 105

    },
    formControl: {
        minWidth: 200,

    },
    text: {
        fontSize: 14,
        marginTop: -10

    },
    textFecha: {
        fontSize: 14,
        marginTop: -2
    },
    textField: {
        marginRight: theme.spacing(1),
        fontSize: 14,
    },
    card: {
        width: 140,
        height: 230
    }

}));

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};


const Modales = () => {

    const classes = useStyles();

    const empleadoContext = useContext(EmpleadoContext);
    const agendamientoContext = useContext(AgendamientoContext);

    const { abrirModal, CerrarModal, obtenerEstados, usuarioConfirmado,
        servicioSeleccionado, guardarAgendamiento, mensajeConfirmación,
        consultarAgendamiento, modalError, mensajeError, limpiarAlert,
        eliminarSeleccion, estados, mostrarError, textoAlert, errorformulario } = agendamientoContext;

    const { empleados, obtenerEmpleados } = empleadoContext;

    const [modalActualizar, setModalActualizar] = useState(false);

    const [cita, guardarCita] = useState({
        docCliente: '',
        Servicio: '',
        docEmpleado: '',
        horaInicio: new Date(),
        horaFin: new Date(),
        costo: '',
        Estado: ''
    });

    const { docEmpleado, horaInicio, horaFin } = cita;

    // Obtener proyectos cuando carga el componente
    useEffect(() => {
        // si hay un error
        if (abrirModal) {
            setModalActualizar(abrirModal);
        }
        obtenerEmpleados();
        obtenerEstados();
        // eslint-disable-next-line
    }, [abrirModal]);

    const cerrarModalActualizar = () => {
        CerrarModal(false);

    }


    const eliminarServicio = servicio => {
        eliminarSeleccion(servicio._id);

    }


    const onChange = evento => {
        const { name, value } = evento.target;

        guardarCita({
            ...cita,
            [name]: value
        })

        limpiarAlert();

    }

    const consultar = () => {

        if (docEmpleado === '') {
            mostrarError('SELECCIONE UN EMPLEADO');
            return;
        }
        if (horaInicio === '') {
            mostrarError('SELECCIONE UN DÍA DE LA SEMANA');
            return;
        }

        let consulta = ({
            doc: docEmpleado,
            fecha: horaInicio
        });

        consultarAgendamiento(consulta);
    };


    const onSubmit = e => {
        e.preventDefault();

        if (usuarioConfirmado === null) {
            return;
        }

        if (servicioSeleccionado === null) {
            return;
        }

        if (Date.parse(horaInicio) >= Date.parse(horaFin)) {
            mostrarError('LA HORA FINAL DEBE SER MAYOR A LA HORA INICIAL');
            return;
        }

        if (Date.parse(horaInicio) < Date.now()) {
            mostrarError('NO PUEDE AGENDAR EN FECHAS PASADAS');
            return;
        }

        let estado = estados.filter(estado => estado.nombreEstado === 'Pendiente')
        cita.costo = servicioSeleccionado.precio;
        cita.docCliente = usuarioConfirmado.documento;
        cita.Servicio = servicioSeleccionado.nombre;
        cita.Estado = estado[0].nombreEstado;
        console.log(cita);

        guardarAgendamiento(cita);

        LimpiarForm();

    }

    const LimpiarForm = () => {
        guardarCita({
            docCliente: '',
            Servicio: '',
            docEmpleado: Number,
            horaInicio: new Date(),
            horaFin: new Date(),
            costo: ''
        });
    }
    return (

        <Modal
            style={customStyles}
            isOpen={abrirModal}
        >
            <ModalHeader>
                <div className="header-modal">
                    <h3>Agenda</h3>
                    <div className="header-seleccion">
                        {usuarioConfirmado ? (
                            <h2>{usuarioConfirmado.nombres}</h2>
                        ) : <Alert severity="error">NO HAY CLIENTE SELECCIONADO</Alert>}

                        {mensajeConfirmación ? (
                            <Alert severity="success">{mensajeConfirmación}</Alert>
                        ) : null}

                        {modalError ? (
                            <Alert severity="error">{mensajeError?.msg}</Alert>
                        ) : null}

                        {errorformulario ? (
                            <Alert severity="error">{textoAlert}</Alert>
                        ) : null}
                    </div>
                </div>
            </ModalHeader>
            <form
                onSubmit={onSubmit}
            >
                <div className={classes.root}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading}>1. Selecciona el Profesional</Typography>

                        </AccordionSummary>
                        <AccordionDetails>
                            {servicioSeleccionado ? (
                                <Card
                                    className={classes.card}
                                    key={servicioSeleccionado._id}>
                                    <Card.Body>
                                        <Card.Title>{servicioSeleccionado.nombre}
                                            <hr></hr>
                                            {`$ ${servicioSeleccionado.precio}`}{'  |  '}
                                            <AccessTimeIcon />
                                            {servicioSeleccionado.duracion}<br></br>
                                        </Card.Title>
                                        <Grid item xs={12} sm={6}>
                                            <FormControl required className={classes.formControl}>
                                                <Select
                                                    required
                                                    type="number"
                                                    labelId="required-label"
                                                    id="select-required"
                                                    name="docEmpleado"
                                                    value={docEmpleado}
                                                    className={classes.selectEmpty}
                                                    fullWidth
                                                    onChange={onChange}
                                                >
                                                    {empleados ? (
                                                        empleados.map(empleado => (
                                                            <MenuItem
                                                                key={empleado._id}
                                                                value={empleado.documento}
                                                            >
                                                                {empleado.nombres}
                                                            </MenuItem>
                                                        )))
                                                        :
                                                        null}
                                                </Select>
                                            </FormControl>
                                            <button className="btn btn-danger"
                                                onClick={() => eliminarServicio(servicioSeleccionado)}
                                            ><HighlightOffIcon /></button>
                                        </Grid>
                                    </Card.Body>
                                    <Card.Footer>
                                    </Card.Footer>
                                </Card>

                            ) : null}

                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography className={classes.heading}>2. Selecciona el Horario</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={4}>
                                    <InputLabel className={classes.textFecha} id="required-label">Hora Inicial</InputLabel>
                                    <TextField
                                        required
                                        id="time"
                                        type="datetime-local"
                                        name="horaInicio"
                                        value={horaInicio}
                                        fullWidth
                                        className={classes.textField}
                                        onChange={onChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <InputLabel className={classes.textFecha} id="required-label">Hora Final</InputLabel>
                                    <TextField
                                        required
                                        id="time"
                                        type="datetime-local"
                                        fullWidth
                                        name="horaFin"
                                        value={horaFin}
                                        className={classes.textField}
                                        onChange={onChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <MostrarAgenda />
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </div>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => consultar()}
                    >Ver Citas</Button>
                    <Button
                        type="submit"
                        color="info">Agendar</Button>
                    <Button
                        color="danger"
                        onClick={() => cerrarModalActualizar()}
                    > Cancelar </Button>
                </ModalFooter>

            </form>
        </Modal>
    );
}

export default Modales;