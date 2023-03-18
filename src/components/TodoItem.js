import React, {useRef,} from "react";
import DeleteIcon from "./DeleteIcon";
import {FormControlLabel, FormGroup} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import {completeTodo, incompleteTodo, deleteTodo} from '../utils'
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
const TodoItem = (props) => {
    const {item} = props;
    const infoBox = withReactContent(Swal)
    const token = props.user.token
    const updateTodoList = (e) => {
        const itemId = e.target.value;
        if (!e.target.checked) {
            incompleteTodo(itemId, token).then(r => {
                if(r.data.status === "success") {
                    infoBox.fire({
                        title: <strong>Success</strong>,
                        html: <i>ToDo marked as incompleted!</i>,
                        icon: 'success'
                    })
                    props.childListen(true);

                } else {
                    infoBox.fire({
                        title: <strong>Error</strong>,
                        html: <i>A critical error occured! Please try again later.</i>,
                        icon: 'success'
                    })
                }
            })
        } else {
            completeTodo(itemId, token).then(r => {
                if(r.data.status === "success") {
                    infoBox.fire({
                        title: <strong>Success</strong>,
                        html: <i>ToDo marked as completed!</i>,
                        icon: 'success'
                    })
                    props.childListen(true);

                } else {
                    infoBox.fire({
                        title: <strong>Error</strong>,
                        html: <i>A critical error occured! Please try again later.</i>,
                        icon: 'success'
                    })
                }
            })
        }
    }

    const deleteTodoFromList = async (e) => {

        await deleteTodo(e, token).then(r => {
            if(r.data.status === "success") {
                infoBox.fire({
                    title: <strong>Success</strong>,
                    html: <i>ToDo deleted!</i>,
                    icon: 'success'
                })
                props.childListen(true);
            } else {
                infoBox.fire({
                    title: <strong>Error</strong>,
                    html: <i>A critical error occured! Please try again later.</i>,
                    icon: 'success'
                })
            }
        })

    }

    return (
        <li key={item.id} className="listItem">

            <FormGroup className='w-100'>
                <FormControlLabel value={item.id}
                                  control={<Checkbox defaultChecked={!!item.status} value={item.id} onChange={updateTodoList}/>}
                                  label={item.title}/>
            </FormGroup>
            <span style={{color: "red"}} className="deleteIcon" onClick={() => deleteTodoFromList(item.id)}>
            <DeleteIcon></DeleteIcon>
        </span>
        </li>
    );
};

export default TodoItem;
