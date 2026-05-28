import { StyleSheet, TextInput, TextInputProps } from "react-native"

export function Input ({...rest }: TextInputProps) {
    return (
    <TextInput 
    style ={styles.Input} 
    placeholderTextColor="#000"
    {...rest} 
    />
)

}

const styles = StyleSheet.create({
    Input: {
        height: 48,
        width: "100%" ,
        borderWidth: 1,
        borderColor: "#DCDCDC",
        borderRadius: 8,
        fontSize: 16,
        paddingLeft: 12,
        color : "#000000",
 
    },
})
