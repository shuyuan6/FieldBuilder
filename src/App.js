import logo from './logo.svg';
import './App.css';
import React from 'react';


class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      choices: [],
      defaultChoice: '',
      newChoice: '',
      label: '',
      valueRequired: false,
      type: '',
      ordera: '',
    }
    
    this.handleDefaultChoiceTextChanged = this.handleDefaultChoiceTextChanged.bind(this);
    this.handleNewChoiceTextChanged = this.handleNewChoiceTextChanged.bind(this);
    this.handleAddChoiceClicked = this.handleAddChoiceClicked.bind(this)
    this.handleAddDefaultChoiceClicked = this.handleAddDefaultChoiceClicked.bind(this)
    this.handleLabelTextChanged = this.handleLabelTextChanged.bind(this)
    this.handleSubmitClicked = this.handleSubmitClicked.bind(this)
    this.handleCancelClicked = this.handleCancelClicked.bind(this)
    this.handleValueRequiredChecked = this.handleValueRequiredChecked.bind(this)
    this.handleTypeSelected = this.handleTypeSelected.bind(this)
    this.handleOrderChange = this.handleOrderChange(this)
  }

  handleOrderChange(e) {
    console.log("Order changed!")
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
      return {
        choices: [],
        defaultChoice: '',
        newChoice: '',
        label: '',
        valueRequired: false,
        type: '',
        ordera: ''
      }
    })
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
      
      <div className="field-builder-body">
        <label>Label </label>
        <input type="text" value={this.state.label} onChange={this.handleLabelTextChanged}/>
        <br/>
        <br/>

        <label>Type </label>
        <div onChange={this.handleTypeSelected}>
        <label>multi-select</label>
        <input type="radio" id="multi-select" name="select-type" value="multi-select"/>
        <label>single-select</label>
        <input type="radio" id="single-select" name="select-type" value="single-select"/>
        </div>
        <br/>
        <br/>

        <label>A Value is Required </label>
        <input type="checkbox" id="value-required" onChange={this.handleValueRequiredChecked} checked={this.state.valueRequired}></input>
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
        <input value={this.state.newChoice} onChange={this.handleNewChoiceTextChanged} type="text"/>
        <button type="button" onClick={this.handleAddChoiceClicked}> Add choice</button>
        <br/>
        <br/>

        <label >Order</label>
        <select>
          <option value="alphabetical">Display choices in alphabetical order</option>
          <option value="reverse-alphabetical">Display choices in reverse order</option>
          <option value="random">Display choices in random order</option>
        </select>
        <br/><br/>

        <button type="button" name="submit-button" onClick={this.handleSubmitClicked}> Submit</button>
        <p> or </p>
        <button type="button" name="cancel-button" onClick={this.handleCancelClicked}> Cancel</button>

      </div>
     
      
    </div>
    )
  }
}

export default App;
