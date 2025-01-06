import React from "react";
import { StyleProp, ViewStyle, TextStyle } from "react-native";
interface SegmentedControlProps {
    tabs: any[];
    initialIndex?: number;
    activeTextColor?: string;
    activeTabColor?: string;
    gap?: number;
    style?: StyleProp<ViewStyle>;
    tabStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    selectedTabStyle?: StyleProp<ViewStyle>;
    onChange: (index: number) => void;
    value?: number;
}
declare const SegmentedControl: React.FC<SegmentedControlProps>;
export default SegmentedControl;
