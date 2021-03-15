import React, { useEffect } from "react";
import { Box, Button } from "@material-ui/core";

/**
 * High and Low ボタンコンポーネント
 *
 * 処理概要
 * High ボタン、Low ボタンを作成する
 *
 * High ボタンの onClick プロパティに props.onClickHigh を設定する
 * Low ボタンの onClick プロパティに props.onClickLow を設定する
 *
 * ボタンの名称を設定する
 * High ボタン → "HIGH"
 * Low ボタン → "LOW"
 *
 * CHALLENGE TASK!!
 * キーボード操作で、ボタンのクリックイベントを発火できるようにする
 *
 * H キーが押されたら props.onClickHigh を発火
 * L キーが押されたら props.onClickLow を発火
 *
 * useEffect hook を使用して、コンポーネントがマウントされたタイミングで イベントリスナーを登録してください
 * なお、このコンポーネントがアンマウントされた場合はイベントを監視する必要がなくなりますので、登録したイベントリスナーは削除してください
 *
 * 参考：
 * React.js フック API リファレンス：　「useEffect」
 * https://ja.reactjs.org/docs/hooks-reference.html#useeffect
 *
 * @param {*} props
 */
export default function HighAndLowButtons(props) {
  useEffect(() => {
    function click(event) {
      switch (event.key) {
        case "h":
          props.onClickHigh();
          break;
        case "l":
          props.onClickLow();
          break;
        default:
          break;
      }
    }
    document.body.addEventListener("keydown", click, {
      passive: false
    });
    return () => {
      document.body.removeEventListener("keydown", click, {
        passive: false
      });
    };
    // マウント時にのみ呼び出したいため、 Missing dependencies の警告を抑制
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box display="flex" flexDirection="row" justifyContent="center" mt={1}>
      <Box mx={1}>
        <Button variant="contained" onClick={props.onClickHigh}>
          HIGH
        </Button>
      </Box>
      <Box mx={1}>
        <Button variant="contained" onClick={props.onClickLow}>
          LOW
        </Button>
      </Box>
    </Box>
  );
}
