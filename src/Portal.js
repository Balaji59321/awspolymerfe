import {Alert, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import CancelIcon from '@mui/icons-material/Cancel';
import ReplyIcon from '@mui/icons-material/Reply';
import LinkIcon from '@mui/icons-material/Link';

const Portal = (props) => {
    const [showAlert,setShowAlert] = useState(false);
    const alertHandler = (data) => {
      setShowAlert(prev => !prev);
      navigator.clipboard.writeText(data);
    }

    useEffect(()=>{
      showAlert && setTimeout(() => {
        setShowAlert(false);
      },[1000])
    },[showAlert])

    const Overlay = ({data,closeModal}) => {
        return (
            ReactDOM.createPortal(<Box sx={{position: "absolute",top: "50%",left: "50%",transform: "translate(-50%,-50%)",height: {xs: "90%",md: "60%"},zIndex: 10000,width: {xs: "95%",md: "70%"},backgroundColor: "#eee",backdropFilter: "blur(5px)",border: "1px solid #ccc",display: "flex",flexDirection : "column"}}>
                <Typography p={1} sx={{textAlign: "center",fontWeight: 900,fontSize: "18px",backgroundColor: "#ddd"}}>{data.name}</Typography>
                <CancelIcon sx={{position: "absolute",right: "5px",top: "8px"}} p={1} onClick={closeModal} />
                <Box m={2} sx={{border: "1px solid #bbb",borderRadius: "5px"}} p={2}>
                <Typography>{data.name}</Typography>
                <Typography py={1} sx={{fontSize: {xs: "12px",md: "16px"}}}>{data.description}</Typography>
                <Box sx={{display: "flex",gap: 2,alignItems: "center",margin: "10px 0"}}>
                <a href={data.githubLink} target='_blank' rel="noreferrer" style={{textDecoration: "none",color: "black"}}>
                  <Typography sx={{display:"flex",border: "1px solid #ccc",padding: "0 3px",alignItems:"center"}}>
                    <ReplyIcon style={{transform: "rotate(180deg)",transform: "scaleX(-1)"}}/>
                    <Typography sx={{fontSize: "13px"}}>Github Repo</Typography>
                  </Typography></a>
                  
                <Typography sx={{display:"flex",border: "1px solid #ccc",padding: "0 3px",alignItems:"center"}}  onClick={() => alertHandler(data.githubLink)}>
                  <LinkIcon />
                  <Typography px={0.2} sx={{fontSize: "13px"}}>Share</Typography>
                </Typography>
                {showAlert && <Alert ml={2} onClose={() => {setShowAlert(false)}}>Text Copied!</Alert>}
                </Box>
                <hr />
                <Box sx={{display: "flex",gap: "45px"}}>
                <Box sx={{display: "flex",gap:"2px",flexDirection: "column"}}>
                <Typography sx={{fontSize: {xs: "12px",md: "16px"}}}>License Name:</Typography>
                {data?.license?.name !== null && <Typography sx={{fontSize: {xs: "12px",md: "16px"}}}>{data.license.name}</Typography>}
                </Box>
                <Box sx={{display: "flex",gap:"2px",flexDirection: "column"}}>
                <Typography sx={{fontSize: {xs: "12px",md: "16px"}}}>Topics:</Typography>
                <Typography sx={{fontSize: {xs: "12px",md: "16px"}}}>{data.topics.toString()}</Typography>
                </Box>
                </Box>
                <hr />
                <Box sx={{display: "flex",gap: {xs: "20px",md: "45px"},flexWrap: "wrap"}}>
                <Box sx={{display: "flex",gap:"2px",flexDirection: "column"}}>
                <Typography sx={{fontSize: {xs: "12px",md: "16px"}}}>Visibility:</Typography>
                <Typography sx={{fontSize: {xs: "12px",md: "16px"}}}>{data.visibility}</Typography>
                </Box>
                <Box sx={{display: "flex",gap:"2px",flexDirection: "column"}}>
                <Typography sx={{fontSize: {xs: "12px",md: "16px"}}}>Watchers:</Typography>
                <Typography sx={{fontSize: {xs: "12px",md: "16px"}}}>{data.watchers}</Typography>
                </Box>
                <Box sx={{display: "flex",gap:"2px",flexDirection: "column"}}>
                <Typography sx={{fontSize: {xs: "12px",md: "16px"}}}>Forks:</Typography>
                <Typography sx={{fontSize: {xs: "12px",md: "16px"}}}>{data.forks}</Typography>
                </Box>
                <Box sx={{display: "flex",gap:"2px",flexDirection: "column"}}>
                <Typography sx={{fontSize: {xs: "12px",md: "16px"}}}>Size:</Typography>
                <Typography sx={{fontSize: {xs: "12px",md: "16px"}}}>{data.size}</Typography>
                </Box>
                <Box sx={{display: "flex",gap:"2px",flexDirection: "column"}}>
                <Typography sx={{fontSize: {xs: "12px",md: "16px"}}}>Open Issues:</Typography>
                <Typography sx={{fontSize: {xs: "12px",md: "16px"}}}>{data.open_issues}</Typography>
                </Box>
                </Box>
                <hr />
                <Box sx={{display: "flex",gap: "45px"}}>
                <Box sx={{display: "flex",gap:"2px",flexDirection: "column"}}>
                <Typography sx={{fontSize: {xs: "12px",md: "16px"}}}>Created At:</Typography>
                <Typography sx={{fontSize: {xs: "12px",md: "16px"}}}>{new Date(data.created_at).toLocaleDateString()}</Typography>
                </Box>
                <Box sx={{display: "flex",gap:"2px",flexDirection: "column"}}>
                <Typography sx={{fontSize: {xs: "12px",md: "16px"}}}>Updated At:</Typography>
                <Typography sx={{fontSize: {xs: "12px",md: "16px"}}}>{new Date(data.updated_at).toLocaleDateString()}</Typography>
                </Box>
                </Box>
                <hr />
                <Box sx={{display: "flex",gap:"2px",flexDirection: "column"}}>
                <Typography sx={{fontSize: {xs: "12px",md: "16px"}}}>Default Branch:</Typography>
                <Typography sx={{fontSize: {xs: "12px",md: "16px"}}}>{data.default_branch}</Typography>
                </Box>
                </Box>
            </Box>,document.getElementById('portal'))
          )
    }
    
    const Backdrop = () => {
        return (
            ReactDOM.createPortal(<Box sx={{position: "absolute",top: 0,left: 0,height: "100vh",width: "100%",background: "transparent",backdropFilter: "blur(2px)",overflow: "hidden",backgroundColor: "rgba(1,1,1,0.3)"}}>
            </Box>,document.getElementById('backdrop'))
          )
    }

    const closeModal = () => {
        props.closeModal();
    }

  return <><Backdrop/><Overlay data={props.data} closeModal={() => closeModal()} /></>
}

export default Portal;