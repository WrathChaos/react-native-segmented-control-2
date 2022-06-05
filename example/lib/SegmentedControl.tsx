import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Animated,
  StyleProp,
  ViewStyle,
  Dimensions,
  TouchableOpacity,
  TextStyle,
} from "react-native";
/**
 * ? Local Imports
 */
import styles, {
  _containerStyle,
  _selectedTabStyle,
} from "./SegmentedControl.style";

const { width: ScreenWidth } = Dimensions.get("screen");

export type CustomStyleProp =
  | StyleProp<ViewStyle>
  | Array<StyleProp<ViewStyle>>;
type CustomTextStyleProp = StyleProp<TextStyle> | Array<StyleProp<TextStyle>>;

interface SegmentedControlProps {
  style?: CustomStyleProp;
  tabs: any[];
  width?: number;
  initialIndex?: number;
  activeTextColor?: string;
  activeTabColor?: string;
  tabStyle?: CustomStyleProp;
  textStyle?: CustomTextStyleProp;
  onChange: (index: number) => void;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({
  style,
  tabs,
  width,
  onChange,
  initialIndex = 0,
  tabStyle,
  textStyle,
  activeTextColor = "#000",
  activeTabColor = "#fff",
}) => {
  const translateValue = (width ? width : ScreenWidth - 35) / tabs.length;
  const [slideAnimation, _] = useState(new Animated.Value(0));
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);

  const handleTabPress = React.useCallback((index) => {
    setCurrentIndex(index);
    onChange && onChange(index);
  }, []);

  useEffect(() => {
    Animated.spring(slideAnimation, {
      toValue: currentIndex * translateValue,
      stiffness: 180,
      damping: 25,
      mass: 1,
      useNativeDriver: true,
    }).start();
  }, [currentIndex]);

  const renderSelectedTab = () => (
    <Animated.View
      style={[_selectedTabStyle(tabs, activeTabColor, slideAnimation, width)]}
    />
  );

  const renderTab = (tab: any, index: number) => {
    const isActiveTab = currentIndex === index;
    const isTabText = typeof tab === "string";
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={0.5}
        style={[styles.tab, tabStyle]}
        onPress={() => handleTabPress(index)}
      >
        {!isTabText ? (
          tab
        ) : (
          <Text
            numberOfLines={1}
            style={[
              styles.textStyle,
              isActiveTab && { color: activeTextColor },
              textStyle,
            ]}
          >
            {tab}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <Animated.View style={[_containerStyle(width), style]}>
      {renderSelectedTab()}
      {tabs.map((tab, index: number) => renderTab(tab, index))}
    </Animated.View>
  );
};

export default SegmentedControl;
