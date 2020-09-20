import React from "react"


function Score (props) {
    return (
        <div className="score-container">
            <div className="score-title">score</div>
            <span id="score">{props.score}</span>
        </div>
    )
}


export default Score