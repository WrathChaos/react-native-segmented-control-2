import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Animated,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  TextStyle,
  I18nManager,
  LayoutChangeEvent,
} from "react-native";
import styles from "./SegmentedControl.style";

interface SegmentedControlProps {
  tabs: any[];
  initialIndex?: number;
  activeTextColor?: string;
  activeTabColor?: string;
  gap?: number;
  style?: StyleProp<ViewStyle>;
  tabStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  activeTextStyle?: StyleProp<TextStyle>;
  selectedTabStyle?: StyleProp<ViewStyle>;
  onChange: (index: number) => void;
  value?: number;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({
  style,
  tabs,
  onChange,
  value,
  tabStyle,
  textStyle,
  activeTextStyle,
  selectedTabStyle,
  initialIndex = 0,
  gap = 2,
  activeTextColor = "#000",
  activeTabColor = "#fff",
}) => {
  const [slideAnimation, _] = useState(new Animated.Value(0));
  const [width, setWidth] = useState<number>(0);
  const translateValue = width / tabs.length;
  const tabWidth = Math.max(width / tabs.length - gap * 2, 0);
  const [localCurrentIndex, setCurrentIndex] = useState<number>(initialIndex);
  const currentIndex = value ?? localCurrentIndex;

  const handleTabPress = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      onChange && onChange(index);
    },
    [onChange],
  );

  const handleLayout = useCallback(
    ({ nativeEvent }: LayoutChangeEvent) => {
      setWidth(nativeEvent.layout.width);
    },
    [setWidth],
  );

  useEffect(() => {
    Animated.spring(slideAnimation, {
      toValue: (I18nManager.isRTL ? -1 : 1) * currentIndex * translateValue,
      stiffness: 180,
      damping: 25,
      mass: 1,
      useNativeDriver: true,
    }).start();
  }, [currentIndex, slideAnimation, translateValue]);

  const renderSelectedTab = useCallback(
    () => (
      <Animated.View
        style={[
          styles.activeTab(tabWidth, gap, activeTabColor, slideAnimation),
          selectedTabStyle,
        ]}
      />
    ),
    [activeTabColor, gap, selectedTabStyle, slideAnimation, tabWidth],
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
              isActiveTab && activeTextStyle,
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
    <View style={[styles.container, style]} onLayout={handleLayout}>
      {renderSelectedTab()}
      {tabs.map((tab, index: number) => renderTab(tab, index))}
    </View>
  );
};

export default SegmentedControl;
