import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Animated, TouchableOpacity, I18nManager, } from "react-native";
import styles from "./SegmentedControl.style";
const SegmentedControl = ({ style, tabs, onChange, value, tabStyle, textStyle, selectedTabStyle, initialIndex = 0, gap = 2, activeTextColor = "#000", activeTabColor = "#fff", }) => {
    const [slideAnimation, _] = useState(new Animated.Value(0));
    const [width, setWidth] = useState(0);
    const tabWidth = Math.max(width / tabs.length - gap * 2, 0);
    const [localCurrentIndex, setCurrentIndex] = useState(initialIndex);
    const [tabLayouts, setTabLayouts] = useState({});
    const currentIndex = value ?? localCurrentIndex;
    const handleTabPress = useCallback((index) => {
        setCurrentIndex(index);
        onChange && onChange(index);
    }, [onChange]);
    const handleLayout = useCallback(({ nativeEvent }) => {
        setWidth(nativeEvent.layout.width);
    }, [setWidth]);
    useEffect(() => {
        Animated.spring(slideAnimation, {
            toValue: (I18nManager.isRTL ? -1 : 1) * (tabLayouts[currentIndex]?.x || 0),
            stiffness: 180,
            damping: 25,
            mass: 1,
            useNativeDriver: true,
        }).start();
    }, [currentIndex, slideAnimation, tabLayouts]);
    const onLayoutTab = useCallback((index, { nativeEvent }) => {
        setTabLayouts(prev => ({ ...prev, [index]: nativeEvent.layout }));
    }, []);
    const renderSelectedTab = useCallback(() => (<Animated.View style={[
        styles.activeTab(tabWidth, gap, activeTabColor, slideAnimation),
        selectedTabStyle,
    ]}/>), [activeTabColor, gap, selectedTabStyle, slideAnimation, tabWidth]);
    const renderTab = (tab, index) => {
        const isActiveTab = currentIndex === index;
        const isTabText = typeof tab === "string";
        return (<TouchableOpacity key={index} activeOpacity={0.5} style={[styles.tab, tabStyle]} onPress={() => handleTabPress(index)} onLayout={e => onLayoutTab(index, e)}>
        {!isTabText ? (tab) : (<Text numberOfLines={1} style={[
            styles.textStyle,
            textStyle,
            isActiveTab && { color: activeTextColor },
        ]}>
            {tab}
          </Text>)}
      </TouchableOpacity>);
    };
    return (<View style={[styles.container, style]} onLayout={handleLayout}>
      {renderSelectedTab()}
      {tabs.map((tab, index) => renderTab(tab, index))}
    </View>);
};
export default SegmentedControl;
//# sourceMappingURL=SegmentedControl.js.map
//# sourceMappingURL=SegmentedControl.js.map