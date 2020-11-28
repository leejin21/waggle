# WaggleApp

앱 와글을 구현한 소스코드 모음입니다.
react native로 구현하였으며, expo로 프로젝트 개설하였고 eject하여 각 native에 맞게 개발할 예정입니다.

## Environments

node.js -12.18.3
npm -6.14.6
@react-navigation/native@5.7.3
@react-navigation/stack@5.9.0

나머지 버전은 package.json에 포함되어 있음.

-   react navigation 및 그에 따른 패키지들? 설치
    https://reactnavigation.org/docs/getting-started 참고

```cmd
# waggleApp/ 에서 아래 명령어를 통해 패키지 설치
npm install @react-navigation/native
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view'
npm install @react-navigation/stack
# 20.09.08 추가
expo install @react-native-community/async-storage
# 20.09.29 추가
expo install expo-av
npm audit fix

# 20.09.26 추가
npm i react-native-modal

# 20.11.28 추가
expo install expo-av @react-native-community/netinfo @react-native-community/slider
npm install expo-video-player

```

## Issues

-   Async Storage 공부하기
    https://react-native-community.github.io/async-storage/docs/api
