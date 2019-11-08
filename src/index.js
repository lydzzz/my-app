import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {//class组件
// constructor(props) {
//     super(props);
//     this.state = {
//         value: null,
//     }
// }
/*
constructor方法是一个特殊的方法，这种方法用于创建和初始化一个由class创建的对象。一个类只能拥有一个名为 “constructor”的特殊方法。
如果类包含多个constructor的方法，则将抛出 一个SyntaxError 。
一个构造函数可以使用 super 关键字来调用一个父类的构造函数。
 */
// render() {
// return (
//   { <button
//     className="square"
//   onClick={() => this.props.onClick()}>
// {this.props.value}
// </button> 
// );
// }
//} }
function Square(props) {//函数组件
    return (
        <button className='square' onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        }
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if(calculateWinner(squares) || squares[i]){
            return;
        }
        squares[i] = this.state.xIsNext ? 'O' : 'X';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    renderSquare(i) {
        return (<Square
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
        />);
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner：' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'O' : 'X');//const定义的变量不可以修改，而且必须初始化，只能在块作用域里访问，而且不能修改
        }
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
        );
    }
}



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
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];//解构赋值
        //使用 逻辑运算符(或、与) 返回的值都是你运算时用的值，逻辑运算符 运算后的结果不会自动转换成布尔值。
        //平常在if() 语句中, 只不过if括号中的值 会自动转换为布尔值。
        //squares[a] && squares[a] === squares[b] && squares[b] === squares[c]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}