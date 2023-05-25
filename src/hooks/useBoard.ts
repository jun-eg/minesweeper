import { useMemo } from 'react';
export const useBoard = ({
  userInput,
  bombMap,
}: {
  userInput: (0 | 1 | 2 | 3)[][];
  bombMap: number[][];
}) => {
  const board = useMemo(() => {
    //初期board設置
    const rows = 9;
    const cols = 9;
    const initialValue = -1;
    const board = Array.from({ length: rows }, () => Array(cols).fill(initialValue));

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

    const newuserInput = JSON.parse(JSON.stringify(userInput));

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

    return board;
  }, [userInput, bombMap]);
  return board;
};
