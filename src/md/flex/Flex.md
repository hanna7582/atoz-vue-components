# Flex Layout
레이아웃을 유연하게 배치

## Reference   
- <a target="_blank" href="https://www.w3schools.com/css/css3_flexbox.asp">w3schools flex</a>
- <a target="_blank" href="https://studiomeal.com/archives/533">1분 코딩 Flex</a>
- <a target="_blank" href="https://d2.naver.com/helloworld/8540176">flex 10가지 레이아웃</a>
  
## Grid 레이아웃이란?
**특징**
- 기본 메인축은 가로방향이며 아이템이 가로로 배치
- 아이템의 넓이를 지정하지 않으면 아이템이 가지고 있는 컨텐츠 내용만큼 넓이를 가짐
- 아이템의 높이는 컨테이너의 높이만큼 늘어남

**기본구조**
- flex-container 부모 컨테이너 
- flex-item 자식 컬럼

**그리드 개념**
- 그리드 컨테이너 (Flex Container)
  display: flex를 적용하는, Flex의 전체 영역  
- 그리드 아이템 (Flex Item)
  Flex 컨테이너의 자식 요소

**주요속성**
- 아이템 배치 방향 / 줄넘김
  - flex-direction
  - flex-wrap
  - flex-flow
- 아이템 정렬
  - justify-content
  - align-content
  - align-items
  - align-self
- 아이템 크기 
  - flex-grow
  - flex-shrink
  - flex-basis  
  - flex
- 아이템 순서  
  - order

**HTML**
```html
<div class="flex-container">
  <div class="flex-item">1</div>
  <div class="flex-item">2</div>
  <div class="flex-item">3</div>  
  <div class="flex-item">4</div>
  <div class="flex-item">5</div>
  <div class="flex-item">6</div>  
  <div class="flex-item">7</div>
  <div class="flex-item">8</div>
  <div class="flex-item">9</div>  
</div>
```

**CSS**
```css
.flex {
  width: 100%;
}
.flex-container {
  display: flex;
  background-color: #2196f3;
  padding: 10px;
}
.flex-item {
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 10px;
  color: black;
  box-sizing: border-box;
}
```