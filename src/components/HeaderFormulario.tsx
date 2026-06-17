import { StyleSheet, Text, View } from "react-native";

type HeaderFormularioProps = {
    titulo: string
    cor: string
}

function HeaderFormulario( { titulo, cor }: HeaderFormularioProps){

    return (

        <View
    style={[
        styles.container,
        { backgroundColor: cor }
    ]}
>
    <Text style={styles.titulo}>
        {titulo}
    </Text>
        </View>

    )

}
    const styles = StyleSheet.create({

  container: {

    height: 140,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    backgroundColor:"#f02c2f",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: {
    width: 0,
    height: 4,
    },
    elevation: 6,
  },

  titulo: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "600",
    marginTop: 24
  },

});
export default HeaderFormulario;