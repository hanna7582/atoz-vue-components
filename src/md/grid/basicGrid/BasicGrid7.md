## 셀 자동 배치
- 부모 컨테이너에 적용

**주요 속성**
- grid-auto-flow 아이템이 자동 배치되는 흐름
  - row : 가로 방향으로 채움 
  - column : 세로 방향으로 채움
  - dense : 빈 셀을 채움
  - row dense : 가로 방향으로 빈 셀을 채움
  - column dense : 세로 방향으로 빈 셀을 채움

**예시**
```css
.grid-container {
  grid-auto-flow: row;
}
```
