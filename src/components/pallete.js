import React, {  useState } from 'react'
import colors from '../styles'

const Pallete = (props) => {
    const [showc, handleShow] = useState(false)
    const handleDisplayPalette = (event) => {
            handleShow(true);
    }
    const handleHidePalette = (event) => {
        handleShow(false);
    }
    const handleColor = (event) => {
        props.changeColor(event.target.id);
    }

    return(
        <div onMouseOver = {handleDisplayPalette} onMouseOut = {handleHidePalette} className = { props.show || showc ?  'pallete show' :  'pallete hide'} >
            
                <div className = { props.show || showc ? 'wrapper row' : 'hide'}>
                        {colors.map( (x,index) => {
                            
                            return(
                                <div className = 'col-3' key = {index}>
                                    <button  id = {x.colorname}onClick = {handleColor} className = 'color--palette palette--btn' style={{backgroundColor : x.colorcode}}></button>
                                </div>
                            )
                        }) } 
                </div>
        </div>
    )
}

export default Pallete