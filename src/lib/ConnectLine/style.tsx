import styled from "styled-components";

const MatchContainer = styled.div<{
  $isLayoutUpAndDown: boolean;
  $size: number | undefined;
}>`
  display: flex;
  ${(props) => props.$isLayoutUpAndDown && `flex-direction: column;`}
  justify-content: space-between;
  height: ${(props) =>
    props.$isLayoutUpAndDown && props.$size ? `${props.$size}px` : `100%`};
  width: ${(props) =>
    !props.$isLayoutUpAndDown && props.$size ? `${props.$size}px` : `100%`};
`;
const SourceContainer = styled.div<{
  $itemCount: number;
  $isLayoutUpAndDown: boolean;
}>`
  display: grid;
  gap: 1rem;
  ${(props) =>
    props.$isLayoutUpAndDown
      ? `grid-template-columns: repeat(${props.$itemCount}, 1fr); align-items: end;`
      : `grid-template-rows: repeat(${props.$itemCount}, 1fr); justify-items: end;`}
`;
const TargetContainer = styled.div<{
  $itemCount: number;
  $isLayoutUpAndDown: boolean;
}>`
  display: grid;
  gap: 1rem;
  ${(props) =>
    props.$isLayoutUpAndDown
      ? `grid-template-columns: repeat(${props.$itemCount}, 1fr);`
      : `grid-template-rows: repeat(${props.$itemCount}, 1fr);`}
`;
const ItemContainer = styled.div<{ $isLayoutUpAndDown: boolean }>`
  display: flex;
  ${(props) => props.$isLayoutUpAndDown && `flex-direction: column;`}
  align-items: center;
  gap: 1rem;
`;
const Dot = styled.div<{
  $color: string;
  $size: number;
}>`
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  border-radius: 50%;
  background-color: ${(props) => props.$color};
  pointer-events: none;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 30px;
    height: 30px;
  }
  @media screen and (max-width: 767px) {
    width: 22px;
    height: 22px;
  }
`;
const Image = styled.img<{
  $size: number;
}>`
  width: ${(props) => props.$size}px;
  border: 0.2rem solid var(--black-color);
  pointer-events: none;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    width: 150px;
  }
  @media screen and (max-width: 767px) {
    width: 100px;
  }
`;
const Text = styled.span<{ $color: string; $fontSize: number }>`
  font-size: ${(props) => props.$fontSize}px;
  color: ${(props) => props.$color};
  font-family: "Pretendard-Bold";
  pointer-events: none;
  @media screen and (min-width: 768px) and (max-height: 1079px) {
    font-size: 3rem;
  }
  @media screen and (max-width: 767px) {
    font-size: 2rem;
  }
`;

export {
  MatchContainer,
  SourceContainer,
  TargetContainer,
  ItemContainer,
  Dot,
  Image,
  Text,
};
