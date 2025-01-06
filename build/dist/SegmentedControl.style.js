import { StyleSheet } from "react-native";
export default StyleSheet.create({
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
        paddingVertical: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    activeTab: (tabWidth, gap, activeTabColor, slideAnimation) => ({
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
        fontSize: 14,
        textAlign: "center",
        fontWeight: "500",
    },
});
//# sourceMappingURL=SegmentedControl.style.js.map