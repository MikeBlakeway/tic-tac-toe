import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'


/** FUNCTION: SQUARE
 * @function
 * Name: Square
 * ? a function component that renders a <button> element, which represents a single square on our board
 * 
 * @property
 * Name: 'value'
 * * this prop is a string equal to one position of the array 'squares', defined on the parent class 'Board' within state.
 *
 * @property
 * Name: 'onClick()'
 * * this prop is a function passed down to the Square component that will be called when clicked.
 * ? As state is considered to be private to a component that defines it, we cannot update the Board’s state       directly from here in the Square function. Instead, this function is passed in from the parent component via props.
 * -----------------------------------------------------------
**/
function Square(props) {

    return (

        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    )
}
/** What is happening here?
 *! when a Square is clicked, the 'onClick' function provided by the Board is called. Here’s a review of how this is achieved:
 *? 1. The 'onClick' property on the built-in DOM <button> component tells React to set up a click event listener.
 *? 2. When the button is clicked, React will call the 'onClick' event handler.
 *? 3. The Square’s onClick prop was specified by its parent class 'Board'.
 *? 4. Since the 'Board' parent class has passed down "onClick={() => this.handleClick(i)}" to Square, the click event will now indirectly call the parent's 'handleClick' method when fired.
**/


/** CLASS: BOARD 
 * @class
 * Name: Board
 * ? renders nine 'Square' components
 * -----------------------------------------------------------
**/
class Board extends React.Component {

    /** METHOD: RENDERSQUARE
     * @method
     * Name: renderSquare()
     * * returns one 'Square' component and passes two properties named 'value' and 'handleClick'
     * 
     * @property
     * Name: 'value'
     * ? this prop is a string equal to one position of the array 'squares', defined above in this.state.
     * 
     * @property
     * Name: 'onClick()'
     * * this prop is a function passed down to the Square component that can be called when clicked.
     * ? As state is considered to be private to a component that defines it, we cannot update the Board’s state       directly from Square. Instead, we pass down this function for Square to call in the form of a prop.
     * -----------------------------------------------------------
    **/
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[ i ]} // @prop name 'value'
                onClick={() => this.props.onClick(i)} // @prop name 'onClick'
            />
        )
    }

    render() {
        return (
            <div>
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
            /** THIS.RENDERSQUARE(i)
             * ? calls the renderSquare method of 'this' parent class (see @class 'Board').
             * this method requires one parameter 'i', which is ultimately translated into the prop 'value'.
             * -----------------------------------------------------------
            **/
        )
    }
}


/** CLASS: GAME
 * @class
 * Name: Game
 * ? renders a 'Board' component alongside additional info about previous 'moves' within the 'game-info' div
 * -----------------------------------------------------------
**/
class Game extends React.Component {

    // add a constructor to the class to initialize the state
    constructor(props) {

        // all component classes that have a constructor should start it with a super(props) call.
        super(props)

        /** STATE
         * history: an array of objects that correspond to the state of the board after each move
         * squares: an array of 9 'null' values corresponding to 9 squares on the board
         * xIsNext: a boolean used to track which player goes next
            * ? We set the first move to be “X” by default.
         * -----------------------------------------------------------
        **/
        this.state = {
            history: [ {
                squares: Array(9).fill(null),
            } ],
            xIsNext: true,
        }
    }

    /** METHOD: HANDLECLICK
     * @method
     * Name: handleClick()
     * ? ...
     *
     * @property
     * Name: '...'
     * ? ...
     * -----------------------------------------------------------
    **/
    handleClick(i) {

        const history = this.state.history

        // get the most recent board from our history
        const current = history[ history.length - 1 ]

        // we call .slice() to create a copy of the squares array to modify instead of modifying the existing array
        const squares = current.squares.slice()

        // a conditional to check if a player has already won the game. If 'True' then the method will return early.
        if (calculateWinner(squares) || squares[ i ]) {
            return
        }

        // determine whether this player is 'X' or 'O' by checking if the value of xIsNext is either true or false. If true, then we are player 'X' and if false then we are player 'O'. 
        squares[ i ] = this.state.xIsNext ? 'X' : 'O'

        // add the new 'squares' array to the state history
        // flip the value of xIsNext to the opposite of what is currently in state
        this.setState({
            history: history.concat([ {
                squares: squares,
            } ]),
            xIsNext: !this.state.xIsNext,
        })
        /** concat()
         * NB: unlike the array push() method, the concat() method doesn’t mutate the original array so is preferrable to maintain immutability
        */
    }

    render() {
        const history = this.state.history
        const current = history[ history.length - 1 ]
        const winner = calculateWinner(current.squares)

        let status
        if (winner) {
            status = 'Winner: ' + winner
        }
        else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
        }


        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        )
    }
}


/** RENDER (CLASS)
 * @class
 * Name: render
 * ? renders a 'Game' component to the ReactDOM instance
 * -----------------------------------------------------------
**/
ReactDOM.render(
    <Game />,
    document.getElementById('root')
)


function calculateWinner(squares) {


    const lines = [
        [ 0, 1, 2 ],
        [ 3, 4, 5 ],
        [ 6, 7, 8 ],
        [ 0, 3, 6 ],
        [ 1, 4, 7 ],
        [ 2, 5, 8 ],
        [ 0, 4, 8 ],
        [ 2, 4, 6 ],
    ]
    /** What's happening here?
     * 
     * Lines:
     * @constant
     * * an array that holds a set of arrays, corresponding to each winning combination of squares (a winning line)
     * ? Each value within the internal arrays represents a single square on the board
     * ? They are listed 0 - 8 going from left to right, top to bottom to create 9 squares over 3 lines:
     *
     * ?        0   1   2
     * ?        3   4   5
     * ?        6   7   8
     *
    */

    // loop over the array of line arrays starting with the first [0]...
    for (let i = 0; i < lines.length; i++) {

        // ...assign each value of the lines[i] array to a corresponding array with values [a, b or c]...
        const [ a, b, c ] = lines[ i ]

        // ...then check if the values of our corresponding squares array (passed in as a parameter: squares) are the same...
        if (squares[ a ] && squares[ a ] === squares[ b ] && squares[ a ] === squares[ c ]) {

            // if so then return the value
            return squares[ a ]
        }
        /** What's happening here?
         * 
         * * Type Coercion
         * ? We are using type coercion to evaluate whether we have a winning combination. The above conditional evaluates to either true or false. Here's a wining example using all 'X' values accross the first line of our board:
         * 
         * *    1. if squares[0] (a string 'X') is the same as squares[0] (the same string)
         * ?    gives us a 'truthy' back. We'll call it 't' for truthy here...
         *          ! let t = squares[0] AND squares[0]
         *          or
         *          let t = 'X' AND 'X'
         *          t is a truthy value equal to 'X'
         * 
         * *    2. if 't' is the same as the result of squares[0] ('X') AND squares[1] (also 'X')
         * ?    gives us a 'truthy' back. We'll call it 'n' for 'next'...
         *          ! let n = t === squares[1] AND squares[0]
         *          or
         *          let n = 'X' === 'X' AND 'X' (truthy)
         *          n is also a truthy value equal to 'X'
         * 
         * *    3. if 'n' is the same as squares[2]
         * ?    evaluates to True. Let's call it 'r' for result.
         *          ! let r = n === squares[2]
         *          or
         *          let r = 'X' === 'X'
         *          r is True
         * 
         * *    4. return a value if True
         * ?    as our conditional has evaluated to True, we return the value of squares[a] 
         *          ! return squares[ a ]
         *          becomes
         *          return 'X'
         * 
         * *    5. In a nutshell...
         * ?    Let's run the whole thing one last time substituting in the values of each:
         *          ! squares[0] AND squares[0] === squares[1] AND squares[0] === squares[2]
         *          becomes
         *          'X' AND 'X' === 'X' AND 'X' === 'X'
         *          evaluates to 'True' so our conditional has passed
         *          and we can return the value of 'X'
         *
        */
    }
    return null
}
