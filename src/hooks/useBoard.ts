import { useState } from 'react';

export const useBoard = () => {
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

  // const [timer, settimer] = useState(0);

  // const new_timer = JSON.parse(JSON.stringify(timer));

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

  //board
  //-1 = 石
  // 0 = 画像なしセル
  // １－８= 数字セル
  // 9 = 石＋はてな
  //10 = 石+ 旗
  //11 = ボム
  //12 = 赤ボム

  //初期board設置
  const rows = 9;
  const cols = 9;
  const initialValue = -1;

  const board = Array.from({ length: rows }, () => Array(cols).fill(initialValue));

  console.log('board', board);

  //play判定
  const isPlaying = userInput.some((row) => row.some((input) => input !== 0));

  //ゲームオーバー判定
  let niko_button_value = 12;

  const isFailure = userInput.some((row, y) =>
    row.some((input, x) => input === 1 && bombMap[y][x] === 1)
  );

  //計算値をboardに反映
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

  //usrinputより1の座標リスト化
  const left_click_positions: number[][] = [];

  for (let zy = 0; zy < newuserInput.length; zy++) {
    for (let zx = 0; zx < newuserInput[zy].length; zx++) {
      if (newuserInput[zy][zx] === 1) {
        left_click_positions.push([zy, zx]);
      }
    }
  }

  //空白連鎖
  const empty_cell_chain = (cell_list: number[][]) => {
    for (const empty_cell_posicion of cell_list) {
      if (bombMap[empty_cell_posicion[0]][empty_cell_posicion[1]] !== 1) {
        for (const next_cell_course of directions) {
          if (
            board[empty_cell_posicion[0] + next_cell_course[0]] !== undefined &&
            board[empty_cell_posicion[1] + next_cell_course[1]] !== undefined &&
            board[empty_cell_posicion[0] + next_cell_course[0]][
              empty_cell_posicion[1] + next_cell_course[1]
            ] === -1
          ) {
            bomb_quantity_set([
              [
                empty_cell_posicion[0] + next_cell_course[0],
                empty_cell_posicion[1] + next_cell_course[1],
              ],
            ]);
          }
        }
      }
    }
  };

  //board数字設置関数
  const bomb_quantity_set = (posicions_list: number[][]) => {
    const empty_cell_list: number[][] = [];

    for (const one_left_click_position of posicions_list) {
      if (bombMap[one_left_click_position[0]][one_left_click_position[1]] !== 1) {
        let bomb_count = 0;

        for (const next_cell_course of directions) {
          if (
            bombMap[one_left_click_position[0] + next_cell_course[0]] !== undefined &&
            bombMap[one_left_click_position[1] + next_cell_course[1]] !== undefined &&
            bombMap[one_left_click_position[0] + next_cell_course[0]][
              one_left_click_position[1] + next_cell_course[1]
            ] === 1
          ) {
            bomb_count++;
          }
        }

        board[one_left_click_position[0]][one_left_click_position[1]] = bomb_count;

        if (board[one_left_click_position[0]][one_left_click_position[1]] === 0) {
          empty_cell_list.push(one_left_click_position);
        }
      }
    }

    if (empty_cell_list.length !== 0) {
      empty_cell_chain(empty_cell_list);
    }
  };

  bomb_quantity_set(left_click_positions);

  //リロード
  const click_niko = (x: number, y: number) => {
    if (x === 100 && y === 100) {
      //bonbmap初期化
      for (let i = 0; i < bombMap.length; i++) {
        for (let j = 0; j < bombMap[i].length; j++) {
          bombMap[i][j] = 0;
        }
      }

      //userinput初期化
      for (let i = 0; i < newuserInput.length; i++) {
        for (let j = 0; j < newuserInput[i].length; j++) {
          newuserInput[i][j] = 0;
        }
      }

      setUserInput(newuserInput);
    }
  };

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

  //右クリック処理
  const right_click_process = (event: React.MouseEvent, x: number, y: number) => {
    event.preventDefault();
    console.log('右クリック！', x, y);
    if (userInput[y][x] === 0 && board[y][x] === -1) {
      newuserInput[y][x] = 3;
      console.log('右3');
    } else if (userInput[y][x] === 3 && board[y][x] === 10) {
      newuserInput[y][x] = 2;
    } else if (userInput[y][x] === 2 && board[y][x] === 9) {
      newuserInput[y][x] = 0;
    }
    setUserInput(newuserInput);
    console.log('uinput', newuserInput);
  };

  //旗、？設置、消去
  for (let zy = 0; zy < userInput.length; zy++) {
    for (let zx = 0; zx < userInput[zy].length; zx++) {
      if ((newuserInput[zy][zx] === 0 && board[zy][zx] === 10) || board[zy][zx] === 9) {
        board[zy][zx] = -1;
      } else if (newuserInput[zy][zx] === 3) {
        board[zy][zx] = 10;
      } else if (newuserInput[zy][zx] === 2) {
        board[zy][zx] = 9;
      }
    }
  }

  //残りflag数
  let left_flag_count = 10;
  for (let zy = 0; zy < userInput.length; zy++) {
    for (let zx = 0; zx < userInput[zy].length; zx++) {
      if (newuserInput[zy][zx] === 3) {
        left_flag_count -= 1;
      }
    }
  }
  console.log('残り旗数', left_flag_count);

  // //タイマーstars条件
  // let time_start = false;
  // if (math_count(1, userInput) === 1) {
  //   time_start = true;
  // }

  //タイマー

  // let timerId;
  // let counter = timer;

  // if (time_start) {
  //   timerId = setInterval(() => {
  //     counter++;
  //     console.log(counter);
  //   }, 1000);
  // }

  // if (isFailure === true) {
  //   clearInterval(timerId);
  //   console.log('stop');
  // }

  //ゲームオーバー処理
  if (isFailure === true) {
    //赤ボム座標取得
    for (let zy = 0; zy < newuserInput.length; zy++) {
      for (let zx = 0; zx < newuserInput[zy].length; zx++) {
        if (newuserInput[zy][zx] === 1 && bombMap[zy][zx]) {
          board[zy][zx] = 12;
          console.log('赤ボム座標,xy順', zx, zy);
        }
      }
    }

    //boardにbonb設置
    for (let zy = 0; zy < bombMap.length; zy++) {
      for (let zx = 0; zx < bombMap[zy].length; zx++) {
        if (bombMap[zy][zx] === 1) {
          board[zy][zx] = 11;
        }
      }
    }

    niko_button_value = 14;

    // clearInterval(timerId);
  }

  //クリア処理
  let stone_count = math_count(9, board);
  stone_count += math_count(10, board);
  stone_count += math_count(-1, board);

  if (stone_count === 10) {
    niko_button_value = 13;
    console.log('クリア');

    for (let zy = 0; zy < userInput.length; zy++) {
      for (let zx = 0; zx < userInput[zy].length; zx++) {
        if (
          board[zy][zx] === -1 ||
          board[zy][zx] === 9 ||
          (board[zy][zx] === 10 && userInput[zy][zx] !== 1)
        ) {
          board[zy][zx] = 10;
        }
      }
    }

    // clearInterval(timerId);
  }

  const clikstone = (x: number, y: number) => {
    console.log('クリック※xy順', x, y);

    // userInput初期クリック座標設置
    newuserInput[y][x] = 1;
    setUserInput(newuserInput);

    //ボム設置
    if (isPlaying === false) {
      const temporary_bombstate: number[][] = [];

      //一時的にbombmapにuserinput,x,yと周り9マスに20
      for (const course of directions) {
        if (bombMap[y + course[0]] !== undefined && bombMap[x + course[1]] !== undefined) {
          bombMap[y + course[0]][x + course[1]] = 20;
        }
      }
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
      for (const course of directions) {
        if (bombMap[y + course[0]] !== undefined && bombMap[x + course[1]] !== undefined) {
          bombMap[y + course[0]][x + course[1]] = 0;
        }
      }
      bombMap[y][x] = 0;
      setBombMap(bombMap);
    }

    //数字クリック

    //周り旗数え

    let click_around_flag = 0;

    for (const around of directions) {
      if (
        board[y + around[0]] !== undefined &&
        board[x + around[1]] !== undefined &&
        board[y + around[0]][x + around[1]] === 10
      ) {
        click_around_flag += 1;
      }
    }

    if (board[y][x] === click_around_flag) {
      for (const around of directions) {
        if (
          board[y + around[0]] !== undefined &&
          board[x + around[1]] !== undefined &&
          board[y + around[0]][x + around[1]] === -1
        ) {
          newuserInput[y + around[0]][x + around[1]] = 1;
        }
      }
    }

    setUserInput(newuserInput);
  };
  return { board, click_niko, right_click_process, clikstone, niko_button_value, left_flag_count };
};
