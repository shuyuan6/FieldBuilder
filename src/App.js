import logo from './logo.svg';
import React from 'react';
import "./App.css";
//import styles from "./App.css";
const initialState = {
  choices: [],
  defaultChoice: '',
  newChoice: '',
  label: '',
  valueRequired: false,
  type: '',
  order: '',
}


class App extends React.Component {

  
  constructor(props) {
    super(props)
    this.state = Object.assign({}, initialState);
    
    this.handleNewChoiceTextChanged = this.handleNewChoiceTextChanged.bind(this);
    this.handleAddChoiceClicked = this.handleAddChoiceClicked.bind(this)
    this.handleLabelTextChanged = this.handleLabelTextChanged.bind(this)
    this.handleSubmitClicked = this.handleSubmitClicked.bind(this)
    this.handleCancelClicked = this.handleCancelClicked.bind(this)
    this.handleValueRequiredChecked = this.handleValueRequiredChecked.bind(this)
    this.handleTypeSelected = this.handleTypeSelected.bind(this)
    this.handleOrderChange = this.handleOrderChange.bind(this)
    this.handleDeleteChoiceClicked = this.handleDeleteChoiceClicked.bind(this)
    this.handleSetDefaultChoiceClicked = this.handleSetDefaultChoiceClicked.bind(this)
    
  }

  async sendPostRequest(input) {
    // POST request using fetch with async/await
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
    };
    const response = await fetch('http://www.mocky.io/v2/566061f21200008e3aabd919', requestOptions);
    const data = await response.json();
    return data
}

  handleSetDefaultChoiceClicked(e, item) {
    console.log(`Delte Choice clicked for [${item}] ${typeof(item)}`)
    this.setState(state=>{
      return {defaultChoice: item}
    })
  }

  handleDeleteChoiceClicked(e, item) {
    const toBeDeletedChoice = item
    console.log(`Delete Choice clicked for [${toBeDeletedChoice}] ${typeof(toBeDeletedChoice)}`)
    var array = [...this.state.choices];
    var index = array.indexOf(toBeDeletedChoice)

    // We may also need to clear the default choice 
    const newDefaultChoice = item === this.state.defaultChoice ? '' : this.state.defaultChoice
    
    if (index !== -1) {
      array.splice(index, 1);
      this.setState(state => {
        return {choices: array, defaultChoice: newDefaultChoice}
      })
    }
  }

  handleOrderChange(e) {
    console.log("Order changed!")
    this.setState(state => {
      return {order: e.target.value}
    })

    //this.setState({ order: e.target.value });
  }

  handleTypeSelected(e) {
    const { name, value } = e.target;
    console.log("Radio button selected")
    this.setState(state => {
      return {type: value}
    })
  }

  handleValueRequiredChecked(e) {
    var checked = e.target.checked;
    console.log("Checked: " + checked)
    this.setState(state => {
      return {valueRequired: checked}
    })
  }

  handleCancelClicked(e) {
    console.log('Cancel clicked. Clearing all fields')
    this.setState(state => {
      return Object.assign({}, initialState);
    })
  }

  async handleSubmitClicked(e) {
    var toSend = Object.assign({}, this.state);
    delete toSend['newChoice'];
    console.log(`Submit clicked, data to be sent is ${JSON.stringify(toSend)}`)
    const ret = await this.sendPostRequest(toSend)
    console.log(`Get response back ${JSON.stringify(ret)}`)

  }

  handleLabelTextChanged(e) {
    this.setState(state => {
      return {label: e.target.value}
    })
  }


  handleNewChoiceTextChanged(e) {
    this.setState(state => {
      return {newChoice: e.target.value}
    })
  }

  handleAddChoiceClicked(e) {
    this.setState(state => {
      if (this.state.choices.includes(this.state.newChoice)) {
        console.log(`Choice ${this.state.newChoice} already there; will do nothing`)
      } else {
        const next = this.state.choices.concat(this.state.newChoice)
        return {choices: next}
      }
      
    })      
  };
  /*
<label className='column'>Label </label>
          <input className='column' type="text" value={this.state.label} onChange={this.handleLabelTextChanged}/>
          */
  render() {
    return (
    <div className='container'>
      
      <div className='fieldBuilder'>
        Field Builder
      </div>
      <br/>
      
      <div className='content'>
        <div className='row'>
          <label className='leftColumn'> Label </label>
          <input className='rightColumn' type="text" value={this.state.label} onChange={this.handleLabelTextChanged}/>
        </div>

        <div className='row'>
          <label className='leftColumn'>Type </label>
          <div className='rightColumn' onChange={this.handleTypeSelected}>
            <label>multi-select</label>
            <input type="radio" id="multi-select" name="select-type" value="multi-select"/>
            <label>single-select</label>
            <input type="radio" id="single-select" name="select-type" value="single-select"/>
          </div>
        </div>

        <div className='row'>
          <label className='leftColumn'>A Value is Required </label>
          <input type="checkbox" id="value-required" onChange={this.handleValueRequiredChecked} checked={this.state.valueRequired}></input>
        </div>
        
        <div className='row'>
          <label className='leftColumn'>Choices</label>
          <ul className='rightColumn' className='choices'>
            {this.state.choices.map(item => 
              this.state.defaultChoice === item ? 
                
                <li key={item}>
                  <button className='inner' value={item} onClick={e => this.handleDeleteChoiceClicked(e, item)} className="clickChoiceBox">delete</button> 
                  <button className='inner' value={item} onClick={e => this.handleSetDefaultChoiceClicked(e, item)} className="clickChoiceBox">set as default</button> 
                  <p className='inner'><b> {item}</b></p> 
                </li>
                
              : <li key={item}>
                  <button className='inner' value={item} onClick={e => this.handleDeleteChoiceClicked(e, item)} className="clickChoiceBox"> delete</button>
                  <button className='inner' value={item} onClick={e => this.handleSetDefaultChoiceClicked(e, item)} className="clickChoiceBox">set as default</button> 
                  <p className='inner'> {item} </p> 
                </li>
            )}
          </ul>
        </div>
        <br/>

        <div className='row'>
          <label className='leftColumn' >New Choice </label>
          <div className='rightColumn'>
            <input className='newChoiceTextField' value={this.state.newChoice} onChange={this.handleNewChoiceTextChanged} type="text"/>
            <button className='addChoiceButton' type="button" onClick={this.handleAddChoiceClicked}> Add choice</button>
          </div>
        </div>

        <div className='row'>
          <label className='leftColumn'>Order</label>
          <select className='rightColumn' onChange={this.handleOrderChange}>
            <option value="alphabetical">Display choices in alphabetical order</option>
            <option value="reverse-alphabetical">Display choices in reverse order</option>
            <option value="random">Display choices in random order</option>
          </select>
        </div>

        <br/><br/>
        <div className='row' >
          <center>
            <button className='submissonButton' type="button" name="submit-button" onClick={this.handleSubmitClicked}> Submit</button>
            <p className='inner'> or </p>
            <button className='cancelButton' type="button" name="cancel-button" onClick={this.handleCancelClicked}> Cancel</button>
          </center>
        </div>
      </div>
     
      
    </div>
    )
  }
}

export default App;
