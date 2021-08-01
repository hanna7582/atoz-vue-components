## 배치 방향
- 부모 컨테이너에 적용

**flex-direction**
- 아이템들이 배치되는 축의 방향을 결정
- 적용할 수 있는 값
  - row : 가로 방향 왼쪽에서 오른쪽
  - row-reverse : 가로 방향 오른쪽에서 왼쪽
  - column : 세로방향 위에서 아래
  - column-reverse : 세로방향 아래에서 
  
**flex-wrap**
- 부모 컨테이너에 적용
- 컨테이너가 더 이상 아이템들을 한 줄에 담을 여유가 없을 때 아이템 줄바꿈을 어떻게 할지 지정
- 적용할 수 있는 값
  - nowrap : 컨테이너 바깥으로 나감
  - wrap : 아래로 내려감
  - wrap-reverse : 아래로 내려감 역순 배치

**flex-flow**
- flex-direction flex-wrap 동시 적용

**예시**
```css
.flex-container {
  flex-direction: row;
  flex-wrap: wrap;
  flex-flow: row wrap; 
}
```