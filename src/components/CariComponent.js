import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const CariComponent = ({
  handleSearchInput,
  handleSort,
  placeholder,
  sortTitle,
}) => {
  return (
    <View style={styles.container}>
      <AntDesign
        name="search1"
        size={20}
        color="#aaa"
        style={{ alignSelf: "center" }}
      />
      <TextInput
        placeholder={placeholder}
        style={styles.search}
        onChangeText={(text) => handleSearchInput(text)}
      />
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: "center",

          backgroundColor: "white",
          borderRadius: 4,
        }}
        onPress={handleSort}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "orange", fontSize: 16 }}>{sortTitle}</Text>
          <AntDesign
            name="down"
            size={20}
            color="orange"
            style={{ alignSelf: "center" }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  search: {
    flex: 3,
  },
});
export default CariComponent;
