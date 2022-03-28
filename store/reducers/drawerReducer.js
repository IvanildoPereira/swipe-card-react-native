import { SET_SELECTED_TAB, UPDATE_PROGRESS} from "../actions/drawerActions";

const initialState = {
    selectedTab: "",
    progress: 0,
    isOpenDrawer: false
}

const drawerReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_SELECTED_TAB:
            return {
                ...state,
                selectedTab: action.payload.selectedTabName
            };
        case UPDATE_PROGRESS:
            return {
                ...state,
                progress: action.payload.progress,
                isOpenDrawer: action.payload.isOpenDrawer
            }

        default:
            return state;
    }
}

export default drawerReducer;
