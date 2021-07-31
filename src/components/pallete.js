import React, {  useState } from 'react'
import colors from '../styles'

const Palette = (props) => {
    const [showPalette, handleShow] = useState(false)
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
        <div onMouseOver = {handleDisplayPalette} onMouseOut = {handleHidePalette} className = { props.show || showPalette ?  'palette palette--show' :  'palette palette--hide'} > 
                <div className = { props.show || showPalette ? 'palette__wrapper row' : 'palette--hide'}>
                        {colors.map( (x,index) => {
                            return(
                                <div className = 'col-3' key = {index}>
                                    <button  id = {x.colorname}onClick = {handleColor} className = 'palette__btn' style={{backgroundColor : x.colorcode}}></button>
                                </div>
                            )
                        })} 
                </div>
        </div>
    )
}

export default Palette