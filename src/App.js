import './App.css';
import React from 'react';



class Display extends React.Component {
	// eslint-disable-next-line no-useless-constructor
	constructor(props) {
		super(props);
	}
	
	render() {
		return(
			<div id="displayContainer" className="col-12">
				<h5 id="formulaDisplay">{this.props.currentExpression}</h5>
				<h4 id="display">{this.props.currentNumber}</h4>					
			</div>
		);
	}	
}

function Numbers(props) {
	return(
		<button id={props.id} className="pad numbers col-3" value={props.number} onClick={() => props.handleClick(props.number)}>{props.number}</button>
	);
}

function Operators(props) {
	return(
		<button id={props.id} className="pad operator col-3" value={props.operator} onClick={() => props.handleOperator(props.operator)}>{props.operator}</button>
	);
}

function Decimal(props) {
	return(
		<button id={props.id} className="pad numbers col-3" value={props.operator} onClick={() => props.handleDecimal(props.operator)}>{props.operator}</button>
	);
}

function Clear(props) {
	return(
		<button id={props.id} className="pad special-btn col-6" value={props.clear} onClick={() => props.handleClear()}>{props.clear}</button>
	);
}

function Zero(props) {
	return (
		<button id={props.id} className="pad numbers col-6" value={props.number} onClick={() => props.handleClick(props.number)}>{props.number}</button>
	);
}

function Equals(props) {
	return (
		<button id={props.id} className="pad special-btn col-3" value={props.number} onClick={() => props.handleResult()}>{props.number}</button>
	);
}

class Pad extends React.Component {
	constructor(props) {
		super(props);
		console.log(props);
	}
	
	render() {
		return(
			<>
			<Clear 
				id="clear"
				clear="AC"
				handleClear={this.props.handleClear}
			/>
			<Operators 
				id="percent"
				operator="%"
				handleOperator={this.props.handleOperator}
			/>
			<Operators 
				id="divide"
				operator="/"
				handleOperator={this.props.handleOperator}
			/>
			<Numbers 
				id="seven"
				number="7"
				handleClick={this.props.handleClick}
			/>
			<Numbers 
				id="eight"
				number="8"
				handleClick={this.props.handleClick}
			/>
			<Numbers 
				id="nine"
				number="9"
				handleClick={this.props.handleClick}
			/>
			<Operators 
				id="multiply"
				operator="X"
				handleOperator={this.props.handleOperator}
			/>
			<Numbers 
				id="four"
				number="4"
				handleClick={this.props.handleClick}
			/>
			<Numbers 
				id="five"
				number="5"
				handleClick={this.props.handleClick}
			/>
			<Numbers 
				id="six"
				number="6"
				handleClick={this.props.handleClick}
			/>
			<Operators 
				id="subtract"
				operator="-"
				handleOperator={this.props.handleOperator}
			/>
			<Numbers 
				id="one"
				number="1"
				handleClick={this.props.handleClick}
			/>
			<Numbers 
				id="two"
				number="2"
				handleClick={this.props.handleClick}
			/>
			<Numbers 
				id="three"
				number="3"
				handleClick={this.props.handleClick}
			/>
			<Operators 
				id="add"
				operator="+"
				handleOperator={this.props.handleOperator}
			/>
			<Zero 
				id="zero"	
				number="0"
				handleClick={this.props.handleClick}
			/>
			<Decimal 
				id="decimal"
				operator="."				
				handleDecimal={this.props.handleDecimal}
			/>
			<Equals
				id="equals"
				handleResult={this.props.handleResult}
				number="="
				/>
			</>
		)
	}
}

class App extends React.Component {	
	
	constructor(props) {
		super(props);
		this.state = {
			currentNumber: "0",
			currentExpression: "0",
			result: 0
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleClear = this.handleClear.bind(this);
		this.handleOperator = this.handleOperator.bind(this);
		this.handleDecimal = this.handleDecimal.bind(this);
		this.handleResult = this.handleResult.bind(this);
	}	
	
	handleClick(e) {		
		this.setState({
			currentNumber: 
			((/^[X%\/+]$/).test(this.state.currentNumber) || this.state.currentNumber == 0)?
				e : this.state.currentNumber.concat(e),
			
			currentExpression: 
			((/^[X%*\/+]$/).test(this.state.currentExpression) || this.state.currentExpression == 0) ?
			e	: this.state.currentExpression.concat(e)
		});
	}
	
	handleOperator(e) {
		this.setState({
			currentNumber: e,			
			currentExpression: ((/[%X\/+-]$/).test(this.state.currentExpression) && e !== "-")? 
			this.state.currentExpression.replace(/[%X\/+-]+$/, e) : this.state.currentExpression.concat(e).replace(/^0/, "")
		});
	}
	
	handleDecimal(e) {
		this.setState({
			currentNumber: ((/\./).test(this.state.currentNumber))?
			this.state.currentNumber : ((this.state.currentNumber == 0) ? e : this.state.currentNumber.concat(e)),
			
			currentExpression: ((/\./).test(this.state.currentNumber))?
			this.state.currentNumber :  ((this.state.currentExpression == 0) ? e : this.state.currentExpression.concat(e))
		});
	}
	
	handleClear() {
		this.setState({
			currentNumber: "0",
			currentExpression: "0"
		});
	}
	
	handleResult() {
		this.setState({
			currentNumber: eval(this.state.currentExpression.replace(/X/g, '*').replace(/%/g, "/100").replace(/[\/*-+]$/,"")).toString(),
			currentExpression: eval(this.state.currentExpression.replace(/X/g, '*').replace(/%/g, "/100").replace(/[\/*-+]$/,"")).toString()
		});
	}	
	
	render() {
		return(
			<div id="container" className="d-flex">
				<div id="title">
					<h4>a calculator</h4>						
					<a id="contact" href="github.com/barbaraaliverti">by baloobali</a>
				</div>
				<div id="calculator" className="row d-flex">
					<Display
						currentExpression={this.state.currentExpression}
						currentNumber={this.state.currentNumber}
					/>
					<Pad 
						handleClick={this.handleClick}
						handleClear={this.handleClear}
						handleOperator={this.handleOperator}
						handleDecimal={this.handleDecimal}
						handleResult={this.handleResult}
					/>
				</div>
			</div>
		);
	}	
}

export default App;
