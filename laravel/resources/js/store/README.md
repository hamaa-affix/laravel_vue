## What is Vuex
- dataの状態管理を行うツール
- そもそもpropsと＄emitでデータのやりとりを行ってきたが大規模開発になるとそれらではデータを追いにくい状態となるその為データの管理は一元化することでデータの推移を把握することができる。
<br>

## Vuexでのデータの流れ
<img src="https://cdn-ak.f.st-hatena.com/images/fotolife/a/arakan_no_boku/20190529/20190529223427.png" alt="attach:cat" title="attach:cat" width="400" height="400">
<br>

## 構成要素として下記がある
1. state
   - data保管庫
2. mutation
   - stateの上書き(代入) stateのデータの更新、ミューテーションは同期処理でなければいけません。
3. getter
   - stateの情報を取得. ゲッターはステートの内容から算出される値です。ステートとゲッターの関係はコンポーネントでいうとデータ変数と算出プロパティの関係と同様でしょう。
4. action
   - storeの上書き以外の処理や非同期通信。アクションもミューテーションと同様にステートを更新するメソッドですが、ミューテーションとの違いはアクションは非同期処理である点です。アクションは API との通信などの非同期処理を行った後にミューテーションを呼び出してステートを更新する

```
src/store/*.js

const state = {};

const getters = {}

const mutations = {}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
```
上記をstore.jsにimportさせる。
```
import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth.js'

Vue.use(Vuex);

export default new Vuex.Store{
  modules: {
    auth
  }
})
```
store.jsはApp.jsにimportさせる
```
import Vue from 'vue';
import store from './store/store.js'
import App from './App.vue';

require('./bootstrap');

const app = new Vue({
    el: '#app',
    render: h => h(App),
    store
});

```
---
## state
dataの初期設定を行う
```
const state = {
   user: ''
}
```

## mutations
- mutationsでデータの更新をおこう。(fromt側から取得してきたdata)
	-  mutationsの第１引数は同じファイル内で定義している、stateをとる
	-  第２引数は任意の値をとる
```
const mutations = {
   setUser(state名,　data) {
      state.user = data
   }
}
```

## action
- actionsでbacckendと通信を行いでデータのやりとりを行う
	- 第一引数はcontextをとる。これはcontextオブジェクトをとっている.コンテキストオブジェクトにはミューテーションを呼び出すための commit メソッドなどが入っている

	- 「アクション→コミットでミューテーション呼び出し→ステート更新」というパターンはよく使う
```
//asyncで宣言し、axiosでのpost送信が終わるまで次の処理はしない
//context.commitでsrtUser(mutation)を呼び出しその引数に	response.dataを渡している。
const actions = {
  async register (context, data) {
    const response = await axios.post('/api/register', data)
    context.commit('setUser', response.data)
  }
}
```
actionsをfront側で実行するには＄store.dispach()を使用する。
 - 第１引数はactionsのメソッド名
 - 第２引数に渡したいデータ
 - 個別のstore.jsファイルにnamespaced: tureとしておくことで、
   呼び出すactionsメソッドに「ファイル名/actions名」とすることができる。
```
//今回はauth.jsで状態管理を行っているのでauth/registerとなったとなった
methos: {
	async register () {
		await this.$dispach('auth/register', this.data)
	}
}
```

## actions
- front側のVuexへのデータの参方法
- $store.gettersで呼び出すことができる。
```
   isLogin () {
      return this.$store.getters['auth/check']
    },
```
