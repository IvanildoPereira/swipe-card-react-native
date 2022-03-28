import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Switch
} from 'react-native';
import {
    COLORS,
    FONTS,
    SIZES,
    constants,
    icons,
    images,
} from '../../constants';
import Animated from 'react-native-reanimated';
import { CardLogoGame, Header } from '../../components/';
import { categories, questions } from '../../constants/dummyData'
import { useSelector, useDispatch } from 'react-redux'
import { updateFilterdCategories } from '../../store/actions/questionsAction';

const FilterQuestions = ({ drawerAnimationStyle, navigation }) => {
    const filterdCategories = useSelector((state) => {
        return state.questionsReducer.filterdCategories
    })
    const dispatch = useDispatch()

    const handleUpdateFilterdCategories = (categoryID) =>{
        dispatch(updateFilterdCategories(categoryID))
    }

    const sortedCategories = categories.sort((a,b) => {
        if ( a.name < b.name ){
            return -1;
          }
          if ( a.name > b.name ){
            return 1;
          }
          return 0;
    })

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
            >
                <Text style = {{fontSize: SIZES.h2, fontWeight: "700", color: COLORS.primary}}>
                    Filter <Text style = {{fontSize: SIZES.h2, fontWeight: "700", color: COLORS.secondary}}>Questions</Text>
                </Text>
            </Header>
            <CardLogoGame />
            <View style = {{flex: 1}} >
                <Text style = {{fontSize: SIZES.body2, fontWeight: "bold", color: COLORS.primary, textAlign: "center", marginVertical: 20}}>
                    Categories
                </Text>
                <View style = {{flexDirection: "row", flexWrap: "wrap", marginHorizontal: SIZES.widthWindow * 0.05}}>
                    {
                        sortedCategories.map((category, index) => (
                            <View key = {category.id} style = {{flexDirection: "row",  alignItems: "center", width: SIZES.widthWindow * 0.3, marginBottom: 20}}>
                                <Switch
                                    value = {filterdCategories.includes(category.id)}
                                    trackColor={{ false: "#767577", true: "rgba(80, 10, 77, 0.5)" }}
                                    thumbColor={filterdCategories.includes(category.id) ? COLORS.primary : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onChange = {() => handleUpdateFilterdCategories(category.id)}
                                    style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                                />
                                <Text style = {{marginRight: 8}}>{category.name}</Text>
                            </View>
                        ))
                    }
                </View>
                
                <View style = {{justifyContent: "center", alignItems: "center", marginVertical: 40}}>
                {/* <TouchableOpacity style = {{justifyContent: "center", alignItems: "center", width: SIZES.widthWindow * 0.6, height: 50, backgroundColor: COLORS.primary, borderRadius: 10}}>
                    <Text style = {{fontSize: SIZES.body3, fontWeight: "bold", color: "#fff"}}>Save</Text>
                </TouchableOpacity> */}
                </View>
            </View>
            
        </Animated.View>
    )
}

export default FilterQuestions;