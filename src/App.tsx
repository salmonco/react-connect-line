import React, { useEffect, useState } from "react";
import "./App.css";
import { ConnectLine, ItemsProps } from "./lib/index";

function App() {
  const [items, setItems] = useState<ItemsProps[]>([]);
  const [isCorrectMatch, setIsCorrectMatch] = useState(false);

  useEffect(() => {
    const items = [
      {
        source: { text: "one", imageURL: "/src/assets/react.svg" },
        target: { text: "1" },
      },
      {
        source: { text: "two" },
        target: { text: "2" },
      },
      {
        source: { text: "three" },
        target: { text: "3", imageURL: "/src/assets/react.svg" },
      },
    ];

    setItems(items);
  }, []);

  console.log(isCorrectMatch);

  return (
    <ConnectLine
      items={items}
      isLayoutUpAndDown={true}
      setIsCorrectMatch={setIsCorrectMatch}
      containerSize={700}
      lineColor="orange"
      lineWidth={10}
      dotColor="orange"
      dotSize={46}
      fontSize={24}
      imageSize={50}
    />
  );
}

export default App;
