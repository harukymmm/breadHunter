## フレームワーク

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)

## 要件

- Node.js
- Yarn 

## Getting Started

- リポジトリをクローンして、Yarn の依存パッケージをインストール（一回したら大丈夫）：

```bash
git clone https://github.com/harukymmm/breadHunter.git
cd pump
```

### PC 上で動作確認する場合

- package.json内のmainを試したいファイルのpathに変更：
- （下はStartScreenを試す場合の例）
  
```bash
"main": "./screen/StartScreen/StartScreen.tsx",
```

- yarnを実行：

```bash
yarn
```

- android 向けにアプリを起動するには、次を実行：

```bash
yarn android
```

- その他の起動オプション（多分使わない）

```bash
yarn ios
yarn web
```

### スマートフォン上で動作確認する場合


- 開発サーバを立ち上げる：

```bash
yarn start
```

コマンドの出力に、QR コードが表示されていることを確認する

- Expo Go をインストール済みのスマートフォンで、QR コードを読み取り
  - iOS 版では、iPhone のカメラアプリで読み取り
  - Android 版では、Expo Go で読み取り

スマートフォン上でアプリが表示できれば成功