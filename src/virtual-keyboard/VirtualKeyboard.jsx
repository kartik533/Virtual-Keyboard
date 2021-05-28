import React, {useState, useEffect, useRef} from 'react';
import styles from './VirtualKeyboard.module.scss'

const VirtualKeyboard = () => {

    let keys = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    useEffect(() => {
        console.log('in use effect')
        document.querySelectorAll(".key").forEach(item => {
            item.addEventListener("click", (e) => {
                let element = e.target.closest('div')
                if (isNaN(element.textContent)) {
                    shuffleAlphabet(keys, element.textContent)
                } else {
                    shuffleNumbers(numbers, element.textContent)
                }
            }, false)
        });
        //eslint-disable-next-line
    }, []);


    const [keysLayout, setKeysLayout] = useState(keys)
    const [numbersLayout, setNumbersLayout] = useState(numbers)
    const [deletePressed, setDeletePressed] = useState(false);
    let result = useRef("");

    const shuffleAlphabet = (arr, pressedKey) => {
        result.current += pressedKey;
        let currentIndex = keysLayout.length, temporaryValue, randomIndex;

        while (currentIndex !== 0) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = arr[currentIndex];
            arr[currentIndex] = arr[randomIndex];
            arr[randomIndex] = temporaryValue;
        }
        setKeysLayout([...arr]);
    }

    const shuffleNumbers = (nums, pressedKey) => {
        result.current += pressedKey;
        let currentIndex = numbersLayout.length, temporaryValue, randomIndex;

        while (currentIndex !== 0) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = nums[currentIndex];
            nums[currentIndex] = nums[randomIndex];
            nums[randomIndex] = temporaryValue;
        }
        setNumbersLayout([...nums]);
        console.log(numbersLayout)
    }

    const deleteHandler = () => {
        result.current = result.current.slice(0, result.current.length - 1)
        setDeletePressed(!deletePressed);
    }

    const tabHandler = () => result.current += '     ';
    const spaceHandler = () => result.current += ' ';

    const shiftHandler = () => null;

    return (
        <main>
            <div className={styles['virtual-keyboard']}>
                <section>
                    <div className="key">~</div>
                    <div className="key">{numbersLayout[0]}</div>
                    <div className="key">{numbersLayout[1]}</div>
                    <div className="key">{numbersLayout[2]}</div>
                    <div className="key">{numbersLayout[3]}</div>
                    <div className="key">{numbersLayout[4]}</div>
                    <div className="key">{numbersLayout[5]}</div>
                    <div className="key">{numbersLayout[6]}</div>
                    <div className="key">{numbersLayout[7]}</div>
                    <div className="key">{numbersLayout[8]}</div>
                    <div className="key">{numbersLayout[9]}</div>
                    <div className="key">-</div>
                    <div className="key">+</div>
                    <div className={styles.delete} onClick={deleteHandler}>Delete</div>
                </section>
                <section>
                    <div className={styles.tab} onClick={tabHandler}>Tab</div>
                    <div className="key">{keysLayout[16]}</div>
                    <div className="key">{keysLayout[22]}</div>
                    <div className="key">{keysLayout[4]}</div>
                    <div className="key">{keysLayout[17]}</div>
                    <div className="key">{keysLayout[19]}</div>
                    <div className="key">{keysLayout[24]}</div>
                    <div className="key">{keysLayout[20]}</div>
                    <div className="key">{keysLayout[8]}</div>
                    <div className="key">{keysLayout[14]}</div>
                    <div className="key">{keysLayout[15]}</div>
                    <div className="key">[</div>
                    <div className="key">]</div>
                    <div className={styles.backlash}>\</div>
                </section>
                <section>
                    <div className={styles.capslock}>CapsLock</div>
                    <div className="key">{keysLayout[0]}</div>
                    <div className="key">{keysLayout[18]}</div>
                    <div className="key">{keysLayout[3]}</div>
                    <div className="key">{keysLayout[5]}</div>
                    <div className="key">{keysLayout[6]}</div>
                    <div className="key">{keysLayout[7]}</div>
                    <div className="key">{keysLayout[9]}</div>
                    <div className="key">{keysLayout[10]}</div>
                    <div className="key">{keysLayout[11]}</div>
                    <div className="key">;</div>
                    <div className="key">'</div>
                    <div className={styles.return}>Return</div>
                </section>
                <section>
                    <div className={styles['left-shift']} onClick={shiftHandler}>Shift</div>
                    <div className="key">{keysLayout[25]}</div>
                    <div className="key">{keysLayout[23]}</div>
                    <div className="key">{keysLayout[2]}</div>
                    <div className="key">{keysLayout[21]}</div>
                    <div className="key">{keysLayout[1]}</div>
                    <div className="key">{keysLayout[13]}</div>
                    <div className="key">{keysLayout[12]}</div>
                    <div className="key">,</div>
                    <div className="key">.</div>
                    <div className="key">/</div>
                    <div className={styles['right-shift']} onClick={shiftHandler}>Shift</div>
                </section>
                <section>
                    <div className={styles['left-ctrl']}>Ctrl</div>
                    <div className="key">Alt</div>
                    <div className={styles.command}>Command</div>
                    <div className={styles.space} onClick={spaceHandler}>Space</div>
                    <div className={styles.command}>command</div>
                    <div className="key">Alt</div>
                    <div className="key">Ctrl</div>
                    <div className="key">Fn</div>
                </section>

                <textarea placeholder="Text will appear here..." value={result.current}></textarea>
            </div>
        </main>
    )
};

export default VirtualKeyboard;