import { AccountCircle } from '@mui/icons-material';
import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import colors from './colors';
import SearchIcon from '@mui/icons-material/Search';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import { connect } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import ReactDOM from 'react-dom';

const RightPart = (props) => {
  
  const allFilters = props.filters;
  const filters = Object.keys(props.filters);
  const colorInd = Object.keys(colors);
  const [showModal,setShowModal] = useState(false);
  const [searchValue,setSearchValue] = useState("");
  const [showFilter,setshowFilter] = useState({show: false,index: 0,key : null});
  const clickHandler = async (ele,el) => {
    await setshowFilter(prev => {return {show: !prev.show,index: el,key : ele}});
  }

  const currentFilterHandler = (e,key,val) => {
    e.stopPropagation();
    props.currentFilters(key,val);
  }

  const removeFilter = (e,key,val) => {
    e.stopPropagation();
    props.removeFilters(key,val); 
  }
  
  return (
  <Box sx={props.styleValue ? props.styleValue : {flex:"20vw",display: {xs: "none", md: "flex"},flexDirection: "column",overflow:"auto"}}>
    {props.showIcon && <CloseIcon sx={{margin: "0 auto",marginRight: "0px",padding: "1px"}} onClick={() => props.onClose()} />}
    <TextField
      id="outlined-basic"
      variant="outlined"
      placeholder='Search'
      value={searchValue}
      onChange={async (e) => {await setSearchValue(e.target.value);return props.searchValue(e.target.value)}}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      style={{margin: "15px 10px",backgroundColor:"#fff"}}
    />
    <Typography sx={{fontSize: "13px",fontWeight: 700}} p={1}>Filters</Typography>
    {filters.map((ele,ind) => <Box pl={1} mb={0.5} pr={0.5} onClick={() => clickHandler(ele,ind)}>
      <>
      <Typography sx={{borderLeft: `7px solid ${colors[colorInd[ind]]}`,backgroundColor:"#fff",borderRadius: "5px",display: "flex",justifyContent:"space-between",alignItems:"center"}} py={1} px={1}>
      <Typography sx={{fontSize: "11px",fontWeight:600,textTransform:"capitalize"}}>{ele.split("_").join(" ")}</Typography>
      <Typography>{showFilter.show && ind === showFilter.index? '-' : '+'}</Typography>
      </Typography>
      {showFilter.show && ind === showFilter.index && allFilters[showFilter.key] && <Box sx={{backgroundColor: "#ccc",display: 'flex',flexWrap : "wrap",gap: "10px"}} p={1} my={2} onClick={e => e.stopPropagation()}>
        {(allFilters[showFilter.key]).map(ele => <Button sx={{display: 'flex',width: "fit-content",justifyContent: "space-between",gap: "15px"}} variant="contained" onClick={e => currentFilterHandler(e,showFilter.key,ele)}>
          <Typography sx={{fontSize: '12px'}}>{ele}</Typography>
          {/* <Typography sx={{fontSize: '12px'}}>{ele[1]}</Typography> */}
          {props.applied_filters[showFilter.key].includes(ele) && <CloseIcon sx={{width: "14px"}} onClick={(e) => removeFilter(e,showFilter.key,ele)} />}
        </Button>)}
      </Box>}
      </>
    </Box>)}
    {!props.showIcon && <Button variant='contained' className='btn btn-color' sx={{width: "fit-content",margin: "15px auto"}}><ScatterPlotIcon sx={{marginRight:"4px"}}/>Built With Polymer</Button>}
  </Box>
)}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  searchValue: (value) => dispatch({type: "SEARCH_VALUE",value}),
  currentFilters: (key,value) => dispatch({type: "CURRENT_FILTERS",key,value}),
  removeFilters: (key,value) => dispatch({type: "REMOVE_FILTERS",key,value})
});

export default connect(mapStateToProps,mapDispatchToProps)(RightPart);