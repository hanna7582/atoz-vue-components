## 아이템 정렬
**주요 속성**
- 부모 컨테이너에 적용
  - align-items : 셀 영역을 기준으로 세로 방향 정렬
    - stretch / start / center / end
  - justify-items : 셀 영역을 기준으로 가로 방향 정렬
    - stretch / start / center / end  
  - place-items : align-items justify-items 동시 적용
  - align-content : 컨테이너 영역을 기준으로 세로 방향 정렬  
    - 아이템을 모두 합친 높이가 컨테이너 높이보다 작을 때
    - stretch / start / center / end / space-between / space-around / space-evenly
  - justify-content : 컨테이너 영역을 기준으로 가로 방향 정렬  
    - 아이템을 모두 합친 넓이가 컨테이너 넓이보다 작을 때
    - stretch / start / center / end / space-between / space-around / space-evenly
  - place-content : align-content justify-content 동시 적용  
  
- 자식 아이템에 적용 
  - align-self : 셀 영역을 기준으로 세로 방향 정렬
  - justify-self : 셀 영역을 기준으로 가로 방향 정렬
  - place-self : align-self justify-self 동시 적용

**예시**
```css
.grid-container {
  align-items: start;
  justify-items: center;
  place-items: start center;
  align-content: start;
  justify-content: center;
  place-content: start center;
}
.grid-item:nth-child(2){
  align-self: start;
  justify-self: center;
  place-self: start center;
}
```
