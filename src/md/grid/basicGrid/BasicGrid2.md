## 행과 열 공간의 크기 지정
- 부모 컨테이너에 적용

**주요 속성**
- grid-template-rows 행의 크기
- grid-template-columns 열의 크기 

**단위**
- px, % : 고정크기, 백분율
- auto : 자동 배분 
- fr : 배수
- repeat(반복횟수, 반복값) : 반복

**minmax 함수**
- minmax(최소값, 최대값) 
- repeat(3, minmax(100px, auto)) : 3번 반복, 최소 100px 최대 자동
- repeat(3, minmax(auto, 500px)) : 3번 반복, 최소 자동 최대 500px

**auto-fill과 auto-fit**
- column의 개수를 미리 정하지 않고 설정된 너비가 허용하는 한 최대한 셀을 채움
- repeat(auto-fill, minmax(20%, auto)) : 최소 20%의 크기를 유지하는 선에서 개수를 채움(컬럼의 수 5개) 셀의 개수가 모자라면 공간이 남음
- repeat(auto-fit, minmax(20%, auto)) : 최소 20%의 크기를 유지하는 선에서 개수를 채움(컬럼의 수 5개) 셀의 개수가 모자라면 남는 공간을 채움

**예시**
```css
.grid-container {
  grid-template-rows: 100px 200px auto;
  grid-template-columns: 50% 1fr 2fr 0.5fr;
}
```
