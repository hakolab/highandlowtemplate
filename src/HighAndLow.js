import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { useStyles } from "./hooks/useStyles";
import PlayArea from "./components/PlayArea";
import HighAndLowButtons from "./components/HighAndLowButtons";
import GameProgressButton from "./components/GameProgressButton";
import Message from "./components/Message";

// デッキ初期値
const initialDeck = getDeck();

/**
 * デッキ作成関数
 *
 * 変数宣言
 *  トランプのスーツ（マーク）のデータを持った配列 suit
 *  トランプのランク（数字）のデータを持った配列 rank
 *  デッキとして返却するための空の配列 deck
 *
 * 処理内容
 *  suit、rank を使用して、配列 deck にデータをトランプデータを格納する
 *  データの形式は、suit と rank をキーに持つ Javascript オブジェクト（以下、card オブジェクト）
 *  { suit: value, rank: value }
 *
 *  @return {string[]} deck
 *
 */
function getDeck() {
  const suits = ["♠", "♣", "♦", "❤"];
  const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

  const deck = [];
  suits.map((suit) => ranks.map((rank) => deck.push({ suit: suit, rank: rank })));
  return deck;
}

/**
 * ランクの数値取得関数
 *
 * 処理詳細
 * 引数として 文字列 rank を取り、対応する数値を返却する
 * 例： "A" → 1 を返却、"J" → 11 を返却、"5" → 5 を返却
 * 　　（"A", "J", "Q", "K" 以外のときは数値に変換して返却する
 *
 * 数値変換の際には、Number(string)を用いる
 *
 * @param {string} rank
 * @return {number} Number(rank)
 */
function getRankNum(rank) {
  switch (rank) {
    case "A":
      return 1;
    case "J":
      return 11;
    case "Q":
      return 12;
    case "K":
      return 13;
    default:
      return Number(rank);
  }
}

/**
 * HighAndLow コンポーネント
 *
 * 処理概要
 * High and Low ゲームの画面を構成するコンポーネント
 * カードを並べる PlayArea コンポーネントと、
 * その下にゲーム進行のためのメッセージ出力とボタンを配置する
 *
 * 処理詳細
 * style 設定のため、定数 classes を宣言して、useStyles() hook を使用して初期化する
 *
 * useState() で以下の state を定義する
 *  deck 初期値: getDeck() で作成した配列 deck
 *  firstCard 初期値： getCard() で取得した card オブジェクト
 *  secondCard 初期値： null
 *  isWin 初期値： null
 *  answered 初期値： false
 *  isGameFinished 初期値： false
 *  winCount 初期値：0
 *  loseCount 初期値：0
 *
 * 関数定義
 *  getCard()
 *  checkHigh()
 *  checkLow()
 *  next()
 *  getButtons()
 *  getMessage()
 *
 */
export default function HighAndLow() {
  const classes = useStyles();
  const [deck, setDeck] = useState(initialDeck);
  const [firstCard, setFirstCard] = useState(getCard);
  const [secondCard, setSecondCard] = useState(null);
  const [isWin, setIsWin] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [winCount, setWinCount] = useState(0);
  const [loseCount, setLoseCount] = useState(0);

  /**
   * card オブジェクト取得関数
   *
   * 処理概要
   * state deck から card オブジェクト要素を取得する
   *
   * 処理詳細
   * 定数 index を宣言し、0 から デッキ枚数 までのランダムな整数を代入する
   * state deck から定数 index の値を使用して要素（card オブジェクト）を取得する
   * 取得した要素は削除し、state deck を更新する
   *
   * ランダムな数値を取得する際には以下を用いる
   * Math.floor(Math.random() * ランダムに取得したい数値の最大値)
   * 例： 0 から 10 までのランダムな数値を取得したい
   * 　　Math.floor(Math.random() * 10);
   *
   * state deck を更新する際は、イミュータブルに更新する
   *
   * 参考：
   *  React.js チュートリアル：　「イミュータビリティは何故重要なのか」
   *  https://ja.reactjs.org/tutorial/tutorial.html#why-immutability-is-important
   *
   * @return {object} cardObj
   */
  function getCard() {
    const index = Math.floor(Math.random() * deck.length);
    const cardObj = deck[index];
    const newDeck = deck.slice();
    newDeck.splice(index, 1);
    setDeck(newDeck);
    return cardObj;
  }

  /**
   * カードの数値比較 High
   *
   * 処理概要
   * 二枚のカードの数値を比較し、その結果に従って以下の state を更新する
   * state isWin
   * state winCount || loseCount
   * state answered
   *
   * 処理詳細
   * 定数 _secondCard を宣言し、getCard() を使用して初期化する
   *
   * 二枚目のカードの数が、一枚目のカードの数より大きい場合
   *  state isWin を true に更新する
   * 二枚目のカードの数が、一枚目のカードの数以下の場合
   *  state isWin を false に更新する
   *
   * state isWin が true の場合
   *  state winCount の値を +1 する
   * state isWin が false の場合
   *  state loseCount の値を +1 する
   *
   * state answered を true に更新する
   *
   */
  function checkHigh() {
    const _secondCard = getCard();
    setSecondCard(_secondCard);

    const isWin = getRankNum(firstCard.rank) < getRankNum(_secondCard.rank);
    setIsWin(isWin);

    isWin ? setWinCount(winCount + 1) : setLoseCount(loseCount + 1);
    setAnswered(true);
  }

  /**
   * カードの数値比較 Lose
   *
   * 処理概要
   * 二枚のカードの数値を比較し、その結果に従って以下の state を更新する
   * state isWin
   * state winCount || loseCount
   * state answered
   *
   * 処理詳細
   * 定数 _secondCard を宣言し、getCard() を使用して初期化する
   *
   * 二枚目のカードの数が、一枚目のカードの数以下の場合
   *  state isWin を true に更新する
   * 二枚目のカードの数が、一枚目のカードの数より大きい場合
   *  state isWin を false に更新する
   *
   * state isWin が true の場合
   *  state winCount の値を +1 する
   * state isWin が false の場合
   *  state loseCount の値を +1 する
   *
   * state answered を true に更新する
   *
   */
  function checkLow() {
    const _secondCard = getCard();
    setSecondCard(_secondCard);

    const isWin = getRankNum(firstCard.rank) >= getRankNum(_secondCard.rank);
    setIsWin(isWin);

    isWin ? setWinCount(winCount + 1) : setLoseCount(loseCount + 1);
    setAnswered(true);
  }

  /* 
  // for debug
  // useEffect() の第二引数に state deck を渡すことで、
  // deck が更新されたときのみ、第一引数に渡したコールバック関数を実行することができる
  useEffect(() => {
    console.log(deck);
  }, [deck]);
 */

  /**
   * ゲーム進行関数
   *
   * 処理概要
   * next ボタン, finish ボタンが押されたときの処理を行う
   *
   * 処理詳細
   * state deck の長さが 0 の場合
   *   satate isGameFinished を true に更新する
   * それ以外の場合
   *   state secondCard の値をコピーして、定数 _secondCard に代入する
   *   定数 _secondCard の値で state firstCard を更新する
   *   state secondCard の値を null に更新する
   *   state answered の値を false に更新する
   *
   */
  function next() {
    if (deck.length === 0) {
      setIsGameFinished(true);
    } else {
      const _secondCard = Object.assign({}, secondCard);
      setFirstCard(_secondCard);
      setSecondCard(null);
      setAnswered(false);
    }
  }

  /**
   * ボタンコンポーネント取得関数
   *
   * 処理概要
   * state answered の値に従って、ボタンコンポーネントを返却する
   *
   * 処理詳細
   * state answered が true の場合
   *  ゲーム進行ボタンコンポーネント GameProgressButton を返却する
   *  props には以下の関数、値を設定する
   *  onClickNext: next()
   *  isTheLastGame: deck.length が 0 かどうか
   *
   * state answered が false の場合
   *  High and Low ボタンコンポーネント HighAndLowButtons を返却する
   *  props には以下の関数を設定する
   *  onClickHigh: chechHigh()
   *  onClickLow: checkLow()
   *
   * 参考
   * props に関数を渡す際に、関数名の後に () を付けるかどうかでどのような違いがあるかについては以下のサイトを参照して理解を深めてください
   *  React.js ドキュメント：　「コンポーネントに関数を渡す」
   *  https://ja.reactjs.org/docs/faq-functions.html
   *  React.js チュートリアル：　「インタラクティブなコンポーネントを作る」の「補足」
   *  https://ja.reactjs.org/tutorial/tutorial.html#making-an-interactive-component
   *
   * @return {component} <GameProgressButton /> or <HighAndLowButtons />
   */
  function getButtons() {
    // prettier-ignore
    return answered ? <GameProgressButton onClickNext={next} isTheLatGame={deck.length === 0} />
                    : <HighAndLowButtons onClickHigh={checkHigh} onClickLow={checkLow} />;
  }

  /**
   * メッセージ取得関数
   *
   * 処理概要
   * 現在のゲーム進行に従って、画面に表示するメッセージコンポーネントを返却する
   *
   * 処理詳細
   * state isGameFinished が true の場合
   *  'Thank you for playing!', `Win: ${winCount} Lose: ${loseCount}` を配列に追加する
   * state answered が true かつ isWin が true の場合
   *  'Win!' を配列に追加する
   * state answered が true かつ isWin が false の場合
   *  'Lose!' を配列に追加する
   * それ以外の場合
   *  'High and Low?' を配列に追加する
   *
   * @return {component} <Message />
   */
  function getMessage() {
    let message = [];
    if (isGameFinished) {
      message.push("Thank you for playing!");
      message.push(`Win: ${winCount} Lose: ${loseCount}`);
    } else if (answered) {
      message.push(isWin ? "Win!" : "Lose!");
    } else {
      message.push("High and Low?");
    }

    return <Message>{message}</Message>;
  }

  /**
   * HighAndLow コンポーネント返却
   *
   * 返却内容
   * PlayArea コンポーネント
   *  props には以下の値を設定する
   *    firstCard: state firstCard
   *    secondCard: state secondCard
   *
   * getMessage() から返却される Message コンポーネント
   *
   * state isGameFinished が true でない場合
   *  getButtons() から返却されるボタンコンポーネント
   *
   */
  return (
    <Box>
      <PlayArea firstCard={firstCard} secondCard={secondCard} />
      <Box className={classes.messageArea}>
        {getMessage()}
        {!isGameFinished && getButtons()}
      </Box>
    </Box>
  );
}
