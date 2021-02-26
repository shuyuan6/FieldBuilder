import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      choices: [],
      defaultChoice: '',
      newChoice: '',
      label: '',
    }
    
    this.handleDefaultChoiceTextChanged = this.handleDefaultChoiceTextChanged.bind(this);
    this.handleNewChoiceTextChanged = this.handleNewChoiceTextChanged.bind(this);
    this.handleAddChoiceClicked = this.handleAddChoiceClicked.bind(this)
    this.handleAddDefaultChoiceClicked = this.handleAddDefaultChoiceClicked.bind(this)
    this.handleLabelTextChanged = this.handleLabelTextChanged.bind(this)
    this.handleSubmitClicked = this.handleSubmitClicked.bind(this)
  
  }

  handleSubmitClicked(e) {
    console.log(`Submit clicked, data to be sent is ${JSON.stringify(this.state)}`)
  }

  handleLabelTextChanged(e) {
    this.setState(state => {
      return {label: e.target.value}
    })
  }
  
  handleDefaultChoiceTextChanged(e) {
    this.setState(state => {
      return {defaultChoice: e.target.value}
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
    //console.log(this.state)
      
  };

  handleAddDefaultChoiceClicked(e) {
    this.setState(state => {
      if (this.state.choices.includes(this.state.defaultChoice)) {
        console.log(`Trying to add default choice, but choice ${this.state.defaultChoice} already there; will do nothing`)
      } else {
        const next = this.state.choices.concat(this.state.defaultChoice)
        return {choices: next}
      }
    })
};


  render() {
    return (
    <div className="App">
      
      <div className="field-builder-title">
        Field Builder
      </div>
      <form>
      <div className="field-builder-body">
        <label>Label </label>
        <input type="text" value={this.state.label} onChange={this.handleLabelTextChanged}/>
        <br/>
        <br/>

        <label>Type </label>
        <label>multi-select</label>
        <input type="radio" id="multi-select" name="select-type" value="multi-select"/>
        <label>single-select</label>
        <input type="radio" id="single-select" name="select-type" value="single-select"/>
        <br/>
        <br/>

        <label>A Value is Required </label>
        <input type="checkbox" id="value-required" name="vehivalue-required" value="value-required"></input>
        <br/>
        <br/>

        <label>Default Value </label>
        <input value={this.state.defaultChoice} onChange={this.handleDefaultChoiceTextChanged} type="text"/>
        <button type="button" name="add-default-value" onClick={this.handleAddDefaultChoiceClicked}> Add default value</button>
        <br/>
        <br/>

        <label>Choices </label>
        <ul className="choices">
          {this.state.choices.map(e => (
            <li key={e}>{e}</li>
          ))}
        </ul>
        <br/>
        <br/>

        <label >New Choice </label>
        <input value={this.state.newChoice} onChange={this.handleNewChoiceTextChanged} type="text" id="new-choice" name="new-choice"/>
        <button type="button" onClick={this.handleAddChoiceClicked}> Add choice</button>
        <br/>
        <br/>

        <label >Order</label>
        <select name="order" id="order">
          <option value="alphabetical">Display choices in alphabetical order</option>
          <option value="reverse-alphabetical">Display choices in reverse order</option>
          <option value="random">Display choices in random order</option>
        </select>
        <br/><br/>

        <button type="button" name="submit-button" onClick={this.handleSubmitClicked}> Submit</button>
        <p> or </p>
        <button type="button" name="cancel-button"> Cancel</button>

      </div>
      </form>
      
    </div>
    )
  }
}

export default App;
