export const SET_SELECTED_TAB = "SET_SELECTED_TAB";
export const UPDATE_PROGRESS = "UPDATE_PROGRESS";

export const setSelectedTab = (selectedTabName) => {
    return { 
        type: SET_SELECTED_TAB,
        payload: {
            selectedTabName
        }
    };
}

export const updateProgress = (progress, isOpenDrawer) =>{
    return { 
        type: UPDATE_PROGRESS,
        payload: {
            progress,
            isOpenDrawer    
        }
    };
}