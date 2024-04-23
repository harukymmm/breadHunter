## フレームワーク

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)

## 要件

- Node.js
- Yarn 

## Getting Started

- リポジトリをクローンして、Yarn の依存パッケージをインストール：

```bash
git clone https://github.com/harukymmm/breadHunter.git
cd pump
yarn
```

### PC 上で起動する場合

- iOS 向けにアプリを起動するには、次を実行：

```bash
yarn ios
```

- その他の起動オプション

```bash
yarn android
yarn ios
yarn web
```

### スマートフォン上で動作確認する場合

**NOTE: 筆者環境では動作未確認できていない**

- 開発サーバを立ち上げる：

```bash
yarn start
```

コマンドの出力に、QR コードが表示されていることを確認する

- Expo Go をインストール済みのスマートフォンで、QR コードを読み取り
  - iOS 版では、iPhone のカメラアプリで読み取り
  - Android 版では、Expo Go で読み取り

スマートフォン上でアプリが表示できれば成功