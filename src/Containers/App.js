import React, { Component } from 'react';

 import classes from './App.css';
import Persons from '../Components/Persons/Persons';
import Cockpit from '../Components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Aux';
import AuthContext from '../context/auth-context';

// const StyledButton = styled.button`
//   background-color: ${props => props.alt ? 'red' : 'green'}; 
//   color: white;  
//   font: inhert;
//   border: 1px solid blue;
//   padding: 8px;
//   cursor: pointer;
  
//   &:hover {
//     background-color: ${props => props.alt ? 'salmon' : 'lightgreen'};
//     color: black;
//   }
// `;

class App extends Component {
  constructor(props) {
    super(props)
    console.log('[App.js] constuctor');
  }

  state = {
    persons: [
      { id: 'asfa1', name: 'Tiku', age: 24 },
      { id: 'vasdf1', name: 'Manuel', age: 29 },
      { id: 'asdf11', name: 'Charity', age: 20 }
    ],
    otherState: 'some other value',
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false
  };

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  // componentWillMount() {
  //   console.log('[App.js] componentWillMount');
  // }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }
   
  // switchNameHandler = (newName) =>{
  //   // console.log('was clicked!');
  //   // DON'T DO THIS: this.state.persons[0].name = 'Tiku';
  //   this.setState({
  //     persons: [
  //       { name: newName, age: 24 },
  //       { name: 'Manuel', age: 29 },
  //       { name: 'Charity', age: 22 }
  //     ]
  //   })
  // }
  
  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(person => {
      return person.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]    
    };

    //const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value; 

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState((prevState, props) => {
      return { 
        persons: persons, 
        changeCounter: prevState.changeCounter + 1 
      };
    });
  };

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons]
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };

  loginHandler = () => {
    this.setState({authenticated: true});
  };

  render() {  
    console.log('[App.js] render');
    let persons = null;
 
    if(this.state.showPersons) {
      persons = (
        <Persons 
          persons={this.state.persons} 
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
          isAuthenticated={this.state.authenticated}
        />
      );
    }
          
          // {/* {this.state.persons.map( (person, index) => {
          //   return <ErrorBoundary key={person.id}>
          //     <Person
          //       click={() => this.deletePersonHandler(index)} 
          //       name={person.name} 
          //       age={person.age} 
          //       key={person.id}
          //       changed={(event) => this.nameChangedHandler(event, person.id)}/>
          //   </ErrorBoundary>   
          // }) }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */}
          // {/* <Person 
          //   name={this.state.persons[0].name} 
          //   age={this.state.persons[0].age}/> 
          // <Person 
          //   name={this.state.persons[1].name} 
          //   age={this.state.persons[1].age}
          //   click={this.switchNameHandler.bind(this,'Tiku!')}
          //   changed={this.nameChangedHandler} >My Hobbies: Racing</Person>
          // <Person 
          //   name={this.state.persons[2].name} 
          //   age={this.state.persons[2].age} /> */}

    
    return (
      <Aux classes={classes.App}>
        <button 
          onClick={() =>{
            this.setState({showCockpit: false});
          }}
        >
          Remove Cockpit
        </button>
        <AuthContext.Provider value={{
          authenticated: this.state.authenticated, 
          login: this.loginHandler}}
          >
          {this.state.showCockpit ? ( 
            <Cockpit 
              title={this.props.appTitle}
              showPersons={this.state.showPersons} 
              persons={this.state.persons}
              clicked={this.togglePersonsHandler}
            />
          ) : null}
          {persons}
        </AuthContext.Provider>
      </Aux>
    );
    // return React.cloneElement('div', null, 'hi', 'Hi, I\'m a React App!!!'); 
  }
}

export default withClass(App, classes.App);