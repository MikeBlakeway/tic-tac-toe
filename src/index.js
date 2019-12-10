import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'


/**
  * CLASS: Square 
  ** renders a single <button> that will act as a cell/square on our board
**/
class Square extends React.Component {

    //! Add a constructor to the class to initialize the state
    constructor(props) {

        super(props)
        /** 
         *? NB: "super(props)"
         *? All component classes that have a constructor should start it with a super(props) call.
        */


        this.state = {
            value: null,
        }
        /** 
        *? NB: "this.state"
        *? components can have state by setting this.state in their constructors.
        *? this.state should be considered as private to a component that it’s defined in.
        */
    }


    //! display the current state’s value when clicked
    render() {

        return (
            <button className="square" onClick={() => this.setState({ value: 'X' })}>
                {this.state.value}
            </button>
            /**
            *? NB: this.setState()
            *? By calling this.setState from an onClick handler in the Square’s render method, we tell React to re-render that Square whenever its < button > is clicked.After the update, the Square’s this.state.value will be 'X'. When you call setState in a component, React automatically updates the child components inside of it too.
            */
        )
    }
}


/**
  * CLASS: Board
  ** renders nine 'Square' components
**/
class Board extends React.Component {
    renderSquare(i) {
        return <Square value={i} />
    }

    render() {
        const status = 'Next player: X'

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        )
    }
}


/**
  * CLASS: Game
  ** renders a 'Board' component alongside additional info about previous 'moves' within the 'game-info' div
**/
class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div >
            </div >
        )
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
)
