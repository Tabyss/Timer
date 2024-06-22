import React, { useEffect, useRef, useState } from "react";

const HEIGHT = 36;

function TimePicker(prop) {
    const { getTimer, setTimer } = prop;
    const [time, setTime] = useState({ H: 0, M: 0, S: 0 });
    const scrollHourRef = useRef(null);
    const scrollMinuteRef = useRef(null);
    const scrollSecondRef = useRef(null);

    function handleUpdate() {
        if (scrollHourRef.current) {
            const { scrollTop } = scrollHourRef.current;
            setTime((prev) => {
                return {
                    ...prev,
                    H: Math.round(scrollTop / HEIGHT),
                };
            });
        }
        if (scrollMinuteRef.current) {
            const { scrollTop } = scrollMinuteRef.current;
            setTime((prev) => {
                return {
                    ...prev,
                    M: Math.round(scrollTop / HEIGHT),
                };
            });
        }
        if (scrollSecondRef.current) {
            const { scrollTop } = scrollSecondRef.current;
            setTime((prev) => {
                return {
                    ...prev,
                    S: Math.round(scrollTop / HEIGHT),
                };
            });
        }
        setTimer({ ...time });
    }

    useEffect(() => {
        if (scrollHourRef.current) {
            scrollHourRef.current.scrollTo({
                top: getTimer.H * HEIGHT,
                behavior: "smooth",
            });
        }
        if (scrollMinuteRef.current) {
            scrollMinuteRef.current.scrollTo({
                top: getTimer.M * HEIGHT,
                behavior: "smooth",
            });
        }
        if (scrollSecondRef.current) {
            scrollSecondRef.current.scrollTo({
                top: getTimer.S * HEIGHT,
                behavior: "smooth",
            });
        }
    }, [getTimer]);

    return (
        <div className="timePicker">
            <div
                className="pick hour"
                ref={scrollHourRef}
                onScroll={handleUpdate}
            >
                {Array.from(Array(24), (e, i) => {
                    return (
                        <h3
                            key={i}
                            className={i === time.H ? "active" : ""}
                            onClick={() =>
                                setTime((prev) => {
                                    return {
                                        ...prev,
                                        H: i,
                                    };
                                })
                            }
                        >
                            {i < 10 ? "0" + i : i}
                        </h3>
                    );
                })}
            </div>
            <h2>:</h2>
            <div
                className="pick minute"
                ref={scrollMinuteRef}
                onScroll={handleUpdate}
            >
                {Array.from(Array(60), (e, i) => {
                    return (
                        <h3
                            key={i}
                            className={i === time.M ? "active" : ""}
                            onClick={() =>
                                setTime((prev) => {
                                    return {
                                        ...prev,
                                        M: i,
                                    };
                                })
                            }
                        >
                            {i < 10 ? "0" + i : i}
                        </h3>
                    );
                })}
            </div>
            <h2>:</h2>
            <div
                className="pick second"
                ref={scrollSecondRef}
                onScroll={handleUpdate}
            >
                {Array.from(Array(60), (e, i) => {
                    return (
                        <h3
                            key={i}
                            className={i === time.S ? "active" : ""}
                            onClick={() =>
                                setTime((prev) => {
                                    return {
                                        ...prev,
                                        S: i,
                                    };
                                })
                            }
                        >
                            {i < 10 ? "0" + i : i}
                        </h3>
                    );
                })}
            </div>
        </div>
    );
}

export default TimePicker;
