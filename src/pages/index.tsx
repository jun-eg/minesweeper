import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  // 0 = 未クリック
  // 1 = 左クリック
  // 2 = はてな
  // 3 = 旗
  const [userInput, setUserInput] = useState<(0 | 1 | 2 | 3)[][]>([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  console.log('userinput', userInput);

  const newuserInput = JSON.parse(JSON.stringify(userInput));

  // 1 = ボムあり
  // 0 = ボムなし

  const [bombMap, setBombMap] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const isPlaying = userInput.some((row) => row.some((input) => input !== 0));

  const isFailure = userInput.some((row, y) =>
    row.some((input, x) => input === 1 && bombMap[y][x] === 1)
  );

  //click_bomb座標を取得
  if (isFailure === true) {
    const click_bomb_position: number[] = [];

    userInput.forEach((row, y) => {
      row.forEach((input, x) => {
        if (input === 1 && bombMap[y][x] === 1) {
          click_bomb_position.push(y, x);
        }
      });
    });
    console.log('click_bomb', click_bomb_position);
  }
  //board
  //-1 = 石
  // 0 = 画像なしセル
  // １－８= 数字セル
  // 9 = 石＋はてな
  //10 = 石+ 旗
  //11 = ボム
  //12 = 赤ボム

  //初期board設置  必要 *最初だけ処理、2回目以降userinput参照*
  const rows = 9;
  const cols = 9;
  const initialValue = -1;

  const board = Array.from({ length: rows }, () => Array(cols).fill(initialValue));

  console.log('board', board);

  //計算値をboardに反映

  //usrinputより1の座標リスト化
  const left_click_positions: number[][] = [];

  for (let zy = 0; zy < newuserInput.length; zy++) {
    for (let zx = 0; zx < newuserInput[zy].length; zx++) {
      if (newuserInput[zy][zx] === 1) {
        left_click_positions.push([zy, zx]);
      }
    }
  }

  // for (const one_left_click_position of left_click_positions) {
  // }

  console.log('left_click_positions', left_click_positions);

  const clikstone = (x: number, y: number) => {
    console.log('クリック※xy順', x, y);

    //個数数え関数
    const math_count = (counted_math: number, map: number[][]): number => {
      let c = 0;
      for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
          if (map[j][i] === counted_math) {
            c++;
          }
        }
      }
      return c;
    };

    // userInput初期クリック座標設置
    newuserInput[y][x] = 1;
    setUserInput(newuserInput);

    //ボム設置
    if (isPlaying === false) {
      const temporary_bombstate: number[][] = [];

      //一時的にbombmapにuserinput,x,y 20
      bombMap[y][x] = 20;

      //９設置マス選出
      while (temporary_bombstate.length < 10) {
        const x_bomb = Math.floor(Math.random() * 9);
        const y_bomb = Math.floor(Math.random() * 9);

        if (bombMap[y_bomb][x_bomb] === 0) {
          temporary_bombstate.push([y_bomb, x_bomb]);
          bombMap[y_bomb][x_bomb] = 1;
        }
      }
      console.log('bonbmap', bombMap);

      //一時的をもとに戻す
      bombMap[y][x] = 0;
      setBombMap(bombMap);
    }

    //数字配置
    const directions = [
      [0, -1],
      [1, -1],
      [1, 0],
      [1, 1],
      [0, 1],
      [-1, 1],
      [-1, 0],
      [-1, -1],
    ];
  };
  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((cell, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => clikstone(x, y)}>
              {cell !== -1 && (
                <div className={styles.picture} style={{ backgroundPosition: -30 * cell + 30 }} />
              )}

              {cell === -1 && <div className={styles.storn} key={`${x}-${y}`} />}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
