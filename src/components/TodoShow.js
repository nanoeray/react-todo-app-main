import {Box, ButtonGroup, TextField} from "@mui/material";
import React, {useEffect, useState} from "react";
import TodoItem from "./TodoItem";
import axios from "axios";
import {baseURL} from "../constants/baseURL";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {addTodo} from '../utils'

const DisplayTodos = (props) => {
    const token = props.user.token;
    const [todoList, setTodoList] = useState([]);
    const [sort, setSort] = useState("all");
    const [reloadList, setReloadList] = useState(true);
    const infoBox = withReactContent(Swal)

    const createTodo = async (e) => {
        e.preventDefault()
        const create = await addTodo(e, token);
        e.target[0].value = '';
        if (create.data?.status === "success") {
            infoBox.fire({
                title: "Success",
                text: "ToDo Created Successfully",
                icon: "success"
            })
            setReloadList(true);
        } else if (create === "empty") {
            infoBox.fire({
                title: "Error",
                text: "ToDo title must be at least 3 character",
                icon: "error"
            })
        }

    }

    const childListen = (childData) => {
        setReloadList(childData)
    }

    useEffect(() => {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${baseURL}/todo/listTodos`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setTodoList(response.data.data)
                setReloadList(false)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [reloadList]);


    return (
        <>
            <Box className="addTodos">
                <form className="w-100" onSubmit={createTodo}>
                    <TextField
                        fullWidth
                        id="newTodo"
                        variant="standard"
                        label="Add a new todo"/>
                    <br/>
                </form>
            </Box>

            <div className="displaytodos">
                <ul className="todoUl">
                    {todoList.length > 0 && sort === "all"
                        ? todoList.map((item) => {
                            return (
                                <TodoItem
                                    key={item.id}
                                    item={item}
                                    childListen={childListen}
                                    user={props.user}
                                />

                            );
                        })
                        : null}
                    {/* for completed items */}
                    {todoList.length > 0 && sort === "completed"
                        ? todoList.map((item, index) => {
                            if (item.status === 1) {
                                return (
                                    <TodoItem
                                        key={item.id}
                                        item={item}
                                        childListen={childListen}

                                    />

                                );
                            } else {
                                if (index === 0) {
                                    return (
                                        <>
                                            You dont have completed todos
                                        </>
                                    )
                                }
                            }
                        })
                        : null}
                    {/* for all items */}
                    {todoList.length > 0 && sort === "incompleted"
                        ? todoList.map((item, index) => {
                            if (item.status === 0) {
                                return (
                                    <TodoItem
                                        key={item.id}
                                        item={item}
                                        childListen={childListen}
                                    />
                                );
                            } else {
                                if (index === 0) {
                                    return (
                                        <>
                                            You dont have completed todos
                                        </>
                                    )
                                }
                            }
                        })
                        : null}
                </ul>

                <ButtonGroup className="w-100">
                    <span className="Show">Show:</span>
                    <div className="filterGroup">
                <span onClick={() => setSort("all")} className={sort === "all" ? 'activeButton' : 'filterButton'}>
                    All
                </span>
                        <span onClick={() => setSort("completed")}
                              className={sort === "completed" ? 'activeButton' : 'filterButton'}>
                    Completed
                </span>
                        <span onClick={() => setSort("incompleted")}
                              className={sort === "incompleted" ? 'activeButton' : 'filterButton'}>
                    Incompleted
                </span>
                    </div>
                </ButtonGroup>
            </div>
        </>
    );
};

export default DisplayTodos;
