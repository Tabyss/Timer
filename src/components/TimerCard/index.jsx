import React, { useEffect, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import "./style.scss";
import ModalTimePicker from "./ModalTimePicker";

function TimerCard() {
    const [timer, setTimer] = useState({ H: 0, M: 0, S: 0 });
    const [modalDisclosure, setModalDisclosure] = useState(false);
    const [isRunning, setIsRunning] = useState(false);

    function handleButtonIncrease(e) {
        if (timer.S + Number(e.target.name) > 59) {
            setTimer((prev) => {
                return {
                    ...prev,
                    M: prev.M + 1,
                    S: prev.S + Number(e.target.name) - 60,
                };
            });
        } else {
            setTimer((prev) => {
                console.log(prev.S);
                return {
                    ...prev,
                    S: prev.S + Number(e.target.name),
                };
            });
        }
    }

    function startCount() {
        if (timer.H === 0 && timer.M === 0 && timer.S === 0) {
            return setIsRunning(isRunning);
        } else {
            return setIsRunning(!isRunning);
        }
    }

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setTimer((prev) => {
                    let { H, M, S } = prev;

                    if (H === 0 && M === 0 && S === 0) {
                        clearInterval(interval);
                        setIsRunning(false);
                        return prev;
                    }

                    if (S === 0) {
                        if (M === 0) {
                            H -= 1;
                            M = 59;
                        } else {
                            M -= 1;
                        }
                        S = 59;
                    } else {
                        S -= 1;
                    }
                    return { H, M, S };
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    return (
        <div className="timer">
            <div className="timer-main">
                <h1 onClick={() => !isRunning && setModalDisclosure(true)}>
                    {timer.H}:{timer.M < 10 ? "0" + timer.M : timer.M}:
                    {timer.S < 10 ? "0" + timer.S : timer.S}
                </h1>
            </div>
            <div className="timer-container">
                <div className="timer-container-increase">
                    <button name="5" onClick={handleButtonIncrease}>
                        +5
                    </button>
                    <button name="10" onClick={handleButtonIncrease}>
                        +10
                    </button>
                    <button name="25" onClick={handleButtonIncrease}>
                        +25
                    </button>
                    <button name="60" onClick={handleButtonIncrease}>
                        +60
                    </button>
                </div>
                <div className="timer-container-button">
                    <button
                        className={isRunning ? "pause" : "play"}
                        onClick={startCount}
                    >
                        {isRunning ? (
                            <FaPause size="36px" />
                        ) : (
                            <FaPlay size="36px" />
                        )}
                    </button>
                </div>
            </div>
            {modalDisclosure ? (
                <ModalTimePicker
                    getTimer={timer}
                    setTimer={setTimer}
                    onClose={setModalDisclosure}
                />
            ) : null}
        </div>
    );
}

export default TimerCard;
