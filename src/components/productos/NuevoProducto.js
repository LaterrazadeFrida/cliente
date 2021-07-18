import React, { Fragment, useContext, useState } from 'react';
import MenuPrincipal from '../inicio/menuPrincipal';
import ProductoContext from '../../context/productos/productoContext';
import Header from '../layout/Header';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import AppBar from '@material-ui/core/AppBar';
import "bootstrap/dist/css/bootstrap.min.css";
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';



const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiFormLabel-root':
        {
            fontSize: 14,
            marginTop: -10

        }
    },
    appBar: {
        position: 'relative',
    },

    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    formControl: {
        minWidth: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
        width: 265

    },
    text: {
        fontSize: 14,
        marginTop: -10
    }

}));

const NuevoProducto = () => {



    const classes = useStyles();


    const productoContext = useContext(ProductoContext);

    const { errorformulario, agregarProducto, mostrarError, textoAlert } = productoContext;


    const [producto, guardarProducto] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        foto: '',
        disponibles: '',
        estado: ''

    });

    const { nombre, descripcion, precio, disponibles, estado } = producto;


    // Lee los contenidos del input
    const onChangeProducto = evento => {

        //destructure de los valores enviados por el metodo onchange de cada input
        const { name, value } = evento.target;

        //expresion regular que no permite que en campos de texto se escriban numeros
        if (name !== "disponibles" && name !== "precio" && name !== "descripcion") {
            let regex = new RegExp("^[ñíóáéú a-zA-Z ]+$");
            for (let i = 0; i <= value.length - 1; i++) {
                let letra = value[i]
                if (!regex.test(letra) || !letra === " ") {
                    return;
                }
            }
        }

        guardarProducto({
            ...producto,
            [name]: value
        })

    }




    const onSubmitProducto = e => {

        e.preventDefault();

        // Validar  de campos 
        if (nombre === '' || descripcion === '' || precio === null || disponibles === null || estado === '') {
            return;
        }

        if (precio <= 0 || precio > 500000) {
            mostrarError('El valor debe ser mayor a 0 y menor a 200.000$');
            return;
        }

        if (disponibles <= 0 || disponibles > 50) {
            mostrarError("La cantidad de unidades debe ser mayor a 0 y menor a 50")
            return;
        }

        if (estado === '--Selecione--') {
            alert("Ingrese un estado valido")
            return;
        }

        agregarProducto(producto);


        limpiarForm();
        alert('Agregado con exito');


    }

    const limpiarForm = () => {
        guardarProducto({
            nombre: '',
            descripcion: '',
            precio: '',
            foto: '',
            disponibles: '',
            estado: ''

        });

    }


    return (
        <Fragment>
            <AppBar position="absolute" color="default" className={classes.appBar}>
                <Header />
                <MenuPrincipal />
            </AppBar>

            <div className="contenedor-principal">
                <br></br>

                <form
                    onSubmit={onSubmitProducto}
                >

                    <main className={classes.layout}>

                        {errorformulario ?
                            (
                                <Alert severity="error">{textoAlert}</Alert>

                            )
                            : null}


                        <Paper className={classes.paper}>

                            <div className="campos-obligatorios">
                                <h3>Los campos marcados con * son obligatorios</h3>
                            </div>

                            <h1>Nuevo Producto</h1>
                            <hr></hr>
                            <br></br>

                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="nombre"
                                        name="nombre"
                                        label="Nombre"
                                        value={nombre}
                                        className={classes.root}
                                        fullWidth
                                        onChange={onChangeProducto}

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="precio"
                                        name="precio"
                                        label="Precio"
                                        value={precio}
                                        className={classes.root}
                                        fullWidth
                                        onChange={onChangeProducto}

                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl required className={classes.formControl}>
                                        <InputLabel className={classes.text} id="required-label">Unidad de Medida</InputLabel>
                                        <Select
                                            required
                                            labelId="required-label"
                                            id="select-required"
                                            value={estado}
                                            name="estado"
                                            className={classes.selectEmpty}
                                            fullWidth
                                            onChange={onChangeProducto}
                                        >
                                            <MenuItem value='Activo'>Activo</MenuItem>
                                            <MenuItem value='Inactivo'>Inactivo</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="disponibles"
                                        name="disponibles"
                                        label="Cantidad"
                                        value={disponibles}
                                        className={classes.root}
                                        fullWidth
                                        onChange={onChangeProducto}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl required className={classes.formControl}>
                                        <InputLabel className={classes.text} id="required-label">Estado</InputLabel>
                                        <Select
                                            required
                                            labelId="required-label"
                                            id="select-required"
                                            value={estado}
                                            name="estado"
                                            className={classes.selectEmpty}
                                            fullWidth
                                            onChange={onChangeProducto}
                                        >
                                            <MenuItem value='Activo'>Activo</MenuItem>
                                            <MenuItem value='Inactivo'>Inactivo</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <div className={classes.buttons}>

                                <Button className={classes.button}
                                    onClick={() => limpiarForm()}>
                                    Limpiar  </Button>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                >Registrar </Button>
                            </div>

                        </Paper>

                    </main>

                </form>
            </div>
        </Fragment>


    );




}

export default NuevoProducto;