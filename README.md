# react-connect-line

You can match your react components by connecting the dots with lines.

## Screenshot

<img width="626" alt="스크린샷" src="https://github.com/salmonco/react-connect-line/assets/86469788/9065c942-7d6c-409a-b53f-f9c010756ab6">

## Installation

```
npm install react-connect-line
```

## Usage

```typescript
import { useState, useEffect } from "react";
import { ConnectLine, ItemsProps } from 'react-connect-line';

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
      setIsCorrectMatch={setIsCorrectMatch}
      containerSize={800}
      lineColor="orange"
      lineWidth={10}
      dotColor="orange"
      dotSize={46}
      fontSize={24}
    />
  );
}

export default App;
```

## Props

|Prop|Description|Type|Default|
|---|---|---|---|
|items|Contents to connect with a line|ItemsProps[]|required|
|isLayoutUpAndDown|Whether the source and target are placed top and bottom|boolean|false|
|setIsCorrectMatch|A function to store information about whether the source and target are correctly paired|React.Dispatch<React.SetStateAction<boolean>>|undefined|
|containerSize|Size of the ConnectLine component (height if the layout is top or bottom, width if the layout is on both sides)|number|100%|
|lineColor|Color of the line connecting the dots|string|black|
|lineWidth|Width of the line connecting the dots|number|10|
|dotColor|Color of the dot|string|black|
|dotSize|Size of the dot (width and height are the same)|number|46|
|textColor|Color of the item's text|string|black|
|fontSize|Size of the item's text|number|50|
|imageSize|Size of the item's image|number|300|

## Contributing

Contributions are always welcome!

## License

MIT
