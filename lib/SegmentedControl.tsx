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
  LayoutRectangle,
} from "react-native";
import styles from "./SegmentedControl.style";

type TabItem = string | React.ReactElement;

interface SegmentedControlProps {
  tabs: TabItem[];
  initialIndex?: number;
  activeTextColor?: string;
  activeTabColor?: string;
  gap?: number;
  style?: StyleProp<ViewStyle>;
  tabStyle?: StyleProp<ViewStyle> | ((index: number) => StyleProp<ViewStyle>);
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
  const [slideAnimation] = useState(new Animated.Value(0));
  const [localCurrentIndex, setCurrentIndex] = useState<number>(initialIndex);
  const [tabLayouts, setTabLayouts] = useState<{
    [tabIndex: number]: LayoutRectangle;
  }>({});

  const currentIndex = value ?? localCurrentIndex;

  const handleTabPress = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      onChange && onChange(index);
    },
    [onChange],
  );

  useEffect(() => {
    Animated.spring(slideAnimation, {
      toValue:
        (I18nManager.isRTL ? -1 : 1) * (tabLayouts[currentIndex]?.x || 0),
      stiffness: 180,
      damping: 25,
      mass: 1,
      useNativeDriver: true,
    }).start();
  }, [currentIndex, slideAnimation, tabLayouts]);

  const onLayoutTab = useCallback(
    (index: number, { nativeEvent }: LayoutChangeEvent) => {
      setTabLayouts((prev) => ({ ...prev, [index]: nativeEvent.layout }));
    },
    [],
  );

  const tabSpecificStyle = useCallback(
    (tabIndex: number) => {
      if (typeof tabStyle === "function") {
        return tabStyle(tabIndex);
      }

      return tabStyle;
    },
    [tabStyle],
  );

  const renderSelectedTab = useCallback(
    () => (
      <Animated.View
        style={[
          styles.activeTab(
            tabLayouts[currentIndex]?.width || 0,
            gap,
            activeTabColor,
            slideAnimation,
          ),
          selectedTabStyle,
        ]}
      />
    ),
    [
      activeTabColor,
      gap,
      selectedTabStyle,
      slideAnimation,
      tabLayouts,
      currentIndex,
    ],
  );

  const renderTab = (tab: TabItem, index: number) => {
    const isActiveTab = currentIndex === index;
    const isTabText = typeof tab === "string";
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={0.5}
        style={[styles.tab, tabSpecificStyle(index)]}
        onPress={() => handleTabPress(index)}
        onLayout={(e) => onLayoutTab(index, e)}
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
    <View style={[styles.container, style]}>
      {renderSelectedTab()}
      <View style={[styles.tabsContainer, { marginHorizontal: gap }]}>
        {tabs.map((tab, index: number) => renderTab(tab, index))}
      </View>
    </View>
  );
};

export default SegmentedControl;
