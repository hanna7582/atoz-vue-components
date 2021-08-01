## 셀 영역 이름
- 부모 컨테이너에 적용

**주요 속성**
- grid-template-areas 각 영역에 이름을 붙임
- grid-area 영역의 이름
- 빈칸은 마침표 또는 none
- 전체적인 행 별로 열의 수가 맞아야 함
- 각 영역별로 클래스를 잡고 grid-area에 영역의 이름을 지정

**예시**
```css
.grid-container {
  grid-template-areas: "header header header" 
                        "a main b" 
                        "none none none" 
                        "footer footer footer";
}
.header {
  grid-area: header;
}
.sidebar-a {
  grid-area: a;
}
.main-content {
  grid-area: main;
}
.sidebar-b {
  grid-area: b;
}
.footer {
  grid-area: footer;
}
```
