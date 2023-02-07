# Hello Wordy

## 배포주소

https://web-voca-study-app-sop272gld5psn0m.gksl2.cloudtype.app/

<br>

## 프로젝트 개요

- Web Speech API 등을 활용해 자신만의 외국어 단어장을 제작 및 학습할 수 있는 외국어 학습 웹 어플리케이션
- React.js 를 이용한 프론트엔드 개발
- Express.js 와 MongoDB를 이용한 백엔드 개발

<br>

## 프로젝트 기간

- 2022/07/22 ~ 지속적 업데이트 중

<br>

## 기술스택

- 프론트엔드

  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>

  <img src="https://img.shields.io/badge/context--api-20232a?style=for-the-badge" />
  <img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"/>

<br>

- 백엔드

  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />

<br>

## 학습, 구현 및 개선사항

- REST api 의 설계, 구현, 및 통신
- 클라이언트 및 서버 측면의 Session 기반 Authentication/Authorization 구현
- 반복적으로 처리하던 권한 별 페이지 접근 제어 로직을 Route Nesting을 활용해 하나의 Route에서 처리하도록 개선
- Custom hook을 이용한 관심사 분리
- ContextAPI를 이용한 전역상태 관리(Auth상태 및 서버상태(데이터))
- ContextAPI와 useReducer hook을 이용한 FLUX 패턴 구현
- 클라이언트의 http 생성 및 service 호출 로직에 의존성 주입(DI) 패턴을 적용해 프로그램 유연성 향상
- 반복적으로 사용하는 컴포넌트의 재사용성을 높여 생산성 향상
- ToggleButton, SideBar, Modal, 로딩처리, 반응형 웹 등 styled-components를 이용한 다양한 UI구현

<br>

## 기능소개

- [Session Auth](session-auth)
  - [회원가입](#auth---회원가입)
  - [로그인](#auth---로그인)
  - [로그아웃](#auth---로그아웃)
- [단어장 CRUD](#단어장-crud)
  - [토픽 CRUD](#crud-토픽)
  - [단어 CRUD](#crud-단어)
- [학습 기능](#학습-기능)
- [북마크](#북마크)
- [반응형 레이아웃](#반응형-레이아웃)

<br>

## Session Auth

## Auth - 회원가입

<div align="left">
  <img src="https://user-images.githubusercontent.com/105113833/216240487-765db7ec-735f-462d-af51-0919e20e8038.gif" width="250px" />
  <img src="https://user-images.githubusercontent.com/105113833/216240488-2c470ce8-6017-41af-9e77-a4949af33793.gif" width="250px" />
</div>

- input 입력시 유효성 검사 후 메세지 출력 및 가입버튼이 활성화됩니다.
- 이름을 입력하지 않을 경우 이메일의 앞부분을 이름으로 사용합니다.
- 가입요청시 이메일의 중복 여부를 확인 후 메세지를 출력합니다.
- 가입에 성공시 자동으로 로그인이 진행됩니다.

<br>

## Auth - 로그인

<div align="left">
  <img src="https://user-images.githubusercontent.com/105113833/216240479-3c34d093-e7aa-4b8a-a99e-3044b9c65809.gif" width="250px" />
  <img src="https://user-images.githubusercontent.com/105113833/216240482-39b0aeb1-7a47-41a7-a069-1a3068135e6e.gif" width="250px" />
  <img src="https://user-images.githubusercontent.com/105113833/216240491-d989cc1d-ae94-4ea2-baaa-eac34b579241.gif" width="250px" />
</div>

- 로그인 오류가 발생하면 메세지를 출력합니다.
- email과 password 인증이 완료되면 서버로부터 session-id가 담긴 쿠키를 전송받고 전역 AuthContext의 유저 상태를 업데이트합니다.
- 유저 상태에 따라 client의 route 접근이 제한되고 쿠키의 session-id로 api요청의 인가가 이루어집니다.

<br>

## Auth - 로그아웃

<img src="https://user-images.githubusercontent.com/105113833/216324428-9bd59b4d-a7da-46ce-a286-cf0cd94bc6f5.gif" width="250px" />

- client 유저 상태를 업데이트하고 DB의 세션을 삭제합니다.

<br>

## 단어장 CRUD

## CRUD 토픽

<div align="left">
  <img src="https://user-images.githubusercontent.com/105113833/216240623-e091e410-c3ae-47b2-b954-735c1938af0e.gif" width="250px" />
  <img src="https://user-images.githubusercontent.com/105113833/216240633-5e3da0ec-85d1-4908-ba4f-453c2383f385.gif" width="250px" />
  <img src="https://user-images.githubusercontent.com/105113833/216240637-e3f5c8ad-736b-424c-be06-9495979a3710.gif" width="250px" />
</div>

- 언어 및 토픽이름을 입력해 새로운 토픽을 생성합니다.
- 선택된 언어는 Web Speech API의 언어설정으로 사용됩니다.
- 토픽 이름과 선택된 읽기언어를 수정할 수 있습니다.
- 토픽을 삭제하면 토픽에 포함되어있는 모든 단어가 삭제됩니다.
- 학습 진행도가 표시됩니다.

<br>

## CRUD 단어

<div align="left">
  <img src="https://user-images.githubusercontent.com/105113833/216240700-e04b7159-0354-4872-bca2-c29f2955e390.gif" width="250px" />
  <img src="https://user-images.githubusercontent.com/105113833/216240707-75b4f8a8-d112-4073-9afd-9c8aac9a69bf.gif" width="250px" />
  <img src="https://user-images.githubusercontent.com/105113833/216240709-db91b773-1c60-47e0-8b09-d236797e286b.gif" width="250px" />
</div>

- 단어를 생성, 불러오기, 수정 및 삭제할 수 있습니다.

<br>

## 학습 기능

<div align="left">
  <img src="https://user-images.githubusercontent.com/105113833/216240783-46c7569f-a98f-47c8-bc70-28398486dad7.gif" width="250px" />
  <img src="https://user-images.githubusercontent.com/105113833/216240790-480d86b1-e3b6-44fa-9838-483fe02ca845.gif" width="250px" />
</div>

- 전체 단어 혹은 미학습 단어를 선택해 학습합니다.
- 학습이 시작되면 무작위로 단어가 나타납니다.
- 매 단어마다 스스로 학습도를 평가하고 데이터에 반영됩니다. 또한 북마크여부를 수정하거나 발음을 들어볼 수 있습니다.
- 학습종료시 학습 결과를 표시합니다.

<br>

## 북마크

<div align="left">
  <img src="https://user-images.githubusercontent.com/105113833/216240810-e4ee53f8-c6e3-4762-99a3-eb4c51cc08cb.gif" width="250px" />
  <img src="https://user-images.githubusercontent.com/105113833/216324686-640db3d9-2d5b-4e76-b213-7609c01699bb.gif" width="250px" />
</div>

- 북마크 되어있는 단어를 한 곳에서 편집하거나 학습할 수 있습니다.

<br>

## 반응형 레이아웃

<div align="left">
  <img src="https://user-images.githubusercontent.com/105113833/216240813-9a359718-1274-4b26-a96b-f13ac5faa94d.gif" width="500px" />
</div>

- 미디어쿼리를 이용해 반응형 레이아웃을 구현했습니다.
