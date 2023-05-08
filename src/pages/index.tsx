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

  //0 = ボムあり
  // 1 = ボムなし

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

    //ボム設置
    const bombstate: number[][] = [[y, x]];

    while (bombstate.length < 11) {
      const x_bomb = Math.floor(Math.random() * 9);
      const y_bomb = Math.floor(Math.random() * 9);

      for (const one_bombstate of bombstate) {
        if (one_bombstate[0] !== y_bomb && one_bombstate[1] !== x_bomb) {
          bombstate.push([y_bomb, x_bomb]);
        }
      }
    }

    for (const one_bombstate of bombstate) {
      bombMap[one_bombstate[0]][one_bombstate[1]] = 11;
    }

    console.log('bomb座標', bombstate);
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
