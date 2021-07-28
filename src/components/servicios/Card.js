import React from 'react'
import { Fragment } from 'react';
import '../../index.css'

function Card({title, imageURL, text, time, url}){
    return(
        <Fragment>
        <div className="card text-center">
            {/* <div className="overflow-imagen">
                <img className="img-Card card-img-top" src = {imageURL} alt=""></img>
            </div> */}
            <div className = "card-body text-dark">
                <h4 className = "card-title">{title}</h4>
                <p className = "card-text text-secondary">{text}</p>
                <span className="body-Card-text">{time}</span><span className="text-time"> Minutos</span><br></br>
                <span className="subtext-time">El precio y tiempo pueden variar</span>
                <a href={url} className="link-servicio btn btn-outline-secondary">
                    Contáctanos para mayor información
                </a>
                
            </div>
        </div>
        </Fragment >
    )
}
export default Card