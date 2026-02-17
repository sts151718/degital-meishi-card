# デジタル名刺アプリ

名刺をWebアプリ上で登録・検索するアプリケーションを作成しました。

## 目次

- [アプリ画面](#アプリ画面)
- [ページ一覧](#ページ一覧)
- [バッチについて](#バッチについて)
- [環境設定](#環境設定)
- [起動方法](#起動方法)
- [ホスティング](#ホスティング)
- [テーブル](#テーブル)

# アプリ画面

![Image](https://github.com/user-attachments/assets/5a3e3b4f-7de3-40b7-aab8-ef5d0882e67e)

# ページ一覧

| 画面名       | パス              |
| ------------ | ----------------- |
| カード検索   | `/`               |
| 名刺登録画面 | `/cards/register` |
| 名刺詳細画面 | `/cards/:id`      |

# バッチについて

毎朝6時に登録した名刺は翌日に削除されるバッチを登録しています。

# 環境設定

1. このリポジトリをクローンしてください。

   ```
   git@github.com:sts151718/degital-meishi-card.git
   ```

2. 依存関係のインストールをしてください。

   ```
   npm ci
   ```

3. `.env.template`から`.env`ファイルを作成してください。

4. Supabase(https://supabase.com/)でテーブル・レコードを作成してください。
   1. プロジェクトを作成してください。（プロジェクト名は任意）
   2. [下記のテーブル](#テーブル)を作成し、以下のカラムを作成してください。
   3. プロジェクトURLとプロジェクトキーを`.env`内のVITE_SUPABASE_URLとVITE_SUPABASE_PUBLISHABLE_KEY変数にコピー&ペーストしてください。

# 起動方法

```
npm run dev
```

http://localhost:5173/ をURLバーに入力するか、ターミナルでURLをCtrl(Command (⌘) ) + クリックすると、開くことができます。

# ホスティング

[Firebase](https://firebase.google.com/?hl=ja)のプロジェクトを作成して、ホスティングしてください。

1. Firebaseにプロジェクトとアプリを作成してください。 その際に、Firebase CLIをインストールする必要があります。

   ```
    npm install -g firebase-tools
   ```

2. Firebase CLIでログインして、デプロイしてください。
   ```
    firebase login
    make deploy
   ```

# テーブル

## users

| カラム名    | 型          | option   |
| ----------- | ----------- | -------- |
| id          | varchar     | primary  |
| name        | varchar     | non null |
| description | varchar     | non null |
| github_id   | varchar     |          |
| qiita_id    | varchar     |          |
| x_id        | varchar     |          |
| created_at  | timestamptz | now()    |

## skills

| カラム名   | 型          | option   |
| ---------- | ----------- | -------- |
| id         | int8        | primary  |
| name       | varchar     | non null |
| created_at | timestamptz | now()    |

## user_skill (中間テーブル)

| カラム名   | 型          | option                  |
| ---------- | ----------- | ----------------------- |
| id         | int8        | primary                 |
| user_id    | varchar     | non null, fk(users.id)  |
| skill_id   | int8        | non null, fk(skills.id) |
| created_at | timestamptz | now()                   |
