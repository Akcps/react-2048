import React from "react"
import Score from "./Score"
import Result from "./Result"
import Grid from "./Grid"


function Container (props) {

    return (
        <div className="container">
            <div className="container-header">
                <h1>2048</h1>
                <Score score={props.score}/>
            </div>
            <Result result={props.result}/>
            <Grid values={props.gridValues}/>
        </div>
    )
}


export default Container