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

const Header = ({ containerStyles, title, children, leftComponent, rightComponent } ) =>{
    return(
        <View
            style ={{
                flexDirection: "row",
                ...containerStyles
            }}
        >
            {leftComponent}
            <View
                style = {{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                {title !== "home" && children}
            </View>
            {rightComponent}
        </View>
    )
}

export default Header;