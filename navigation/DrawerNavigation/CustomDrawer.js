import React, { useEffect, useState } from 'react';
import {
    StatusBar,
    View,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { setSelectedTab } from '../../store/actions/drawerActions';

import {
    createDrawerNavigator
} from '@react-navigation/drawer'
import CustomDrawerContent from './CustomDrawerContent';

import { MainLayout, FilterQuestions, AboutUs } from '../../screens';
import { FocusAwareStatusBar } from '../../components/';
import {
    COLORS,
} from '../../constants';
import Animated from 'react-native-reanimated';

const Drawer = createDrawerNavigator();

const CustomDrawer = () => {
    const dispatch = useDispatch();
    const progressDrawer = useSelector(state => state.drawerReducer.progress);
    const isOpenDrawer = useSelector(state => state.drawerReducer.isOpenDrawer);
    const selectedTab = useSelector(state => state.drawerReducer.selectedTab)
    
    const [progress, setProgress] = useState(new Animated.Value(0));

    useEffect(()=>{
        setProgress(progressDrawer)
    },[progressDrawer])
    

    const scale = Animated.interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [1, 0.8]
    })

    const borderRadius = Animated.interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [0, 26]
    })   

    const animatedStyle = { borderRadius, transform: [{ scale }]}  

    const handleSelectedTab = (updateSelectedTab) => {
        dispatch(setSelectedTab(updateSelectedTab));
    }

    return(
        <>
        <View
        style={{
            flex: 1,
            backgroundColor: COLORS.primary
        }}
        
        >   
            <Drawer.Navigator
                screenOptions={{
                    drawerType: "slide",
                    headerShown: false,
                    drawerStyle: {
                        flex: 1,
                        width: "65%",
                        paddingRight: 20,
                        backgroundColor: "transparent"
                    },
                    overlayColor: 'transparent',
                    sceneContainerStyle: {
                        backgroundColor: "transparent"
                    }
                    
                }}
                initialRouteName = "MainLayout"
                drawerContent = {
                    props => {                     
                        return <CustomDrawerContent selectedTab = {selectedTab} setSelectedTab = {handleSelectedTab}  {...props} />
                    }
                }
                
            >
                <Drawer.Screen name = "MainLayout">
                    {props => 
                        <MainLayout 
                            {...props}
                            drawerAnimationStyle = {animatedStyle}
                            borderRadiusAnimation = {borderRadius}
                    />}
                </Drawer.Screen>

                <Drawer.Screen name = "FilterQuestions">
                    {props => 
                        <FilterQuestions 
                            {...props}
                            drawerAnimationStyle = {animatedStyle}
                            borderRadiusAnimation = {borderRadius}
                    />}
                </Drawer.Screen>

                <Drawer.Screen name = "AboutMe">
                    {props => 
                        <AboutUs 
                            {...props}
                            drawerAnimationStyle = {animatedStyle}
                            borderRadiusAnimation = {borderRadius}
                    />}
                </Drawer.Screen>
            </Drawer.Navigator>
        </View>
        <FocusAwareStatusBar barStyle = {isOpenDrawer ? "light-content" : "dark-content"} backgroundColor = {"transparent"} translucent/>
        </>
    )
}

export default CustomDrawer;