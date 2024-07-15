import { Animated, StyleSheet } from "react-native";

export default StyleSheet.create<any>({
  container: {
    display: "flex",
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#F3F5F6",
  },
  tab: {
    flex: 1,
    paddingVertical: 8, // iOS Default
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: (tabWidth: number, gap: number, activeTabColor: string, slideAnimation: Animated.Value) => ({
    ...StyleSheet.absoluteFillObject,
    width: tabWidth,
    margin: gap,
    backgroundColor: activeTabColor,
    transform: [{ translateX: slideAnimation }],
    borderRadius: 6,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 4,
  }),
  textStyle: {
    fontSize: 14, // iOS Default
    textAlign: "center",
    fontWeight: "500",
  },
});
