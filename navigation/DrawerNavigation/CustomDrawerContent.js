import React, { useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { useDispatch } from 'react-redux';

import {
    DrawerContentScrollView, useDrawerProgress, useDrawerStatus, useIsDrawerOpen
} from '@react-navigation/drawer'

import {
    COLORS,
    FONTS,
    SIZES,
    constants,
    icons,
    images,
    //dummyData
} from '../../constants';

import { CardLogoGame } from '../../components';

import { updateProgress } from '../../store/actions/drawerActions';



const CustomDrawerItem = ({label, icon, isFocused, onPress}) =>{

    return(
        <TouchableOpacity
            style = {{
                flexDirection: "row",
                height: 40,
                marginBottom: 28,
                alignItems: "center",
                paddingLeft: SIZES.radius,
                borderRadius: SIZES.base, 
                backgroundColor: isFocused ? COLORS.transparentPurple : null
            }}
            onPress = {onPress}
        >
            <Image 
                source = {icon}
                style = {{
                    width: 25,
                    height: 25,
                    tintColor: COLORS.white
                }}
            />

            <Text 
                style = {{
                    marginLeft: 18,
                    color: COLORS.white,
                    fontSize: 18,
                    //fontWeight: 500
                }}
            >
                {label}
            </Text>
        </TouchableOpacity>
    )
}

const CustomDrawerContent = ({navigation, selectedTab, setSelectedTab}, ...props) =>{
    const dispatch = useDispatch();
    const progressDrawer = useDrawerProgress();
    const isOpenDrawer = useDrawerStatus() === "open" ? true : false
    

    useEffect(()=>{
        dispatch(updateProgress(progressDrawer, isOpenDrawer));
    },[progressDrawer, isOpenDrawer])

    return(
        <DrawerContentScrollView 
            {...props}
            scrollEnabled = {true}
            contentContainerStyle = {{ flex: 1}}            
        >
            <View
                style = {{
                    flex: 1,
                    paddingHorizontal: SIZES.padding,
                    marginTop: 20
                }}
            >
                <View 
                    style ={{
                        alignItems: "flex-start",
                        justifyContent: "center"
                    }}
                >   
                    <TouchableOpacity
                        style = {{
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                        onPress = {() => navigation.closeDrawer()}
                    >
                        <Image 
                            source = {icons.close}
                            style = {{
                                height: 35,
                                width: 35,
                                tintColor: COLORS.white
                            }}
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style = {{
                        //alignItems: "center",
                        marginTop: 20,
                        marginLeft: SIZES.base
                    }}
                    onPress = {() => console.log("User")}
                >
                    {
                    //set some logo here
                    }
                </TouchableOpacity>

                <View 
                    style = {{
                        flex: 1,
                        marginTop: SIZES.padding
                    }}
                >
                    <CustomDrawerItem
                        label = {constants.screens.home}
                        icon = {icons.home}
                        isFocused = {selectedTab == constants.screens.home}
                        onPress = {() =>{
                            setSelectedTab(constants.screens.home);
                            navigation.navigate("MainLayout")
                        }}

                    />

                    <CustomDrawerItem
                        label = {constants.screens.filterQuestions}
                        icon = {icons.filter}
                        isFocused = {selectedTab == constants.screens.filterQuestions}
                        onPress = {() =>{
                            setSelectedTab(constants.screens.filterQuestions);
                            navigation.navigate("FilterQuestions")
                        }}
                    />

                    <CustomDrawerItem
                        label = {constants.screens.aboutMe}
                        icon = {icons.info}
                        isFocused = {selectedTab == constants.screens.aboutMe}
                        onPress = {() =>{
                            setSelectedTab(constants.screens.aboutMe);
                            navigation.navigate("AboutMe")
                        }}
                    />
                    
                </View>
                 
                <View style = {{
                    marginBottom: 30    
                }}>
                    <Text
                        style = {{
                            color: COLORS.white
                        }}
                    >Buited by</Text>
                    <Text
                        style = {{
                            fontSize: SIZES.h2,
                            color: COLORS.secondary,
                            marginLeft: 10
                        }}
                    >
                        Ivanildop99
                    </Text>
                </View>

            </View>

        </DrawerContentScrollView>
    )
}

export default CustomDrawerContent;