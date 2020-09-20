import React from "react"
import Square from "./Square"


function Grid (props) {

    let Squares = []
    for (let i = 0; i < props.values.length; i++) {
        let square = <Square key={i} value={props.values[i]}/>
        Squares.push(square)
    }

    return (
        <div className="grid">
            {Squares}
        </div>
    )
}


export default Grid