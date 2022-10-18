import { Box, Chip, Typography } from '@mui/material';
import React from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import WindowIcon from '@mui/icons-material/Window';
import {Button} from '@mui/material';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import SearchIcon from '@mui/icons-material/Search';

const NavBar = () => {
  return (
    <Box p={2} py={1.4} sx={{display: {xs: "none",md: "flex"},justifyContent:"flex-start",alignItems: "center",backgroundColor:"#fff"}}>
        <Box sx={{flex: 0.2,display: "flex",justifyContent:"flex-start",alignItems: "center"}}>
        <a href="https://app.polymersearch.com/auth/login">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1200px-Amazon_Web_Services_Logo.svg.png" alt="aws polymer" style={{width: "28px",height: "16px"}}/>
        </a>
        <Typography ml={5}>Everything AWS</Typography>
        </Box>
        <Box sx={{flex: 0.8,backgroundColor: "",display: "flex",width: "100px",justifyContent:"space-between"}} mx={2} p={0}>
            <Box sx={{backgroundColor: "#eee",display: "flex",gap: 4,borderRadius: "15px"}} px={5} py={1} mx={1}>
            <Typography variant='span' sx={{display: "flex",alignItems:"center",fontSize:"14px",fontWeight:600}}><WindowIcon fontSize='small' style={{marginRight: "4px"}}/> Data</Typography>
            <Typography variant='span' sx={{display: "flex",alignItems:"center",fontSize:"14px",fontWeight:600}}><LeaderboardIcon fontSize='small' style={{marginRight: "4px"}}/>  Insights</Typography>
            <Typography variant='span' sx={{display: "flex",alignItems:"center",fontSize:"14px",fontWeight:600}}><VisibilityIcon fontSize='small' style={{marginRight: "4px"}}/>  Views</Typography>
            </Box>
            <Box sx={{display: "flex",gap:"10px"}}>
            <Button variant='outlined' className='btn'><SearchIcon sx={{marginRight:"4px"}}/>More Sites</Button>
            <Button variant='contained' className='btn btn-color'><ScatterPlotIcon sx={{marginRight:"4px"}}/>Built With Polymer</Button>
            </Box>
        </Box>
    </Box>
  )
}

export default NavBar;