import React,{useEffect} from "react";
import { Box } from "@mui/material";
import {connect, useSelector} from "react-redux";
import { addTodos } from "../@redux/reducer";
import TodoShow from "../components/TodoShow";
import "../App.css";
import SvgLogo from "../components/svgLogo";

//** Redux
const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
  };
};

const HomePage = () => {
    const user = useSelector(state =>  state)
    useEffect(()=> {
       console.log('user:',user)
    },[user])
  return (
      <Box className="content-center">
          <div className="Rectangle">
              <Box sx={{mb: 6}}>
                  <div>
                      <SvgLogo></SvgLogo>
                  </div>
                  <div className="Welcome-back Text-Style-5">
                      Todo List
                  </div>
              </Box>
              <TodoShow />
          </div>
      </Box>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
