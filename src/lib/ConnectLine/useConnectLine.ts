import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ItemsProps } from ".";

type CoordInfo = {
  top: number;
  left: number;
  bottom: number;
  right: number;
  id: string;
};
type LineInfo = {
  startCoord: { x: number; y: number };
  startItem: string;
  endCoord: { x: number; y: number };
  endItem: string | null;
};

export const useConnectLine = (
  items: ItemsProps[],
  dotSize: number,
  isLayoutUpAndDown: boolean,
  setIsCorrectMatch?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const sourceRefs = useRef<HTMLDivElement[] | null[]>([]);
  const targetRefs = useRef<HTMLDivElement[] | null[]>([]);
  const [boxs, setBoxs] = useState<CoordInfo[]>([]);
  const [lines, setLines] = useState<LineInfo[]>([]);
  const itemCount = items.length;
  const sources = useMemo(
    () =>
      items
        .map((v, i) => {
          return { ...v.source, id: i };
        })
        .sort(() => Math.random() - 0.5),
    [items]
  );
  const targets = useMemo(
    () =>
      items
        .map((v, i) => {
          return { ...v.target, id: i };
        })
        .sort(() => Math.random() - 0.5),
    [items]
  );

  const isCorrect = useCallback(() => {
    if (
      lines.length !== itemCount ||
      lines.some(
        (line) => line.startItem.split("-")[1] !== line.endItem?.split("-")[1]
      )
    ) {
      return false;
    }
    return true;
  }, [lines, itemCount]);

  useEffect(() => {
    if (setIsCorrectMatch) {
      setIsCorrectMatch(isCorrect());
    }
  }, [lines, isCorrect, setIsCorrectMatch]);

  useEffect(() => {
    const setPosition = (
      refs: React.MutableRefObject<HTMLDivElement[] | null[]>,
      setState: React.Dispatch<React.SetStateAction<CoordInfo[]>>
    ) => {
      for (let i = 0; i < itemCount; i++) {
        const ref = refs?.current[i];
        const rect = ref?.getBoundingClientRect();

        if (ref && rect && typeof rect.top === "number") {
          setState((prev) => [
            ...prev,
            {
              top: rect.top,
              left: rect.left,
              bottom: rect.bottom,
              right: rect.right,
              id: ref.id,
            },
          ]);
        }
      }
    };

    setPosition(sourceRefs, setBoxs);
    setPosition(targetRefs, setBoxs);
  }, [itemCount]);

  const createLine = (
    startCoord: { x: number; y: number },
    startItem: string,
    endCoord: { x: number; y: number }
  ) => {
    const newLine: LineInfo = {
      startCoord,
      startItem,
      endCoord,
      endItem: null,
    };
    const existingStartLineIndex = lines.findIndex(
      (line) => line.startItem === startItem
    );
    const existingEndLineIndex = lines.findIndex(
      (line) => line.endItem === startItem
    );

    if (existingStartLineIndex !== -1) {
      deleteLine(startItem);
    }
    if (existingEndLineIndex !== -1) {
      const item = lines[existingEndLineIndex].startItem;

      if (item) {
        deleteLine(item);
      }
    }
    setLines((lines) => [...lines, newLine]);
  };

  const updateLine = (
    startItem: string,
    endCoord: { x: number; y: number },
    endItem?: string
  ) => {
    const updatedLines = [...lines];
    const index = updatedLines.findIndex(
      (line) => line.startItem === startItem
    );

    updatedLines[index] = {
      ...updatedLines[index],
      endCoord,
      endItem: endItem ?? null,
    };
    setLines(updatedLines);
  };

  const deleteLine = (startItem: string) => {
    setLines((lines) => lines.filter((line) => line.startItem !== startItem));
  };

  const getClientXY = (
    e: React.DragEvent<HTMLElement> | React.TouchEvent<HTMLElement>
  ) => {
    let [clientX, clientY] = [0, 0];

    if ("touches" in e && e.touches.length > 0) {
      // 터치 이벤트일 경우
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ("clientX" in e) {
      // 드래그 이벤트일 경우
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return [clientX, clientY];
  };

  const findBox = (boxs: CoordInfo[], id: string) => {
    return boxs.find((box) => box.id === id);
  };

  const getDotCoord = (id: string) => {
    const box = findBox(boxs, id);
    const str = id.split("-")[0];
    const half = dotSize / 2;

    if (box) {
      if (isLayoutUpAndDown) {
        return {
          x: (box.left + box.right) / 2,
          y: str === "source" ? box.bottom - half : box.top + half,
        };
      }
      return {
        x: str === "source" ? box.right - half : box.left + half,
        y: (box.top + box.bottom) / 2,
      };
    }
  };

  const dragStartHandler = (
    e: React.DragEvent<HTMLElement> | React.TouchEvent<HTMLElement>
  ) => {
    const [clientX, clientY] = getClientXY(e);
    const id = (e.target as HTMLElement).id;
    const startCoord = getDotCoord(id);
    const endCoord = { x: clientX, y: clientY };

    if (startCoord) {
      createLine(startCoord, id, endCoord);
    }
  };

  const dragHandler = (
    e: React.DragEvent<HTMLElement> | React.TouchEvent<HTMLElement>
  ) => {
    const [clientX, clientY] = getClientXY(e);
    const id = (e.target as HTMLElement).id;

    updateLine(id, { x: clientX, y: clientY });
  };

  const isInBox = (box: CoordInfo, x: number, y: number) => {
    return box.left < x && x < box.right && box.top < y && y < box.bottom;
  };

  const isSameSourceAndTarget = (str1: string, str2: string) => {
    return (
      (str1 === "source" && str2 === "source") ||
      (str1 === "target" && str2 === "target")
    );
  };

  const dragEndHandler = (
    e: React.DragEvent<HTMLElement> | React.TouchEvent<HTMLElement>
  ) => {
    let [clientX, clientY] = [0, 0];
    const id = (e.target as HTMLElement).id;
    const [str] = (e.target as HTMLElement).id.split("-");

    if ("touches" in e && e.changedTouches.length > 0) {
      const lastTouch = e.changedTouches[e.changedTouches.length - 1];

      clientX = lastTouch.clientX;
      clientY = lastTouch.clientY;
    } else if ("clientX" in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    for (const box of boxs) {
      if (isInBox(box, clientX, clientY)) {
        const boxId = box.id;
        const [boxStr] = boxId.split("-");

        if (!isSameSourceAndTarget(str, boxStr)) {
          const endCoord = getDotCoord(boxId);

          if (endCoord) {
            updateLine(id, endCoord, boxId);
          }
          return;
        }
        break;
      }
    }
    deleteLine(id);
  };

  const dragOverHandler = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
  };

  return {
    itemCount,
    sources,
    targets,
    lines,
    sourceRefs,
    targetRefs,
    dragStartHandler,
    dragHandler,
    dragEndHandler,
    dragOverHandler,
  };
};
