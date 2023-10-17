import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import baseStyles from "../styles/baseStyles";
import Ionicons from "@expo/vector-icons/Ionicons";

const BackHeader = ({ pageTitle }) => {
  const router = useRouter();

  return (
    <View style={styles.headerContainer}>
      <Pressable
        testID="back-button"
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={32} />
      </Pressable>
      <Text style={[styles.Title3, styles.pageTitle]} title="test">
        {pageTitle}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  ...baseStyles,
});

export default BackHeader;
