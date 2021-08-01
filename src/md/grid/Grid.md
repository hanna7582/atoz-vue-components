# Grid Layout
행(row)과 열(col)이 있는 그리드 기반 레이아웃 시스템

## Reference   
- <a target="_blank" href="https://www.w3schools.com/css/css_grid.asp">w3schools grid</a>
- <a target="_blank" href="https://studiomeal.com/archives/533">1분 코딩 Grid</a>
  
## Grid 레이아웃이란?
**특징**
- 두 방향(가로-세로) 레이아웃 시스템
- Flex보다 더 복합적인 레이아웃 표현이 가능

**기본구조**
- grid-container 부모 컨테이너 
- grid-item 자식 컬럼

**그리드 개념**
- 그리드 컨테이너 (Grid Container)
  display: grid를 적용하는, Grid의 전체 영역  
- 그리드 아이템 (Grid Item)
  Grid 컨테이너의 자식 요소
- 그리드 트랙 (Grid Track)
  Grid의 행(Row) 또는 열(Column)
- 그리드 셀 (Grid Cell)
  Grid의 한 칸
- 그리드 라인(Grid Line)
  Grid 셀을 구분하는 선
- 그리드 번호(Grid Number)
  Grid 라인의 각 번호
- 그리드 갭(Grid Gap)
  Grid 셀 사이의 간격
- 그리드 영역(Grid Area)
  Grid 라인으로 둘러싸인 사각형 영역으로, 그리드 셀의 집합

**주요속성**
- 트랙 크기 지정
  - grid-template-rows 
  - grid-template-columns 
  - grid-auto-rows
  - grid-auto-columns
- 셀 간격
  - row-gap : 행 간격 
  - column-gap : 열 간격
  - gap : 행과 열의 간격
  - grid-row-start 행 라인 시작
- 셀 영역
  - grid-row-end 행 라인 끝
  - grid-row 행 라인 시작과 끝
  - grid-column-start 열 라인 시작
  - grid-column-end 열 라인 끝
  - grid-column 열 라인 시작과 끝
  - grid-area 행 열 라인 시작과 끝
- 셀 영역 이름
  - grid-template-areas  
- 셀 자동 배치
  - grid-auto-flow
- 아이템 정렬
  - align-items
  - justify-items
  - place-items
  - align-content
  - justify-content
  - place-content
  - align-self
  - justify-self
  - place-self
- 아이템 순서 
  - order

**HTML**
```html
<div class="grid-container">
  <div class="grid-item">1</div>
  <div class="grid-item">2</div>
  <div class="grid-item">3</div>  
  <div class="grid-item">4</div>
  <div class="grid-item">5</div>
  <div class="grid-item">6</div>  
  <div class="grid-item">7</div>
  <div class="grid-item">8</div>
  <div class="grid-item">9</div>  
</div>
```

**CSS**
```css
.grid {
  width: 100%;
}
.grid-container {
  display: grid;
  background-color: #2196f3;
  padding: 10px;
}
.grid-item {
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 10px;
  color: black;
}
```