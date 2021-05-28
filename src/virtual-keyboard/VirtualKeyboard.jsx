import React, { useState, useRef } from 'react';
import styles from './VirtualKeyboard.module.scss'
import classNamesBind from 'classnames/bind';
import { keys } from './utils/constants';
import { shuffleAlphabet } from "./utils/util";

const VirtualKeyboard = () => {

    const [keysLayout, setKeysLayout] = useState(keys)
    const [deletePressed, setDeletePressed] = useState(false);
    const [shiftPressed, setShiftPressed] = useState(false);
    const [capsPressed, setCapsPressed] = useState(false);
    let result = useRef("");

    const keyHandler = (arr, pressedKey) => {
        result.current += !shiftPressed ? pressedKey.defaultValue : pressedKey.shiftedValue;
        shuffleAlphabet(arr)
        setKeysLayout([...arr]);
    }

    const deleteHandler = () => {
        result.current = result.current.slice(0, result.current.length - 1)
        setDeletePressed(!deletePressed);
    }

    const tabHandler = () => result.current += '     ';
    const capsHandler = () => setCapsPressed(!capsPressed);
    const returnHandler = () => result.current += '\n'
    const shiftHandler = () => setShiftPressed(!shiftPressed);
    const spaceHandler = () => result.current += ' ';

    const isAlphaKey = (pressedKey) => {
        const asciiCode = pressedKey.defaultValue.charCodeAt(0);
        if (asciiCode >= 65 && asciiCode <= 90) return true;
        return asciiCode >= 97 && asciiCode <= 122;
    }

    const fetchKeyValue = (pressedKey) => {
        if (shiftPressed) {
            return pressedKey.shiftedValue;
        } else if (isAlphaKey(pressedKey) && capsPressed) {
            return pressedKey.shiftedValue
        }
        return pressedKey.defaultValue;
    }

    return (
        <main>
            <textarea placeholder="Text will appear here..." value={result.current}/>
            <div className={styles['virtual-keyboard']}>
                <section>
                    {
                        keysLayout.slice(34, 47).map((alpha, index) =>
                            <button
                                onClick={(e) => keyHandler(keys, alpha)}
                            >{fetchKeyValue(alpha)}
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
                                onClick={(e) => keyHandler(keys, alpha)}
                            >{fetchKeyValue(alpha)}
                            </button>
                        )
                    }
                </section>
                <section>
                    <button
                        className={classNamesBind([styles['caps-lock']], {[styles['caps-lock-active']]: capsPressed})}
                        onClick={capsHandler}>Caps
                    </button>
                    {
                        keysLayout.slice(13, 24).map((alpha, index) =>
                            <button
                                onClick={(e) => keyHandler(keys, alpha)}
                            >{fetchKeyValue(alpha)}
                            </button>
                        )
                    }
                    <button className={styles.return} onClick={returnHandler}>Return</button>
                </section>
                <section>
                    <button className={classNamesBind([styles['shift']], {[styles['shift-active']]: shiftPressed})}
                            onClick={shiftHandler}>Shift
                    </button>
                    {
                        keysLayout.slice(24, 34).map((alpha, index) =>
                            <button
                                onClick={(e) => keyHandler(keys, alpha)}
                            >{fetchKeyValue(alpha)}
                            </button>
                        )
                    }
                    <button className={classNamesBind([styles['shift']], {[styles['shift-active']]: shiftPressed})}
                            onClick={shiftHandler}>Shift
                    </button>
                </section>
                <section>
                    <button>Ctrl</button>
                    <button>Alt</button>
                    <button>Command</button>
                    <button className={styles.space} onClick={spaceHandler}>Space</button>
                    <button>command</button>
                    <button>Alt</button>
                    <button>Ctrl</button>
                </section>
            </div>
        </main>
    )
};

export default VirtualKeyboard;