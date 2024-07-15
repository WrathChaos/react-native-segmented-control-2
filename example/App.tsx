import React from "react";
import { View, Image, Dimensions, Text } from "react-native";
import SegmentedControl from "./lib/SegmentedControl";

const { width: ScreenWidth } = Dimensions.get("screen");

const book = require("./assets/book.png");
const glasses = require("./assets/glasses.png");
const history = require("./assets/history.png");

const App = () => {
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [selectedGPT, setSelectedGPT] = React.useState<number>(0);

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

  const renderImage = (imageSource: any) => (
    <Image
      resizeMode="contain"
      source={imageSource}
      style={{
        width: imageSource === glasses ? 30 : 20,
        height: imageSource === glasses ? 30 : 20,
      }}
    />
  );

  const renderGPT3 = () => (
    <View style={{
      flexDirection: "row",
      alignItems: "center"}}>
      <Image
        resizeMode="contain"
        source={require("./assets/bolt.png")}
        style={{
          width: 15,
          height: 15,
          tintColor: selectedGPT === 0 ?"#FFC66D" : "#9494A4",
        }}

      />
      <Text style={{ marginLeft: 5,color: selectedGPT === 0 ? "#010101" : "#9494A4", fontWeight:"bold"}}>GPT-3.5</Text>
    </View>
  );


  const renderGPT4o = () => (
    <View style={{
      flexDirection: "row",
      alignItems: "center"}}>
      <Image
        resizeMode="contain"
        source={require("./assets/stars-2.png")}
        style={{
          width: 20,
          height: 20,
          tintColor: selectedGPT === 1 ? "#A26BF7" : "#9494A4",
        }}

      />
      <Text style={{ marginLeft: 5,color: selectedGPT === 1 ? "#010101" : "#9494A4", fontWeight:"bold"}}>GPT-4o</Text>
    </View>
  );


  // @ts-ignore
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <SegmentedControl
        tabs={[renderAdd(), renderMinus()]}
        activeTextColor="#fff"
        style={{width: ScreenWidth * 0.3}}
        activeTabColor={tabColors[currentIndex]}
        onChange={(index: number) => setCurrentIndex(index)}
      />
      <SegmentedControl
        tabs={[renderImage(book), renderImage(glasses), renderImage(history)]}
        style={{ height: 35, marginTop: 32, backgroundColor: "#EEEEEE" }}
        activeTabColor="#FFFFFF"
        onChange={(index: number) => console.log("Index: ", index)}
      />
      <SegmentedControl
        style={{ marginTop: 32,height: 55 }}
        tabs={[renderGPT3(), renderGPT4o()]}
        gap={5}
        initialIndex={1}
        onChange={(index: number) => setSelectedGPT(index)}
      />
      <SegmentedControl
        style={{ marginTop: 32 }}
        tabs={["Income", "Expenses", "Exchange"]}
        onChange={(index: number) => console.log("Index: ", index)}
      />
      <SegmentedControl
        style={{ marginTop: 32, backgroundColor: "#87C4FD" }}
        activeTabColor="#0581F7"
        activeTextColor="#fff"
        tabs={["Label 1", "Label 2", "Label 3"]}
        onChange={(index: number) => console.log("Index: ", index)}
      />
      <SegmentedControl
        style={{ marginTop: 32, backgroundColor: "#f7e6b7" }}
        activeTabColor="#fcba03"
        activeTextColor="#fff"
        tabs={["Label 1", "Label 2", "Label 3"]}
        onChange={(index: number) => console.log("Index: ", index)}
      />
      <SegmentedControl
        style={{ marginTop: 32, backgroundColor: "#ffe0e0" }}
        activeTabColor="#ff2929"
        activeTextColor="#fff"
        tabs={["Label 1", "Label 2", "Label 3"]}
        onChange={(index: number) => console.log("Index: ", index)}
      />
    </View>
  );
};

export default App;
