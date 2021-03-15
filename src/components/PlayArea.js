import React from "react";
import { Box, Grid } from "@material-ui/core";
import Card from "./Card";
import { useStyles } from "../hooks/useStyles";

/**
 * プレイエリアコンポーネント
 *
 * 処理概要
 * カードを横に二枚並べて表示する
 *
 * 処理詳細
 * 定数 classes を宣言して、useStyles() hook を使用して初期化する
 * 二つある Card コンポーネントに、順に card オブジェクトを設定する
 * 一つ目の Card コンポーネント： props.firstCard
 * 二つ目の Card コンポーネント： props.secondCard
 *
 * @param {*} props
 */
export default function PlayArea(props) {
  const classes = useStyles();
  return (
    <Box className={classes.playArea}>
      <Grid container direction="row" spacing={2} alignItems="center" justify="center">
        <Grid item>
          <Card card={props.firstCard}></Card>
        </Grid>
        <Grid item>
          <Card card={props.secondCard}></Card>
        </Grid>
      </Grid>
    </Box>
  );
}
