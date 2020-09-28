import React from 'react';
import './Todo.css';
import db from './firebase';
import {EditIcon, CloseIcon, DeleteForeverIcon} from '@material-ui/icons';
import {Modal, List, ListItem, ListItemText, ListItemAvatar, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


const Todo = (props) => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	// const [input, setInput] = useState('');
	const [input, setInput] = useState();


	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const updateTodo = () => {
		// Update the todo with the new input text
		db.collection('todos').doc(props.todo.id).set({
			todo: input
		}, { merge: true });

		setOpen(false);
	}

	const deleteTodo = (event) => {
		db.collection('todos').doc(props.todo.id).delete()
	}

	return (
		<>
			<Modal
				open={open}
				onClose={handleClose}
			>
				<div className={classes.paper}>
					<h1>open</h1>
					<input placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)} />
					<CloseIcon onClick={updateTodo}/>
				</div>
			</Modal>
			<List className="root">
				<ListItem>
					<ListItemAvatar>
					</ListItemAvatar>
					<ListItemText
						primary={props.todo.todo}
						secondary="Dummy deadline..."
					/>
				</ListItem>
				<EditIcon onClick={handleOpen} />
				<DeleteForeverIcon onClick={deleteTodo}/>
			</List>
		</>
	)
}

export default Todo;