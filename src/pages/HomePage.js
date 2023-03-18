import React, {useEffect, useState } from "react";
import { Box } from "@mui/material";
import {connect, useSelector} from "react-redux";
import { addTodos } from "../@redux/reducer";
import TodoShow from "../components/TodoShow";
import "../App.css";
import SvgLogo from "../components/svgLogo";
import {useLocation, useNavigate} from 'react-router-dom';
import { isExpired } from "react-jwt";
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
    const navigate = useNavigate();
    const location = useLocation()
    const [loaded,setLoaded] = useState(true);
    const [user, setUser] = useState(location.state);

    useEffect(() => {
        if(location.state) {
            if(isExpired(location.state.user.token)) {
                navigate('/')
            }
        } else {
            navigate('/');
        }
        setLoaded(false);
    }, [loaded])

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
              <TodoShow user={user.user} />
          </div>
      </Box>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
