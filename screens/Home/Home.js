import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { useSharedValue, withTiming, useDerivedValue, withSpring, cancelAnimation } from "react-native-reanimated";
import CardQuestion from './components/CardQuestion';
import { removeSwippedQuestions, restartQuestions } from '../../store/actions/questionsAction';





const Home = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isRestarting, setIsRestarting] = useState(false);
    const [lastCardPositionSwiped, setLastCardPositionSwiped] = useState(0);
    const value = useSharedValue(0);
    const filterdCategories = useSelector(state => state.questionsReducer.filterdCategories)
    const questions = useSelector(state => state.questionsReducer.questions.filter((question) => {
        return filterdCategories.includes(question.category)
    }))

    //const questions = useSelector(state => state.questionsReducer.questions)
    const lastUpdate = useSelector(state => state.questionsReducer.lastUpdate)
    const dispatch = useDispatch()

    const step = 1 / (questions?.length);

    useEffect(() => {
        value.value = currentIndex
    }, [currentIndex, value]);

    const animatedIndex = useDerivedValue(() => {
        return withTiming(value.value);
    });

    const handleOnSwipe = (dest) =>{
        setCurrentIndex((prev) => prev + step)       
    }

    const restartAnimate = () =>{       
        setCurrentIndex(0)
    }

   
    
    return (
        <>
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            {questions.length === 0 && <Text>There aren't any card, change the filters to get more cards</Text>}
            {currentIndex > 0.9 && <Text>Reload to get more Cards</Text>}
            {questions?.map((question, index) => (
                (   
                    <CardQuestion 
                        key = {question.id} 
                        animatedIndex = {animatedIndex} 
                        index = {((questions.length - index) - 1)}  
                        step = {step} 
                        question = {question}
                        onSwipe = {handleOnSwipe}
                        lastUpdate = {lastUpdate}
                        lastCardPositionSwiped = {lastCardPositionSwiped}
                        restartAnimate = {restartAnimate}
                        />
                )
                
            ))}
        </View>
        </>
    )
}

export default Home;