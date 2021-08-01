## 아이템 크기
- 자식 아이템에 적용

**flex-grow**
- 유연하게 늘리기(확대)
- 컨테이너가 커질 때 아이템의 크기를 확장시키는 속성
- 아이템 안의 컨텐츠 내용을 제외한 여백의 비율
- 적용할 수 있는 값
  - 0 : 원래 크기 유지
  - 0보다 큰 값 : 비율만큼 빈 공간을 채움
  
**flex-shrink**
- 유연하게 줄이기(축소)
- 컨테이너가 줄어들 때 아이템의 크기를 축소시키는 속성
- 아이템 안의 컨텐츠 내용을 제외한 여백의 비율
- 적용할 수 있는 값
  - 0 : 원래 크기 유지
  - 1 : 빈 공간을 채움

**flex-basis**
- 기본 크기
- 컨테이너가 줄어들 때 아이템의 크기를 축소시키는 속성
- 적용할 수 있는 값
  - 0 : 컨테이너를 기준으로 아이템의 크기를 동등하게
  - auto : 아이템 안의 컨텐츠 내용을 제외한 여백의 비율을 동등하게
  - 숫자(px, %, em, rem) : 지정된 크기

**flex**
- flex-grow flex-shrink flex-basis 동시 적용
- initial : 0 1 auto
- none : 0 0 auto
- auto : 1 1 auto
- 1 : 1 1 0
- 0 : 0 1 0%

| flex | flex-grow | flex-shrink | flex-basis |
| :--------: | :--------: | :--------: | :--------: |
| initial(기본값) | 0 | 1 | auto |
| none | 0 | 0 | auto |
| auto | 1 | 1 | auto |
| 양의 정수 | 숫자 | 1 | 0 |

**예시**
```css
.flex-container {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
  flex: 1;
}
```