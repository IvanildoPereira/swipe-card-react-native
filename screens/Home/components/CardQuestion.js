import React, { useState, useEffect, useRef } from "react"
import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity, Pressable } from "react-native"
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, useDerivedValue, runOnJS, interpolate, withTiming, withSequence, withDelay } from "react-native-reanimated";
import { useAnimatedGestureHandler } from "react-native-reanimated";
import { removeSwippedQuestions, restartQuestions } from '../../../store/actions/questionsAction';
import {
    COLORS,
    FONTS,
    SIZES,
    constants,
    icons,
    images,
    //dummyData
} from '../../../constants';

import { useSelector, useDispatch } from 'react-redux'

import { categories, questions, questions2 } from "../../../constants/dummyData" 

const width = SIZES.widthWindow * 0.7;
const height = width * (425 /294)
const borderRadius = 24
const snapPoints = [-SIZES.widthWindow, 0, SIZES.widthWindow];

const mix = (value, x, y) => {
    "worklet";
    return x * (1 - value) + y * value;
}

const snapPoint = (value, velocity, points) => {
    "worklet";
    const point = value + 0.2 * velocity;
    const deltas = points.map((p) => Math.abs(point - p));
    const minDelta = Math.min.apply(null, deltas);
    return points.filter((p) => Math.abs(point - p) === minDelta)[0];
  };

const CardQuestion = ({animatedIndex, question, index, step, onSwipe, lastUpdate, restartAnimate}) => {
    const translateX = useSharedValue(500);
    const translateY = useSharedValue(0);
    const position = useDerivedValue(() => {
        return index * step - animatedIndex.value   
    });
    //translateY.value = mix(position.value, 0, -50);  
    const flipAnimation = useSharedValue(0);
    const [isFlipped, setIsFlipped] = useState(false)  
    const [isFirstLoad, setIsFirstLoad] = useState(true)
    
    const dispatch = useDispatch()

   useEffect(() =>{
        //restartAnimate()
        translateX.value = withDelay(1000, withSpring(0))
        setIsFirstLoad(false)   
    }, [])
    
    useEffect(() =>{      
        if(!isFirstLoad){ 
            flipAnimation.value = withSpring(0);
            setIsFlipped(false)       
            translateX.value = withSequence(withTiming(390, {duration: 1000}), withSpring(0))
            restartAnimate()
        }
    }, [lastUpdate])
    
    
    const panGestureEvent = useAnimatedGestureHandler({
        onStart: (event, context) => {
            context.translateX = translateX.value
            context.translateY = translateY.value
        },
        onActive: (event, context) => {
            translateX.value = event.translationX + context.translateX;
            translateY.value = event.translationY + context.translateY;
        },
        onEnd: (event) => {
              translateY.value = withSpring(0, {
                velocity: event.velocityY,
              });

              let dest = snapPoint(translateX.value, event.velocityX, snapPoints);

              if(dest !== 0 && dest <= 0){
                  dest = dest - 30
              } 

              translateX.value = withSpring(
                dest,
                {
                  overshootClamping: dest === 0 ? false : true,
                  restSpeedThreshold: dest === 0 ? 0.01 : 100,
                  restDisplacementThreshold: dest === 0 ? 0.01 : 100,
                },
                () => { 
                    if(dest !== 0){
                        runOnJS(onSwipe)(dest, question.id)
                    }
                }
            );
        }
    })


    const flipCard = () =>{
        const config = { damping: 8 };
        if(isFlipped){
            flipAnimation.value = withSpring(0, config)
            setIsFlipped(!isFlipped)
        }else{
            flipAnimation.value = withSpring(180, config)
            setIsFlipped(!isFlipped)
        }    
    }

    const frontStyle = useAnimatedStyle(() => {
        const frontRotateInterpolate = interpolate(flipAnimation.value, [0, 180], [0, 180]);
        const frontOpacityInterpolate = interpolate(flipAnimation.value, [0, 180], [1, 0]);
        const scaleF = mix(position.value, 1, 0.9);
        const trasYF = mix(position.value, 0, -50);
        
        return {
            transform:[
                { translateX: translateX.value },
                { translateY: translateY.value || trasYF },
                { rotateY: frontRotateInterpolate + "deg" },
                { scale: scaleF }
            ],
            opacity: frontOpacityInterpolate
        }

    })

    const backStyle = useAnimatedStyle(() => {
        const backRotateInterpolate = interpolate(flipAnimation.value, [0, 180], [180, 360]);
        const backOpacityInterpolate = interpolate(flipAnimation.value, [0, 180], [0, 1]);
        const scale = mix(position.value, 1, 0.9);
        const trasY = mix(position.value, 0, -50);
        
        return {
            transform:[
                { translateX: translateX.value },
                { translateY: translateY.value || trasY },
                { rotateY: backRotateInterpolate + "deg" },
                { scale }
            ],
            opacity: backOpacityInterpolate
        }
    })


    const categoryQuestion = categories.find((category) => category.id === question?.category)
    
    return(
        <>
        <View style = {{
            ...StyleSheet.absoluteFillObject,
            justifyContent: "center",
            alignItems: "center"
        }}>
            
            <PanGestureHandler onGestureEvent = {panGestureEvent}>
            <Animated.View style = {[styles.cardStyle, backStyle]}>
                <Pressable onPress= {flipCard}>
                    <ImageBackground source = {categoryQuestion.image} style = {styles.cardImageBg} resizeMode = {"cover"}>
                        <View style = {{marginTop: 30, marginBottom: 50, alignItems: "center"}}>
                            <Image source = {categoryQuestion.icon} style = {{
                                width: 35, height: 35
                            }}/>    
                            <Text style = {{color: COLORS.white}}>{categoryQuestion.name}</Text>
                        </View>
                        
                        <Text style = {{color: COLORS.white, fontSize: SIZES.body2, fontWeight: "700", textAlign: "center"}}>{question.question}</Text>
                    </ImageBackground>
                </Pressable>
                
            </Animated.View>


            
            </PanGestureHandler>
            
        </View>

        <View style = {{
            ...StyleSheet.absoluteFillObject,
            justifyContent: "center",
            alignItems: "center"
        }}>
            
            <PanGestureHandler onGestureEvent = {panGestureEvent}>
            <Animated.View style = {[styles.cardStyle, frontStyle ]}>
                <Pressable onPress = {flipCard}>               
                    <View style = {styles.cardBgFlip} >
                        <Text style = {{color: COLORS.white, fontSize: SIZES.body3, fontWeight: "700"}}></Text>
                    </View>
                </Pressable>
                
            </Animated.View>

            </PanGestureHandler>
            
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    cardStyle: {
        width,
        height,
        borderRadius,
    },

    cardImageBg:{
        width,
        height,
        borderRadius,
        overflow: 'hidden',
        alignItems: "center", 
        //justifyContent: "center", 
        paddingHorizontal: 20,
        backfaceVisibility: "hidden",
    },

    cardBgFlip:{
        width,
        height,
        borderRadius,
        backgroundColor: COLORS.primary,
        alignItems: "center", 
        justifyContent: "center", 
        borderColor: COLORS.secondary,
        borderWidth: 1,
        paddingHorizontal: 20,
    }
})

export default CardQuestion;