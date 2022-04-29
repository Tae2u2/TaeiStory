# TaeiStory
## ⭐프로젝트 소개⭐<br />
ReactJS + nodeJS 프로젝트 : 당신은 돼지짱입니까?<br />
사용자가 식비를 기록하고 입력된 식비 금액에 따라 레벨이 부여되는 웹 서비스<br />

---

링크 :  https://taeistory-piggy.herokuapp.com/ <br />

---

## 💛개발환경 및 프로젝트 관련 요약💛


##### 작업기간 : 2022.03 ~2022.04 (1개월)
##### 작업인원 : 1명 (개인프로젝트)
##### 프로젝트 목적 :  
1.  학습한 이론적인 지식들을 통합적으로 실습해보기 위해서
2.  개인프로젝트를 통해 React와 nodeJS 사용경험 및 숙련도 향상을 위해서
##### 사용언어 및 개발환경 : 
React, SCSS, nodeJS, express, MyBatis, VScode, MySQL, AWS, herokuCLI

##### 주요기능 및 구현한 방법
  캡처된 화면에서 사용된 기기는 아이패드입니다. <br />
  활용된 이미지는 전부 직접 그린 것입니다. <br />

---

### 1. 회원가입

![piggyRegister(1)](https://user-images.githubusercontent.com/74426470/165144061-760f14c0-e836-4b35-8e7c-ef753b8d8681.jpg)

<br />
  - 회원가입 : 사용자가 입력한 정보는 MYSQL DB table에 저장됩니다. 비밀번호는 복호화가 필요하지 않은 정보이므로 bcrypt 패키지를 활용하여 해시암호화한 상태로 DB에 전송해서 저장됩니다. <br /><br />
  
![piggyRegister(2)](https://user-images.githubusercontent.com/74426470/165145490-d324dd65-9146-44f7-88d0-55efb3e99382.jpg)

<br />
  - react-hooks-form과 정규표현식을 활용해 유효성 검사를 구현했습니다. <br />
  사용자가 입력한 정보가 지정된 패턴에서 벗어난 채로 회원가입을 클릭하면 input 박스 아래에 메세지가 표현됩니다. <br /> <br />
  - 이메일 중복확인이 가입과 동시에 이루어지도록 했습니다. <br />
  중복된 이메일이면 이미 가입된 이메일임을 알리고 로그인 화면으로 이동할지 여부를 물어본 후 이동되도록 지정했습니다. <br /> <br />
  - 가입이 완료되면 로그인 페이지로 이동합니다<br /><br />

---

### 2. 로그인

![piggyLogin(1)](https://user-images.githubusercontent.com/74426470/165144021-a30a2e2d-8955-4b9e-b2f3-d7c45351af29.jpg)

<br />
 - 로그인 : 처음 접속하면 가장 먼저 보이는 페이지로 로그인 화면으로 이동되면 타자 커서가 입력창에 바로 focus되고, 입력된 비밀번호는 bcrypt.compare()함수를 통해 비교되어집니다.<br /> <br />
 - 로그인에 성공하면 jwt를 통해 암호화된 쿠키가 저장되고, 12시간 동안 쿠키가 유지되도록 설정했습니다.<br /> <br />
 - 로그인이 성공되면 메인페이지로 이동됩니다.<br /><br />

---

### 3. 식비의 CRUD

![piggyMain(1)](https://user-images.githubusercontent.com/74426470/165146254-0b435198-8320-4ec7-99ec-4f1158a8623c.jpg)
   
 <br />
  - 돼지짱 메인페이지 : 로그인 되면 바로 보여지는 화면입니다. 입력, 수정, 삭제, 리스트 보기, 돼지력 확인 및 그에 따른 돼지짱 이미지를 볼 수 있습니다.<br /> <br />

![piggyMainLog-out](https://user-images.githubusercontent.com/74426470/165144156-9ebef528-5c12-4503-9270-f6a7d7822f14.jpg)
  
 <br />
 
  - 우측 상단에 위치한 환영인사를 누르면 로그아웃과 회원탈퇴를 할 수 있습니다.<br /><br />

![piggyMain(2)](https://user-images.githubusercontent.com/74426470/165145917-74781986-4d80-429f-aef5-e81adefbb72b.jpg)
  
<br />
  - 식비 입력 유효성 검사는 필수입력과 금액이 숫자로 입력되어야만 한다는 조건뿐이어서 input태그로 관리되도록 했습니다.<br /><br />

![piggyMain(4)](https://user-images.githubusercontent.com/74426470/165146099-280355d2-9dee-41cc-8440-837a3377ad05.jpg)
  
  <br />
   - 리스트에 입력된 날짜와 음식명, 금액이 보여지고, react-pagination을 이용해서 페이징이 되도록 했습니다. <br />
  금액이 쌓이면 레벨이 올라 돼지짱의 이미지가 변화됩니다. <br /><br />
  
![piggyMainEdit](https://user-images.githubusercontent.com/74426470/165146191-93c535de-bfb7-44d5-b28b-3d8137a46871.jpg)
  
![piggyMainDelete](https://user-images.githubusercontent.com/74426470/165144538-8742a3e1-db26-4c66-bb73-42280262b134.jpg)
  
  <br />
  - 수정버튼을 누르면 모달창이 뜨고, 두개의 항목 중 하나만 수정하면 기존 정보가 그대로 유지되고, 날짜는 수정한 날짜로 업데이트 되어 리스트 상단에 노출됩니다. <br /><br />
  - 삭제버튼을 누르면 삭제가 되고, 돼지력이 감소해서 레벨이 떨어지면 돼지짱 이미지도 하위레벨 이미지로 바뀝니다. 수정으로 금액부분이 낮아져도 마찬가지입니다.<br /><br />
  - 회원가입이나 입력, 삭제, 수정할 때 뜨는 알림창을 Sweetalert2를 이용했고, 로그아웃이나 회원탈퇴, 로그인 오류 메세지 같은 것들은 내장 메소드를 이용했습니다.<br /><br />
  
![piggyMainsignout](https://user-images.githubusercontent.com/74426470/165144583-37e49fc2-5b31-4542-8a97-bac52c19b0f5.jpg)
![piggyMainsignout(2)](https://user-images.githubusercontent.com/74426470/165144607-fb349091-97f8-433e-b834-0e13499d360f.jpg)
  
  - 회원탈퇴는 여부를 묻는 경고창과 문구를 입력하는 경고창을 같이 사용해서 탈퇴여부를 2번 물어보았습니다.<br /><br />

---

### 4. 레벨부여

  ![pigbossss](https://user-images.githubusercontent.com/74426470/165127559-b4222c6a-70e8-4515-afb0-bc7c8133734f.png)

<br />
  - 레벨을 결정하는 값은 입력된 금액에 총합입니다. SQL에서 해당 컬럼 값의 총합을 구하는 쿼리문을 활용해서 간단하게 값만 받아왔고,<br />
  해당 컴포넌트에서는 간단한 연산만 하도록 했습니다. <br /><br />
  
  ```
    select 
  IFNULL(sum(foodExpenses),0) 
  as sum_of_foodExpenses 
  from taeistory_piggy 
  where useremail=#{is_Email};
  ```

---

### 5. 반응형 웹페이지


![piggyMobile(1)](https://user-images.githubusercontent.com/74426470/165145839-70679b11-68be-4479-b592-0af347ddb3c3.jpg)

![piggyMobile(2)](https://user-images.githubusercontent.com/74426470/165145847-5302b148-57cf-4ec5-b55b-7f5c339a5c6f.jpg)
 
 <br />
 - 이번 프로젝트에서 SCSS로 css작업을 했습니다. 모바일과, 타블렛의 기준값을 변수로 지정해서 반응형 웹페이지를 구현했습니다. <br /><br />
 - 모바일과 타블렛(세로모드)로 활용할 때는 레벨을 나타내는 주요 이미지를 제외한 나머지 이미지를 사라지게 해서 조금 가벼워지도록 했습니다. <br /><br />

---


 <br /> <br />
 ### 추가 업그레이드, 리팩토링 계획(0425~)
 
 1. 회원가입 페이지에서 한번의 submit이 발생해야 유효성 검사 에러 메세지가 즉각적으로 반응함
    - 한 번의 submit을 강제로 발생시켜서 해결해 볼 예정
 2. 삼성핸드폰에서 수정모달이 모달창을 벗어남 -> 글씨크기 기본설정이 크게로 설정되어 있으면 화면이 깨진다는 사실 확인함
    - 기본 설정된 글씨를 크게 해도 화면이 안 깨지게 고치기
 3. 회원탈퇴 입력 문구 말고 비밀번호로 바꾸기
 4. 총 금액으로 합산하는 것을 월 단위 금액으로 바꾸기
 
 ##### 추가
 1. 비밀번호 찾기, 이메일 인증 -> nodemailer를 이용하면 구현할 수 있지만 개인계정의 비밀번호가 github에 노출되서 철회함
    - 환경변수를 사용하면 될 것 같아서 시도해 볼 예정
 2. 사용자 계급 컬럼 추가해서 관리자 계정, 페이지 만들기
 3. 음식 사진도 올릴 수 있게-> UI 디자인을 고정 사이즈로 작게 구현해서 이미지를 같이 올리려면 UI를 수정하거나 클릭해서 보는 방식으로 해야됨
 4. 검색 기능을 추가해보기
---

## 감사합니다🙌


