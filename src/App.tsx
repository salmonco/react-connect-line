import React, { useEffect, useState } from "react";
import "./App.css";
import { ConnectLine, ItemsProps } from "./lib/index";

function App() {
  const [items, setItems] = useState<ItemsProps[]>([]);
  const [isCorrectMatch, setIsCorrectMatch] = useState(false);

  useEffect(() => {
    const items = [
      {
        source: { text: "one" },
        target: { text: "1" },
      },
      {
        source: { text: "two" },
        target: { text: "2" },
      },
      {
        source: { text: "three" },
        target: { text: "3" },
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
      containerSize={500}
      lineColor="orange"
      lineWidth={10}
      dotColor="orange"
      dotSize={46}
      fontSize={24}
    />
  );
}

export default App;
