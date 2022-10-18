import { combineReducers, legacy_createStore as createStore } from "redux";


const initialState = {
    showModal: false,
    fullScreen: false,
    searchValue: "",
    filters: {
        language: [],
        license: [],
        topics: [],
        stargazers_count:[
            "0-50",
            "50-100",
            "100-500",
            "500-1000",
            "1000-12000"
        ],
        forks_count:[
            "0-50",
            "50-100",
            "100-500",
            "500-1000",
            "1000-2000"
        ],
        watchers_count:[
            "0-50",
            "50-100",
            "100-500",
            "500-1000",
            "1000-12000"
        ],
        open_issues_count:[
            "0-100",
            "100-200",
            "200-300",
            "300-400",
            "400-600"
        ],
        has_wiki:[
            "true",
            "false"
        ],
        has_issues:[
            "true",
            "false"
        ],
        has_projects: [
            "true",
            "false"
        ],
        has_downloads: [
            "true",
            "false"
        ],
    },
    applied_filters: {
        language: [],
        topics: [],
        license: [],
        stargazers_count: [],
        forks_count: [],
        watchers_count:[],
        open_issues_count: [],
        has_wiki: [],
        has_issues:[],
        has_projects: [],
        has_downloads: [],
    }
}

const storeReducer = (state = initialState,action) => {
    switch(action.type){
        case "SHOWMODAL": return {...state,showModal : action.value};
        case "FULLSCREEN": return {...state,fullScreen : action.value};
        case "SEARCH_VALUE": return {...state,searchValue: action.value};
        case "UPDATE_FILTERS": return {...state,filters: {...state.filters,[action.key] : action.value}};
        case "CURRENT_FILTERS": return {...state,applied_filters: {...state.applied_filters,[action.key]: [...new Set([...state.applied_filters[action.key],action.value])]}};
        case "REMOVE_FILTERS": return {...state,applied_filters: {...state.applied_filters,[action.key]: [...state.applied_filters[action.key].filter(ele => ele !== action.value)]}};
        default: 
            return state;
    }
}

const store= createStore(storeReducer);
export default store;