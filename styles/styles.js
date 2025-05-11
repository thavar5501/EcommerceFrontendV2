import {StyleSheet} from "react-native"

export const colors = {
    color1: "#c70049",
    color1_light: "rgba(227,25,99, 1)", 
    color1_light2: "rgba(199,0,73,0.8)",
    color2: "white",
    color3: "rgb(45,45,45)", 
    color4: "transparent",
    color5: "#f2f2f2",
    color6: "#f7f7f7",
}

export const defaultStyle = StyleSheet.create({
    flex: 1,
    padding: 20,  
    backgroundColor:colors.color2
})

export const inputStyling = StyleSheet.create({
    height:50,
    backgroundColor:colors.color2,
    marginVertical:10,
    marginHorizontal:20
})