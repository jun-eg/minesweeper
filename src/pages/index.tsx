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
  const bombCount = 10;

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

  //board作成
  const rows = 9;
  const cols = 9;

  const board: number[][] = Array.from({ length: rows }, () => Array(cols).fill(-1));
  //board
  //-1 = 石
  // 0 = 画像なしセル
  // １－８= 数字セル
  // 9 = 石＋はてな
  //10 = 石+ 旗
  //11 = ボム
  //12 = 赤ボム

  const isPlaying = userInput.some((row) => row.some((input) => input !== 0));

  //ボム設置
  if (isPlaying === false) {
    const temporary_bombstate: number[][] = [];

    //userinputとbomb座標重複回避
    // bombMap[y][x] = 20;

    //９設置マス選出
    while (temporary_bombstate.length < bombCount) {
      const x_bomb = Math.floor(Math.random() * 9);
      const y_bomb = Math.floor(Math.random() * 9);

      if (bombMap[y_bomb][x_bomb] === 0) {
        temporary_bombstate.push([y_bomb, x_bomb]);
        bombMap[y_bomb][x_bomb] = 1;
        //boardボム設置
        board[y_bomb][x_bomb] = 11;
      }
    }
    console.log('bonbmap', bombMap);
    //重複回避解除
    // bombMap[y][x] = 0;
    setBombMap(bombMap);
  }

  const clikstone = (x: number, y: number) => {
    console.log('クリック', x, y);

    //座標リスト化関数
    const state_list = (array: number[][], targetValue: number) => {
      const state: number[][] = [];

      array.forEach((row, rowIndex) => {
        row.forEach((value, colIndex) => {
          if (value === targetValue) {
            state.push([rowIndex, colIndex]);
          }
        });
      });
      return state;
    };

    console.log('bomb位置', state_list(bombMap, 1));

    // userInput初期クリック座標設置
    newuserInput[y][x] = 1;
    setUserInput(newuserInput);
    console.log('userinput', newuserInput);

    //計算値

    const isFailure = userInput.some((row, y) =>
      row.some((input, x) => input === 1 && bombMap[y][x] === 1)
    );

    const target_valu: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const openedCount = board.reduce((total, row) => {
      return total + row.filter((value) => target_valu.includes(value)).length;
    }, 0);

    console.log('opened count', openedCount);

    const isSuccess = openedCount + bombCount;

    //数字設置
    for (const one_cell of state_list(bombMap, 0)) {
      let around_bomb_count = 0;

      for (const exposure of directions) {
        if (
          bombMap[one_cell[0] + exposure[0]] !== undefined &&
          bombMap[one_cell[1] + exposure[1]] !== undefined &&
          bombMap[one_cell[0] + exposure[0]][one_cell[1] + exposure[1]] === 1
        ) {
          console.log('数字位置', one_cell);
          around_bomb_count++;
        }
      }
      board[one_cell[0]][one_cell[1]] = around_bomb_count;
      console.log('ボム数', around_bomb_count);
    }

    console.log('board', board);
  };
  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((cell, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => clikstone(x, y)}>
              <div className={styles.picture} style={{ backgroundPosition: -30 * cell + 30 }} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
