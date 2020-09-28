import React, { useState, useEffect } from 'react';
import Todo from './components/Todo';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import './App.css';
import db from './components/firebase';
import firebase from 'firebase';

function App() {
	//Creating states for the app
	const [todos, setTodos] = useState([]);
	const [input, setInput] = useState('');

	// When the app loads, we need to listen to the database and fetch new todos as they get added/removed
	//useEffect(function, dependencies); this runs once the app loads...
	useEffect(() => {
		// this code here... fires when the app.js loads
		db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
			setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
		})
	}, []);


	const getInputValue = (event) => {
		setInput(event.target.value);
	}


	const addTodo = (event) => {
		// This will fire off when we click the button...
		event.preventDefault(); //This will stop the page-refresh...
		//Adding datas to the firebase using .add({dictionary})
		db.collection('todos').add({
			todo: input,
			timestamp: firebase.firestore.FieldValue.serverTimestamp()
		})
		// setTodos([...todos, input]);
		setInput(''); //This clears our input after submit...
	}

  return (
    <div className="App">
			<h1>Hello Gerard</h1>

			<form>
				<FormControl>
					<InputLabel htmlFor="my-input">Write a todo</InputLabel>
					<Input value={input} onChange={getInputValue} />
				</FormControl>
				<Button disabled={!input} type='submit' onClick={addTodo} variant="contained" 
					color="primary">
					add todo
				</Button>
			</form>

			<ul>
				{todos.map(todo => (
					<Todo todo={todo}/>
				))}
			</ul>

    </div>
  );
}

export default App;
