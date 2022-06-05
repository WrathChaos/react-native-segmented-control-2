import React from "react";
import { View, Image, Dimensions } from "react-native";
import SegmentedControl from "./lib/SegmentedControl";

const { width: ScreenWidth } = Dimensions.get("screen");

const App = () => {
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);

  const tabColors = ["red", "green"];

  const renderAdd = () => (
    <Image
      resizeMode="contain"
      source={require("./assets/add.png")}
      style={{
        width: 25,
        height: 25,
        tintColor: currentIndex === 0 ? "#fff" : "#000",
      }}
    />
  );
  const renderMinus = () => (
    <Image
      resizeMode="contain"
      source={require("./assets/minus-button.png")}
      style={{
        width: 25,
        height: 25,
        tintColor: currentIndex === 1 ? "#fff" : "#000",
      }}
    />
  );

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <SegmentedControl
        // tabs={["Income", "Expenses", "Exchange"]}
        tabs={[renderAdd(), renderMinus()]}
        width={ScreenWidth * 0.3}
        activeTextColor="#fff"
        activeTabColor={tabColors[currentIndex]}
        onChange={(index: number) => setCurrentIndex(index)}
      />
      <SegmentedControl
        style={{ marginTop: 32 }}
        tabs={["Income", "Expenses", "Exchange"]}
        onChange={(index: number) => console.log("Index: ", index)}
      />
    </View>
  );
};

export default App;
