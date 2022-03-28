import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import {
    COLORS,
    FONTS,
    SIZES,
    constants,
    icons,
    images,
    //dummyData
} from '../constants';
import Animated from 'react-native-reanimated';
import { useSelector, useDispatch } from 'react-redux';
import { CardLogoGame, Header } from '../components/';
import Home from './Home/Home';
import { removeSwippedQuestions, restartQuestions } from '../store/actions/questionsAction';

const MainLayout = ({ drawerAnimationStyle, borderRadiusAnimation, navigation }) => {
    const isOpenDrawer = useSelector(state => state.drawerReducer.isOpenDrawer);
    const dispatch = useDispatch();

    const handleRestart = () =>{
        dispatch(restartQuestions());
    }

    return (
        <Animated.View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.white,
                ...drawerAnimationStyle
            }}
        >   
            <Header 
                containerStyles = {{
                    height: 50,
                    paddingHorizontal: SIZES.padding,
                    marginTop: 40,
                    alignItems: "center"
                }}
                leftComponent = {
                    <TouchableOpacity
                        style = {{
                            width: 40,
                            height: 40,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        onPress = {() => navigation.openDrawer()}
                    >
                        <Image source = {icons.menu}/>
                    </TouchableOpacity>
                }

                rightComponent = {
                    <TouchableOpacity
                        style = {{
                            width: 40,
                            height: 40,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        onPress = {handleRestart}
                    >
                        <Image source = {icons.reload}/>
                    </TouchableOpacity>
                }
            >
                <Text style = {{fontSize: SIZES.h2, fontWeight: "700", color: COLORS.primary}}>Home</Text>
            </Header>
            <CardLogoGame />
            <View style = {{flex: 1}}>
                <Home/>
            </View>
            <Animated.View style = {{backgroundColor: COLORS.secondary, width: SIZES.widthWindow, padding: 5, alignItems: "center", borderBottomStartRadius: borderRadiusAnimation}}>
                <Text style = {{fontSize: SIZES.h2, color: "#fff", fontWeight: "bold", paddingVertical: 5}}>Ivanildop99</Text>
            </Animated.View>
            
        </Animated.View>
    )
}

export default MainLayout;