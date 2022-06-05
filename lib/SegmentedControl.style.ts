import { Dimensions, StyleSheet, ViewStyle } from "react-native";
import { CustomStyleProp } from "./SegmentedControl";
const { width: ScreenWidth } = Dimensions.get("screen");

export const _containerStyle = (width?: number): ViewStyle => ({
  height: 50,
  width: width || ScreenWidth - 32,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  borderRadius: 8,
  backgroundColor: "#F3F5F6",
});

export const _selectedTabStyle = (
  tabs: any[],
  activeTabColor: string,
  translateXAnimation: any,
  width?: number,
): CustomStyleProp => [
  {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8,
    marginVertical: 2,
    marginHorizontal: 2,
    width: (width ? width - 8 : ScreenWidth - 35) / tabs?.length,
    backgroundColor: activeTabColor,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 4,
    transform: [
      {
        translateX: translateXAnimation,
      },
    ],
  },
];

export default StyleSheet.create({
  tab: {
    flex: 1,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "500",
  },
});
