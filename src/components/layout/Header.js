import React, { Fragment, useEffect, useContext } from 'react';
import AuthContext from '../../context/autenticacion/authContext';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link } from 'react-router-dom';
import SettingsIcon from '@material-ui/icons/Settings';


const Header = () => {

    const authContext = useContext(AuthContext);

    const { usuario, usuarioAutenticado, cerrarSesion, token } = authContext;



    const renderTooltip = props => (
        <Tooltip {...props}>Iniciar Sesión</Tooltip>
    );

    const renderTooltipTwo = props => (
        <Tooltip {...props}>Cerrar Sesión</Tooltip>
    );

    useEffect(() => {

        usuarioAutenticado();
        // eslint-disable-next-line
    }, []);



    return (
        <Fragment>
            <div className="header-segundario">
                <ul>
                    <li>
                        <h2 className="slogan">UN ESPACIO DONDE ESPERAR SE VUELVE UN SUEÑO</h2>
                    </li>
                    <div className="derecha">
                        {usuario ?
                            (<li >
                                <Link className="btn-cerrar" to="/nueva-pregunta"><SettingsIcon /></Link>
                            </li>)
                            :
                            null}
                        <li>
                            {usuario ?
                                (<OverlayTrigger placement="left-start" overlay={renderTooltipTwo}>
                                    <button
                                        className="btn-cerrar"
                                        onClick={() => cerrarSesion()}
                                    ><LockOutlinedIcon /></button>
                                </OverlayTrigger>)
                                :
                                (<OverlayTrigger placement="bottom-end" overlay={renderTooltip}>
                                    <Link className="btn-cerrar" to="/iniciar-sesion"><LockOpenIcon /></Link>
                                </OverlayTrigger>)
                            }
                        </li>
                        {usuario ? (
                            <li >
                                {usuario ? <p className="nombre-usuario menos-ancho" >Bienvenid@  <span>{usuario?.nombres} </span> </p> : null}
                            </li>
                        ) : null}
                    </div>
                </ul>
            </div>
        </Fragment>
    );
}

export default Header;