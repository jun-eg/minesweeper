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

  const isPlaying = userInput.some((row) => row.some((input) => input !== 0));
  const isFailure = userInput.some((row, y) =>
    row.some((input, x) => input === 1 && bombMap[y][x] === 1)
  );

  //-1 = 右
  // 0 = 画像なしセル
  // １－８= 数字セル
  // 9 = 石＋はてな
  //10 = 石+ 旗
  //11 = ボム
  //12 = 赤ボム
  //ボム設置

  const clikCell = (x: number, y: number) => {
    console.log('クリック', x, y);

    // userInput初期クリック座標設置 仮
    newuserInput[y][x] = 1;

    //ボム設置
    const temporary_bombstate: number[][] = [];

    //1次的にbonbmapuにuserinput,x,y 20
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
    //１次的をもとに戻す
    bombMap[y][x] = 0;
    setBombMap(bombMap);

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
      <div className={styles.userInput}>
        {userInput.map((row, y) =>
          row.map((cell, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => clikCell(x, y)}>
              <div className={styles.picture} style={{ backgroundPosition: -30 * cell + 30 }} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
