import React from "react"


function Score (props) {
    return (
        <div className="score-container">
            <div>score</div>
            <span>{props.score}</span>
        </div>
    )
}


export default Score