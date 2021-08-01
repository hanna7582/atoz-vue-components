## 행과 열 공간의 크기 자동 지정
- 부모 컨테이너에 적용

**주요 속성**
- grid-template-rows/grid-template-columns의 통제를 벗어난 공간 크기 지정
- grid-auto-rows 행의 크기
- grid-auto-columns 열의 크기 

**단위**
- px, % : 고정크기, 백분율
- auto : 자동 배분 
- fr : 배수

**minmax 함수**
- minmax(최소값, 최대값) 

**예시**
```css
.grid-container {
  grid-auto-rows: minmax(100px, auto);
  grid-auto-columns: minmax(100px, auto)
}
```
