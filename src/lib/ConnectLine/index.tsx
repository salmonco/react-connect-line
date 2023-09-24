import { useConnectLine } from "./useConnectLine";
import * as Style from "./style";

type ContentProps = {
  imageURL?: string;
  text?: string;
};
type ItemsProps = {
  source: ContentProps;
  target: ContentProps;
};
export type { ItemsProps };
type MatchContainerProps = {
  items: ItemsProps[];
  isLayoutUpAndDown?: boolean;
  setIsCorrectMatch?: React.Dispatch<React.SetStateAction<boolean>>;
  containerSize?: number;
  lineColor?: string;
  lineWidth?: number;
  dotColor?: string;
  dotSize?: number;
  textColor?: string;
  fontSize?: number;
  imageSize?: number;
};

export default function MatchContainer({
  items,
  isLayoutUpAndDown,
  setIsCorrectMatch,
  containerSize,
  lineColor,
  lineWidth,
  dotColor,
  dotSize,
  textColor,
  fontSize,
  imageSize,
}: MatchContainerProps) {
  const {
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
  } = useConnectLine(
    items,
    dotSize ?? 46,
    isLayoutUpAndDown ?? false,
    setIsCorrectMatch
  );

  return (
    <Style.MatchContainer
      $isLayoutUpAndDown={isLayoutUpAndDown ?? false}
      $size={containerSize}
    >
      <Style.SourceContainer
        $itemCount={itemCount}
        $isLayoutUpAndDown={isLayoutUpAndDown ?? false}
      >
        {sources.map((v) => (
          <Style.ItemContainer
            key={v.id}
            ref={(el) => (sourceRefs.current[sourceRefs.current.length] = el)}
            id={`source-${v.id}`}
            draggable
            onDragStart={dragStartHandler}
            onDragEnd={dragEndHandler}
            onDrag={dragHandler}
            onDragOver={dragOverHandler}
            onTouchStart={dragStartHandler}
            onTouchMove={dragHandler}
            onTouchEnd={dragEndHandler}
            $isLayoutUpAndDown={isLayoutUpAndDown ?? false}
          >
            {v.imageURL && (
              <Style.Image alt="" src={v.imageURL} $size={imageSize ?? 300} />
            )}
            {v.text && (
              <Style.Text
                $color={textColor ?? `black`}
                $fontSize={fontSize ?? 50}
              >
                {v.text}
              </Style.Text>
            )}
            <Style.Dot $color={dotColor ?? `black`} $size={dotSize ?? 46} />
          </Style.ItemContainer>
        ))}
      </Style.SourceContainer>
      <Style.TargetContainer
        $itemCount={itemCount}
        $isLayoutUpAndDown={isLayoutUpAndDown ?? false}
      >
        {targets.map((v) => (
          <Style.ItemContainer
            key={v.id}
            ref={(el) => (targetRefs.current[targetRefs.current.length] = el)}
            id={`target-${v.id}`}
            draggable
            onDragStart={dragStartHandler}
            onDragEnd={dragEndHandler}
            onDrag={dragHandler}
            onDragOver={dragOverHandler}
            onTouchStart={dragStartHandler}
            onTouchMove={dragHandler}
            onTouchEnd={dragEndHandler}
            $isLayoutUpAndDown={isLayoutUpAndDown ?? false}
          >
            <Style.Dot $color={dotColor ?? `black`} $size={dotSize ?? 46} />
            {v.imageURL && (
              <Style.Image alt="" src={v.imageURL} $size={imageSize ?? 300} />
            )}
            {v.text && (
              <Style.Text
                $color={textColor ?? `black`}
                $fontSize={fontSize ?? 50}
              >
                {v.text}
              </Style.Text>
            )}
          </Style.ItemContainer>
        ))}
      </Style.TargetContainer>
      {lines.map(
        (line) =>
          line.startCoord &&
          line.endCoord && (
            <svg
              key={`(${line.startCoord.x},${line.startCoord.y})`}
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                pointerEvents: "none",
              }}
            >
              {line.startCoord && line.endCoord && (
                <line
                  x1={line.startCoord.x}
                  y1={line.startCoord.y}
                  x2={line.endCoord.x}
                  y2={line.endCoord.y}
                  stroke={lineColor ?? `black`}
                  strokeWidth={lineWidth ?? 10}
                />
              )}
            </svg>
          )
      )}
    </Style.MatchContainer>
  );
}
