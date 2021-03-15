import { makeStyles } from "@material-ui/styles";

/**
 * スタイル設定用 hooks
 *
 * プレイエリア、メッセージエリア、メッセージのスタイルを設定するための hooks
 *  ※ Card コンポーネントで用いているように、それぞれのコンポーネントで定義しても問題ないが
 *    今回はカスタムフック作成の一例としてこのように定義する
 */
export const useStyles = makeStyles({
  playArea: {
    margin: "50px 25px"
  },
  messageArea: {
    margin: "10px"
  },
  message: {
    fontSize: "22px",
    color: "white"
  }
});
