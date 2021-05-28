import React, {useState, useRef} from 'react';
import styles from './VirtualKeyboard.module.scss'
import classNamesBind from 'classnames/bind';

const VirtualKeyboard = () => {

    //let keys = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    let keys = [
        {id: 'q', defaultValue: 'q', shiftedValue: 'Q'},
        {id: 'w', defaultValue: 'w', shiftedValue: 'W'},
        {id: 'e', defaultValue: 'e', shiftedValue: 'E'},
        {id: 'r', defaultValue: 'r', shiftedValue: 'R'},
        {id: 't', defaultValue: 't', shiftedValue: 'T'},
        {id: 'y', defaultValue: 'y', shiftedValue: 'Y'},
        {id: 'u', defaultValue: 'u', shiftedValue: 'U'},
        {id: 'i', defaultValue: 'i', shiftedValue: 'I'},
        {id: 'o', defaultValue: 'o', shiftedValue: 'O'},
        {id: 'p', defaultValue: 'p', shiftedValue: 'P'},
        {id: '[', defaultValue: '[', shiftedValue: '{'},
        {id: ']', defaultValue: ']', shiftedValue: '}'},
        {id: '\\', defaultValue: '\\', shiftedValue: '|'},

        {id: 'a', defaultValue: 'a', shiftedValue: 'A'},
        {id: 's', defaultValue: 's', shiftedValue: 'S'},
        {id: 'd', defaultValue: 'd', shiftedValue: 'D'},
        {id: 'f', defaultValue: 'f', shiftedValue: 'F'},
        {id: 'g', defaultValue: 'g', shiftedValue: 'G'},
        {id: 'h', defaultValue: 'h', shiftedValue: 'H'},
        {id: 'j', defaultValue: 'j', shiftedValue: 'J'},
        {id: 'k', defaultValue: 'k', shiftedValue: 'K'},
        {id: 'l', defaultValue: 'l', shiftedValue: 'L'},
        {id: ';', defaultValue: ';', shiftedValue: ':'},
        {id: "'", defaultValue: "'", shiftedValue: '"'},

        {id: 'z', defaultValue: 'z', shiftedValue: 'Z'},
        {id: 'x', defaultValue: 'x', shiftedValue: 'X'},
        {id: 'c', defaultValue: 'c', shiftedValue: 'C'},
        {id: 'v', defaultValue: 'v', shiftedValue: 'V'},
        {id: 'b', defaultValue: 'b', shiftedValue: 'B'},
        {id: 'n', defaultValue: 'n', shiftedValue: 'N'},
        {id: 'm', defaultValue: 'm', shiftedValue: 'M'},
        {id: ',', defaultValue: ',', shiftedValue: '<'},
        {id: '.', defaultValue: '.', shiftedValue: '>'},
        {id: '/', defaultValue: '/', shiftedValue: '?'},

        { id: '~', defaultValue: '`', shiftedValue: '~' },
        { id: '1', defaultValue: '1', shiftedValue: '!' },
        { id: '2', defaultValue: '2', shiftedValue: '@' },
        { id: '3', defaultValue: '3', shiftedValue: '#' },
        { id: '4', defaultValue: '4', shiftedValue: '$' },
        { id: '5', defaultValue: '5', shiftedValue: '%' },
        { id: '6', defaultValue: '6', shiftedValue: '^' },
        { id: '7', defaultValue: '7', shiftedValue: '&' },
        { id: '8', defaultValue: '8', shiftedValue: '*' },
        { id: '9', defaultValue: '9', shiftedValue: '(' },
        { id: '0', defaultValue: '0', shiftedValue: ')' },
        { id: '-', defaultValue: '-', shiftedValue: '_' },
        { id: '=', defaultValue: '=', shiftedValue: '+' },
    ]

    const [keysLayout, setKeysLayout] = useState(keys)
    const [numbersLayout, setNumbersLayout] = useState(numbers)
    const [deletePressed, setDeletePressed] = useState(false);
    const [shiftPressed, setShiftPressed] = useState(false);
    const [capsPressed, setCapsPressed] = useState(false);
    let result = useRef("");

    const shuffleAlphabet = (arr, pressedKey) => {
        result.current += !shiftPressed ? pressedKey.defaultValue : pressedKey.shiftedValue;
        let currentIndex = keysLayout.length, temporaryValue, randomIndex;

        while (currentIndex !== 0) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = arr[currentIndex];
            arr[currentIndex] = arr[randomIndex];
            arr[randomIndex] = temporaryValue;
        }
        setKeysLayout([...arr]);
        //setDeletePressed(!deletePressed)
    }

    const shuffleNumbers = (nums, pressedKey) => {
        result.current += !shiftPressed ? pressedKey.defaultValue : pressedKey.shiftedValue();
        let currentIndex = numbersLayout.length, temporaryValue, randomIndex;

        while (currentIndex !== 0) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = nums[currentIndex];
            nums[currentIndex] = nums[randomIndex];
            nums[randomIndex] = temporaryValue;
        }
        setNumbersLayout([...nums]);
        //setDeletePressed(!deletePressed)
    }

    const deleteHandler = () => {
        result.current = result.current.slice(0, result.current.length - 1)
        setDeletePressed(!deletePressed);
    }

    const tabHandler = () => result.current += '     ';
    const capsHandler = () => setCapsPressed(!capsPressed);
    const returnHandler= () => result.current += '\n'
    const shiftHandler = () => setShiftPressed(!shiftPressed);
    const spaceHandler = () => result.current += ' ';


    return (
        <main>
            <textarea placeholder="Text will appear here..." value={result.current}/>
            <div className={styles['virtual-keyboard']}>
                <section>
                    {
                        keysLayout.slice(34, 47).map((alpha, index) =>
                            <button
                                onClick={(e) => shuffleAlphabet(keys, alpha)}
                            >{!shiftPressed ? alpha.defaultValue : alpha.shiftedValue}
                            </button>
                        )
                    }
                    <button className={styles.delete} onClick={deleteHandler}>Delete</button>
                </section>
                <section>
                    <button className={styles.tab} onClick={tabHandler}>Tab</button>
                    {
                        keysLayout.slice(0, 13).map((alpha, index) =>
                            <button
                                onClick={(e) => shuffleAlphabet(keys, alpha)}
                            >{(!shiftPressed && !capsPressed) ? alpha.defaultValue : alpha.shiftedValue}
                            </button>
                        )
                    }
                </section>
                <section>
                    <button className={classNamesBind( [styles['caps-lock']], {[styles['caps-lock-active']]: capsPressed })} onClick={capsHandler}>Caps</button>
                    {
                        keysLayout.slice(13, 24).map((alpha, index) =>
                            <button
                                onClick={(e) => shuffleAlphabet(keys, alpha)}
                            >{(!shiftPressed && !capsPressed) ? alpha.defaultValue : alpha.shiftedValue}
                            </button>
                        )
                    }
                    <button className={styles.return} onClick={returnHandler}>Return</button>
                </section>
                <section>
                    <button className={classNamesBind([styles['shift']], {[styles['shift-active']]: shiftPressed })} onClick={shiftHandler}>Shift</button>
                    {
                        keysLayout.slice(24, 34).map((alpha, index) =>
                            <button
                                onClick={(e) => shuffleAlphabet(keys, alpha)}
                            >{(!shiftPressed && !capsPressed) ? alpha.defaultValue : alpha.shiftedValue}
                            </button>
                        )
                    }
                    <button className={classNamesBind([styles['shift']], {[styles['shift-active']]: shiftPressed })} onClick={shiftHandler}>Shift</button>
                </section>
                <section>
                    <button >Ctrl</button>
                    <button >Alt</button>
                    <button >Command</button>
                    <button className={styles.space} onClick={spaceHandler}>Space</button>
                    <button >command</button>
                    <button >Alt</button>
                    <button >Ctrl</button>
                </section>
            </div>
        </main>
    )
};

export default VirtualKeyboard;