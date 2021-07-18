import React, {useContext, useEffect} from 'react';
import MenuPrincipal from '../inicio/menuPrincipal';
import AppBar from '@material-ui/core/AppBar';
import Header from '../layout/Header';
import { makeStyles } from '@material-ui/core/styles';
import ListadoCitas from './ListadoCitas';
import ListadoCitasEmpl from './ListadoCitasEmpl';
import AuthContext from '../../context/autenticacion/authContext';


const useStyles = makeStyles((theme) => ({

    appBar: {
        position: 'relative',
    }

}));

const Citas = () => {

    const classes = useStyles();
    const authContext = useContext(AuthContext);
    const { usuarioAutenticado, usuario } = authContext;


    useEffect(() => {

        usuarioAutenticado();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="seccion-principal">
            <AppBar position="absolute" color="default" className={classes.appBar}>
                <Header />
                <MenuPrincipal />
            </AppBar>

            <div className="contenedor-principal">
                <main>
                    <br></br>
                    {usuario?.rol !== '604e9ebe6e69f62dc4e181b6' ? 
                    ( <ListadoCitas />  ) : <ListadoCitasEmpl />}

                </main>
            </div>
        </div>
    );
}

export default Citas;