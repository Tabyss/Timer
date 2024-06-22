import React, { useEffect, useState } from "react";
import "./style.scss";
import TimePicker from "./TimePicker";
import { IoClose } from "react-icons/io5";

function ModalTimePicker(prop) {
    const { getTimer, setTimer, onClose } = prop;
    const [tempTime, settempTime] = useState({});
    return (
        <div className="modal">
            <div className="modal-overlay">
                <div className="modal-container">
                    <div className="modal-close">
                        <IoClose size="20px" onClick={() => onClose(false)} />
                    </div>
                    <TimePicker getTimer={getTimer} setTimer={settempTime} />
                    <div className="modal-prompt">
                        <button
                            className="cancel"
                            onClick={() => onClose(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className="apply"
                            onClick={() => {
                                setTimer({ ...tempTime });
                                onClose(false);
                            }}
                        >
                            Apply
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalTimePicker;
