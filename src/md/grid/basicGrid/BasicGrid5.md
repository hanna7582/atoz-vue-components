## 셀 영역
- 자식 컨테이너에 적용

**주요 속성**
- grid-row-start 행 라인 시작
- grid-row-end 행 라인 끝
- grid-row 행 라인 시작과 끝
- grid-column-start 열 라인 시작
- grid-column-end 열 라인 끝
- grid-column 열 라인 시작과 끝
- grid-area 행 열 라인 시작과 끝

**예시**
```css
.grid-container {
  grid-row-start: 1;
  grid-row-end: 3;
  grid-row: 1 / 3; /* 1 / span 2;*/
  grid-column-start: 2;
  grid-column-end: 4;
  grid-column: 2 / 4; /* 2 / span 3;*/
  /* 행시작 / 열시작 / 행끝 / 열끝 */
  grid-area: 1 / 1 / 3 / 4; /* 1 / 1 / span 2 / span 3;*/
}
```
