import { Box } from '@mui/material';
import { useState } from 'react';
import { connect } from 'react-redux';
import './App.css';
import LeftPart from './LeftPart';
import NavBar from './NavBar';
import RightPart from './RightPart';
import MenuIcon from '@mui/icons-material/Menu';
import ReactDOM from 'react-dom';

function App(props) {

  const [showModal,setShowModal] = useState(false);

  const filterHandler = async () => {
    await setShowModal(prev =>  !prev);
  }

  const Backdrop = () => {
    return (
        ReactDOM.createPortal(<Box sx={{position: "absolute",top: 0,left: 0,height: "fit-content",width: "100%",background: "transparent",backdropFilter: "blur(2px)",overflow: "hidden",backgroundColor: "rgba(1,1,1,0.3)"}}>
        </Box>,document.getElementById('backdrop'))
      )
    }

  return (
    <Box>
    <NavBar/>
      <Box className="App" sx={{display: "flex",flexDirection:{xs: "column",md:"row"}}}>
        {<Box sx={{display: {xs: "flex",md: "none"}}}>
          <MenuIcon sx={{position: "absolute",top: 10,left: 10}} fontSize={"large"} onClick={filterHandler} p={3}/>
        </Box>}
        {showModal && <><Backdrop />{ReactDOM.createPortal(<RightPart styleValue={{position: "absolute",top: "50%",left: "50%",transform: "translate(-50%,-50%)",height: {xs: "100%",md: "60%"},zIndex: 10000,width: {xs: "95%",md: "70%"},backgroundColor: "#eee",backdropFilter: "blur(5px)",border: "1px solid #ccc",display: "flex",flexDirection : "column",fontSize:"10px"}} showIcon={true} onClose={() => setShowModal(false)}/>,document.getElementById('filter'))}</>}
        <RightPart />
        <LeftPart />
      </Box>
    </Box>
  );
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  updateModal: (value) => dispatch({type: "SHOWMODAL",value})
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
