import React from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';
import {
    COLORS,
    FONTS,
    SIZES,
    constants,
    images
} from '../constants';

const CardLogoGame = () =>{
    return(
        <View
            style ={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 15
            }}
        >
            <Image 
                source = {images.cardLogo}
                style = {{
                    width: 60,
                    height: 60
                }}    
            />
            <View style = {{marginLeft: 5}}>
                <Text style = {{color: COLORS.primary, fontSize: SIZES.body2, fontWeight: "700"}}>
                    SWIPE
                </Text>
                <Text style = {{color: COLORS.secondary, fontSize: SIZES.body2, marginLeft: 12, fontWeight: "700"}}>
                    CARDS
                </Text>
            </View>
        </View>
    )
}

export default CardLogoGame;