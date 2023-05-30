import { useIndex } from '../hooks/useIndex';
import styles from './index.module.css';

const Home = () => {
  const {
    board,
    click_niko,
    right_click_process,
    clikstone,
    niko_button_value,
    left_flag_count,
    timer_count,
  } = useIndex();

  return (
    <div className={styles.container}>
      <div className={styles.boardcontainer}>
        <div className={styles.topcontainer}>
          <div className={styles.nikobutton} onClick={() => click_niko(100, 100)}>
            <div
              className={styles.picture}
              style={{ backgroundPosition: -30 * niko_button_value + 30 }}
            />
          </div>
          <div className={styles.timecontainer}>
            <p>{timer_count}</p>
          </div>
          <div className={styles.flagcountcontainer}>
            <p>{left_flag_count}</p>
          </div>
        </div>

        <div className={styles.boardaround}>
          <div className={styles.board}>
            {board.map((row, y) =>
              row.map((cell, x) => (
                <div
                  className={styles.cell}
                  key={`${x}-${y}`}
                  onClick={() => clikstone(x, y)}
                  onContextMenu={(event) => right_click_process(event, x, y)}
                  style={{ background: '#aeaaaa' }}
                >
                  {cell !== -1 && cell !== 9 && cell !== 10 && (
                    <div
                      className={styles.picture}
                      style={{ backgroundPosition: -30 * cell + 30 }}
                    />
                  )}

                  {(cell === -1 || cell === 9 || cell === 10) && (
                    <div className={styles.stone} key={`${x}-${y}`}>
                      {(cell === 9 || cell === 10) && (
                        <div
                          className={styles.picture}
                          style={{ backgroundPosition: `${-100 * cell + 100}%` }}
                        />
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
