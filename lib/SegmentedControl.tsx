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
  I18nManager
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
  tabs: any[];
  width?: number;
  initialIndex?: number;
  activeTextColor?: string;
  activeTabColor?: string;
  extraSpacing?: number;
  style?: CustomStyleProp;
  tabStyle?: CustomStyleProp;
  textStyle?: CustomTextStyleProp;
  selectedTabStyle?: CustomStyleProp;
  onChange: (index: number) => void;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({
  style,
  tabs,
  width,
  onChange,
  tabStyle,
  textStyle,
  selectedTabStyle,
  initialIndex = 0,
  activeTextColor = "#000",
  activeTabColor = "#fff",
  extraSpacing = 0,
}) => {
  const translateValue =
    (width ? width + extraSpacing : ScreenWidth - 35) / tabs.length;
  const [slideAnimation, _] = useState(new Animated.Value(0));
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);

  const handleTabPress = React.useCallback((index) => {
    setCurrentIndex(index);
    onChange && onChange(index);
  }, []);

  useEffect(() => {
    Animated.spring(slideAnimation, {
      toValue: (I18nManager.isRTL ? -1 : 1) * currentIndex * translateValue,
      stiffness: 180,
      damping: 25,
      mass: 1,
      useNativeDriver: true,
    }).start();
  }, [currentIndex]);

  const renderSelectedTab = () => (
    <Animated.View
      style={[
        _selectedTabStyle(tabs, activeTabColor, slideAnimation, width),
        selectedTabStyle,
      ]}
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
              textStyle,
              isActiveTab && { color: activeTextColor },
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
