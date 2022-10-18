import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system';
import { Alert, Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import LinkIcon from '@mui/icons-material/Link';
import "./App.css";
import { connect } from 'react-redux';
import Portal from './Portal';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import axios from 'axios';

const LeftPart = (props) => {
  const [showModal,setShowModal] = useState(false);
  const [fullScreen,setFullScreen] = useState(false);
  const [passData,setData] = useState(false);
  const [Apidata,setApiData] = useState([]);
  const clickHandler = async (data) => {
    setShowModal(prev => !prev);
    await setData(data);
  }

  const closeModal = () => {
    setShowModal(false);
  }

  const fullScreenHandler = async () => {
    await setFullScreen(prev => !prev);
    props.updateScreen(fullScreen);
  }

  const [showAlert,setShowAlert] = useState(false);
  const [searchStr,setSearchStr] = useState(props.searhValue);

  const alertHandler = (data) => {
    setShowAlert(prev => !prev);
    navigator.clipboard.writeText(data);
  }

  useEffect(()=>{
    showAlert && setTimeout(() => {
      setShowAlert(false);
    },[2000])
  },[showAlert])

  useEffect(() => {
    const getData = async () => {
      const resp = await axios.get("https://aws-polymer-clone.herokuapp.com/data/find");
      await setApiData(resp.data);
    }
    getData();
  },[])

  useEffect(() => {
    let topics = [...new Set(Apidata.reduce((acc,ele) => acc.concat(ele.topics),[]).toString().split(","))];
    props.updateFilters("topics",topics)
    let language = [...new Set(Apidata.reduce((acc,ele) => acc.concat(ele.language),[]).toString().split(","))];
    props.updateFilters("language",language)
    let license = [...new Set(Apidata.filter((ele) => ele.license).reduce((acc,ele) => acc.concat(ele.license.name),[]).toString().split(","))];
    props.updateFilters("license",license)
  },[Apidata])

  useEffect(() => {
    const getData = async () => {
      await setSearchStr(props.searchValue);
    }
    getData();
  },[props.searchValue])

  const filterQuery = (data) => {
    // ignore empty filters and get keys of filters with value
    let ignoreEmptyFilters = Object.keys(props.applied_filters).filter(ele => props.applied_filters[ele].length > 0);
    // get values of keys
    let ans = [];
    if(ignoreEmptyFilters.length > 0){
      ans = ignoreEmptyFilters.map(e => props.applied_filters[e].map(el => 
        data.filter(ele => {
          if(parseInt(ele[1][e]) === ele[1][e]){return ele[1][e] >=el.split("-")[0] && ele[1][e] <=el.split("-")[1] && ele[1]}
          else if(typeof(ele[1][e]) === 'object' && ele[1][e] !== null && !ele[1][e].length>0){return ele[1][e]["name"] === el && ele[1]}
          else if((ele[1][e] === false || ele[1][e] === true)){return ele[1][e].toString() === el && ele[1]} 
          else if(ele[1][e] !== null){return ele[1][e].includes(el) && ele[1]} 
        })));
      let result = [];
      ans.map(ele => ele.map(el => el.map(e => result.push(e))));

      // filter duplicates
      let answer = [];
      result.map(el => answer.filter(ele => ele[1] === el[1]).length === 0 && answer.push(el));

      return answer;
    }
    return data;
  }

  return (
    <Box sx={{display: "flex",flexDirection: "column",flex: fullScreen ? "100vw" : "80vw",overflow:"scroll",height: "100vh"}}>
    <Box sx={{backgroundColor: "#aaa",display: "flex",alignItems:"center",justifyContent:"center",flexDirection:"column",background: "url('https://cdn.polymersearch.com/shimmer_1.svg') no-repeat",backgroundSize: "cover"}} mx={2} py={6}>
        <Typography sx={{fontWeight: "600",fontSize:"24px"}}>Everything AWS</Typography>
        <Typography sx={{fontSize:"13px"}}>Search and discover 6K+ quality AWS repositories</Typography>
    </Box>
    <Box sx={{position: "sticky",top: 0,backgroundColor: "#F9FAFC",right: 0,display: "flex",justifyContent:"flex-end",alignItems:"center",gap:"4px"}} mx={2} py={2}>
        {/* <Typography sx={{display: "inline",textAlign:"center",fontWeight: 600}}>Filters</Typography> */}
        {/* <FormControl fullWidth sx={{width: "130px"}}>
          <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select outline"
            value={null}
            label="Sort By"
            // onChange={handleChange}
          >
            <MenuItem value={null}>None</MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl> */}
        <Typography sx={{fontFamily: "revert",zIndex: 100000}}>{filterQuery(Object.entries(searchStr ? Apidata.filter(ele => ele.name.includes(searchStr)) : Apidata)).length + " Results"}</Typography>
        <Box px={2} sx={{cursor: "pointer"}}>
        <OpenInFullIcon onClick={fullScreenHandler} />
        </Box>
    </Box>
    {Object.entries(props.applied_filters).filter(ele => ele[1].length > 0) && <Box sx={{display: "flex",backgroundColor: "#ddd",flexDirection: "column"}} mx={2} py={2}>
      <Typography p={1} sx={{fontWeight: 800,display: "flex",alignItems:"center",fontSize: {xs: "10px",md: "14px",flexWrap: "wrap"}}}>Filters</Typography>{Object.entries(props.applied_filters).map(ele => ele[1].length > 0 && <Typography p={1} sx={{display: "flex",gap: "3px",height: "fit-content",flexWrap: "wrap",alignItems: "center",fontSize: {xs: "10px",md: "14px"}}}><span style={{textTransform:"capitalize",fontWeight: 600}}>{ele[0].split("_").join(" ").toString()}</span>{ele[1].map(ele => <Typography sx={{backgroundColor: "#aaa",color: "#fff",display: "inline",paddingRight: "5px",margin: "0 3px",width: "fit-content",borderRadius: "5px",fontSize: {xs: "10px",md: "14px"}}} p={1}>{ele}</Typography>)}</Typography>)}
    </Box>}
    <Box sx={{display: "flex",textAlign: "left",flexWrap:"wrap",gap: "5px",justifyContent:"center",height: "fit-content"}} py={0}>
        {filterQuery(Object.entries(searchStr ? Apidata.filter(ele => ele.name.includes(searchStr)) : Apidata)).map(ele => 
        {return <Box key={Math.random()} sx={{backgroundColor: "#fff",borderRadius: "5px",font: "12px !important",height: "260px",width: "280px"}} px={2} py={3} m={1} onClick={() => clickHandler(ele[1])}>
        <a href={ele[1].githubLink} target='_blank' rel="noreferrer" style={{color: "black"}} className="title">
          <Typography>
            {ele[1].name}
          </Typography></a>
          <Typography sx={{fontSize: "12px",height: "70px"}} py={1}>
            Description - {ele[1].description}
          </Typography>
          <Box sx={{display: "flex",gap: 2,alignItems: "center",margin: "10px 0"}}>
            <a href={ele[1].html_url} target='_blank' rel="noreferrer" style={{textDecoration: "none",color: "black"}}>
              <Typography sx={{display:"flex",border: "1px solid #ccc",padding: "0 3px",alignItems:"center"}}>
                <ReplyIcon style={{transform: "rotate(180deg)",transform: "scaleX(-1)",zIndex: 3}}/>
                <Typography sx={{fontSize: "13px"}}>Github Repo</Typography>
              </Typography></a>
              
            <Button sx={{display:"flex",border: "1px solid #ccc",padding: "0 3px",alignItems:"center",zIndex: 0}} onClick={(e) => {e.stopPropagation();return alertHandler(ele[1].html_url)}}>
              <LinkIcon sx={{zIndex: -1}}/>
              <Typography px={0.2} sx={{fontSize: "13px"}}>Share</Typography>
            </Button>
            {/* {showAlert && <Alert sx={{position: "absolute"}} ml={2} onClose={() => {setShowAlert(false)}}>Text Copied!</Alert>} */}
          </Box>
          <hr />
          <Box px={1.5} >
            <Box sx={{display: "flex",justifyContent:"space-between"}} py={0.4}><Typography sx={{fontSize: "12px"}}>Language :</Typography><Typography sx={{fontSize: "12px",backgroundColor:"#FCE9EE"}} p={0.3}>{ele[1].language}</Typography></Box>
            <Box sx={{display: "flex",justifyContent:"space-between"}} py={0.4}><Typography sx={{fontSize: "12px"}}>Search Keywords :</Typography><Typography sx={{fontSize: "12px",backgroundColor:"#E8EFFE",width:'fit-content',maxWidth: "100px",overflow: "hidden",whiteSpace: "nowrap",textOverflow: "ellipsis"}} p={0.3}>{ele[1].name}</Typography></Box>
            <Box sx={{display: "flex",justifyContent:"space-between"}} py={0.4}><Typography sx={{fontSize: "12px"}}>Forks :</Typography><Typography sx={{fontSize: "12px"}}>{ele[1].forks}</Typography></Box>
            <Box sx={{display: "flex",justifyContent:"space-between"}} py={0.4}><Typography sx={{fontSize: "12px"}}>Description :</Typography><Typography sx={{width: "110px",whiteSpace:"nowrap",textOverflow: "ellipsis",overflow:"hidden",fontSize: "12px",textAlign:"right"}}>{ele[1].description}</Typography></Box>
          </Box>
        </Box>})}
      </Box>
      {showModal && <Portal data={passData} closeModal={closeModal} />}
      </Box>
  )
}

const mapStateToProps = state => ({
    ...state
  });
  
const mapDispatchToProps = dispatch => ({
    updateModal: (value) => dispatch({type: "SHOWMODAL",value}),
    updateScreen: (value) => dispatch({type: "FULLSCREEN",value}),
    updateFilters: (key,value) => dispatch({type: "UPDATE_FILTERS",key,value}),
  });

export default connect(mapStateToProps,mapDispatchToProps)(LeftPart);