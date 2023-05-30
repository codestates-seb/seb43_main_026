# 💙 SooMo : 데일리 수영기록 플랫폼
<div align="center">
  <img src="https://github.com/codestates-seb/seb43_main_026/assets/104323906/f282d418-8e1b-41af-885b-ef35fbd10f52" width="100%" />
</div>


<br>

 `팀 명` : 세상에 나쁜 코드는 없다 (세나코) <br>
 `프로젝트명` : 수모 : SooMo  <br>
 `프로젝트 기간` : 2023.04.28 - 2023.05.25  <br>
 `배포 링크` : [수모 : SooMo](http://soo-mo.s3-website.ap-northeast-2.amazonaws.com/)
 
 <br><br>
꾸준한 수영 기록으로 나만의 특별한 캘린더를 꾸며 보세요

<br>

## ✨ Team Member
|  Team FE  |  류수빈 (Leader) |   기지원   |    조지현    |
| :-------: | :------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------: |
| Profile |<img width="150" src="https://avatars.githubusercontent.com/u/52683129?v=4">| <img width="150" src="https://avatars.githubusercontent.com/u/119961147?v=4"> |<img width=150 src="https://avatars.githubusercontent.com/u/104323906?v=4">
| GitHub ID |  [@rsuubinn](https://github.com/rsuubinn) | [@kijiwon](https://github.com/kijiwon) |  [@chochojj](https://github.com/chochojj) |
|   Role    |                                                                              - 로그인 / 회원가입 페이지 <br> - 로그아웃, 회원탈퇴 <br> - 마이페이지 <br> - 공통 컴포넌트 <br> (Input, Button, Footer) <br> - 랜딩 페이지 <br> - AWS S3 배포 <br>                                                  |        - 캘린더 CRUD <br> - 캘린더 한 달 단위 조회 기능 <br> - 캘린더 캡쳐 기능 <br> - 카카오맵 api 검색 <br> - 공통 컴포넌트 (Header) <br> - 랜딩 페이지                                                                                                                |                                               - 게시판 CRUD    <br>- 코맨트 CRUD <br> - 게시판 페이징 <br>(페이지네이션, 무한스크롤) <br> - 게시글 좋아요 기능 <br> - 공통 컴포넌트(Nav bar) <br> - 랜딩페이지      <br>                                                                  |

<br>

|  Team BE  |   서하빈 (Leader)  |  이호준  | 한동민    |
| :-------: | :-------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------: |
| Profile |<img width="150" src="https://avatars.githubusercontent.com/u/117034592?v=4"> |<img width="150" src="https://avatars.githubusercontent.com/u/70518135?v=4"> | <img width="150" src="https://avatars.githubusercontent.com/u/113077033?v=4"> 
| GitHub ID | [@Seohabin6078](https://github.com/Seohabin6078) |  [@yhj0076](https://github.com/yhj0076) | [@mins-git](https://github.com/mins-git) |
|   Role    |                - 캘린더 CRUD <br> - 이미지 AWS 저장 <br> - 테스트 코드 <br> - AWS EC2 배포                                                         |                       - 로그인/회원가입 <br> - Spring Security JWT <br> - 회원 정보 관리                                                                            |                                              - 게시판 CRUD <br> - 댓글 CRUD <br> - 게시글 좋아요 기능 <br> - 이미지 AWS 저장                                         |


<br>

## 🛠️ Tech Stack    
<div>
<img src="https://github.com/codestates-seb/seb43_main_026/assets/119961147/8ae2a6cc-6cc5-4252-8519-93d181a61428" width='70%' />
</div>

<br>


## 🌱 Git
### branch
> 기능 개발 브랜치에서 작업 후 `Pull Request`하여 병합 진행
- `main` : 배포 브랜치
- `dev` : `fe` / `be` 작업 테스트 병합 브랜치
- `feat/FE` : Front-End 개발 브랜치
- `feat/BE` : Back-End 개발 브랜치
- `feat/FE/기능 이름` : FE 기능 개발 브랜치
- `feat/BE/기능 이름` : BE 기능 개발 브랜치

### Git 저장소 이용법 
로컬에서 작업 후 개인 branch Push
1. `git checkout 브랜치`
2. `git add 파일/디렉토리 경로`
3. `git commit -m "message"`
4. `git push origin 브랜치"`

### Commit Convention

Tag | Title
-- | --
feat | 새로운 기능 추가
fix | 버그 수정
docs | 문서 수정
design | CSS 등 사용자 UI 디자인 변경
style | 코드 포맷 변경, 세미 콜록 누락, 코드 수정이 없는 경우
refactor | 코드 리팩토링
test | 테스트 추가, 테스트 리팩토링 추가 (프로덕션 코드 변경 x)
chore | 빌드 테스트 업데이트, 패키지 매니저를 설정 (프로덕션 코드 변경 x)
comment | 필요한 주석 추가 및 변경
rename | 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우
remove | 파일을 삭제하는 작업만 수행한 경우
!BREAKING CHANGE | 커다란 API 변경
!HOTFIX | 급하게 치명적인 버그를 고쳐야하는 경우
