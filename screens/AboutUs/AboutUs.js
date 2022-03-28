import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    StyleSheet
} from 'react-native';
import * as Linking from 'expo-linking';
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
import profileImage from "../../assets/images/profile.jpeg"
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const AboutUs = ({ drawerAnimationStyle, navigation }) => {
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
                    About <Text style = {{fontSize: SIZES.h2, fontWeight: "700", color: COLORS.secondary}}>Me</Text>
                </Text>
            </Header>

            <View style = {{ justifyContent: "center", marginVertical: 20 }}>
                        <Image 
                            source = {images.tonicaAgLogo}
                            style = {{
                            height: 38,
                            width: 116,
                            tintColor: COLORS.primary
                        }}
                    />           
            </View>    

            <ScrollView >
                <View style = {{flex: 1, alignItems: "center", marginHorizontal: 20}}>
                    <Image source={profileImage} style = {{width: 100, height: 100, borderRadius: 50}}/>
                    <Text style = {{marginVertical: 20, fontSize: 20, fontWeight: "bold", color: COLORS.primary}}>Ivanildo <Text style = {{color: COLORS.secondary}}>Pereira</Text></Text>

                    <Text>I'm a developer Frontend JR with 2 years of experience in building websites, web apps and mobile apps, I like to learn
                    different types of technology and challenge myself to improve my knowledges in development.</Text>

                    <View style = {styles.socialView}>
                        <TouchableWithoutFeedback style = {styles.socialButton} onPress={()=> Linking.openURL("https://www.github.com/ivanildoPereira/")}>
                            <Image style = {styles.socialImage}  source={icons.githubIcon}/>
                            <Text style = {styles.socialText}>Github</Text>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback style = {styles.socialButton} onPress={()=> Linking.openURL("https://www.linkedin.com/in/ivanildopconceicao/")}>
                            <Image style = {styles.socialImage} source={icons.linkedinIcon}/>
                            <Text style = {styles.socialText}>Linkedin</Text>
                        </TouchableWithoutFeedback>
                    </View>
                   
                </View>

               

                
            </ScrollView>
            
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    socialView:{
        flexDirection: "row",
        marginTop: 20
    },  
    
    socialButton:{
        justifyContent: "center",
        alignItems: "center",
        padding: 10
    },
    
    socialImage:{
        width: 30,
        height: 30
    },

    socialText:{
        fontWeight: "700"
    }
})

export default AboutUs;