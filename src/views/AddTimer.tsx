import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTimers } from "../context/TimerContext";
import { nanoid } from "nanoid";
import type { Timer } from "../types/types";
import { StyledButtonContainer } from "../components/generic/ContainerDisplays";
import Button from "../components/generic/Button.tsx";
import { StyledLabel } from '../components/generic/FormStyling';
import { FormContainer } from '../components/generic/ContainerDisplays';


const AddTimerView = () => {
    const { addTimer } = useTimers();
    const navigate = useNavigate();

    const [type, setType] = useState("stopwatch");
    const [config, setConfig] = useState<any>({ hours: 0, minutes: 0, seconds: 0, numberOfRounds: 1 });

    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setType(event.target.value);
        setConfig({ hours: 0, minutes: 0, seconds: 0, numberOfRounds: 1 });
    };

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfig({ ...config, [event.target.name]: Number(event.target.value) });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const totalTime = (config.hours * 3600 + config.minutes * 60 + config.seconds) * 1000;
        const timerType = type as 'stopwatch' | 'countdown' | 'xy' | 'tabata';

        const newTimer: Timer = {
            id: nanoid(),
            type: timerType,
            config: type === "tabata"
                ? { ...config, initialTime: config.workTime * 1000, isWorkPhase: true }
                : { ...config, initialTime: type === "stopwatch" ? 0 : totalTime },
            state: "notRunning",
            timeLeft: type === "stopwatch" ? 0 : type === "tabata" ? config.workTime * 1000 : totalTime,
        };
        addTimer(newTimer);
        navigate("/");
    };


    return (
        <FormContainer>
            <h2>Add New Timer</h2>
            <form onSubmit={handleSubmit}>
                <StyledLabel>
                    Type:
                    <select value={type} onChange={handleTypeChange}>
                        <option value="stopwatch">Stopwatch</option>
                        <option value="countdown">Countdown</option>
                        <option value="xy">XY</option>
                        <option value="tabata">Tabata</option>
                    </select>
                </StyledLabel>
                {(type === "countdown" || type === "stopwatch") && (
                    <>
                        <StyledLabel>
                            Hours:
                            <input name="hours" type="number" placeholder="Hours" value={config.hours} onChange={handleInput} />
                        </StyledLabel>
                        <StyledLabel>
                            Minutes:
                            <input name="minutes" type="number" placeholder="Minutes" value={config.minutes} onChange={handleInput} />
                        </StyledLabel>
                        <StyledLabel>
                            Seconds:
                            <input name="seconds" type="number" placeholder="Seconds" value={config.seconds} onChange={handleInput} />
                        </StyledLabel>
                    </>
                )}
                {type === "xy" && (
                    <>
                        <StyledLabel>
                            Minutes:
                            <input name="minutes" type="number" placeholder="Minutes" value={config.minutes} onChange={handleInput} />
                        </StyledLabel>
                        <StyledLabel>
                            Seconds:
                            <input name="seconds" type="number" placeholder="Seconds" value={config.seconds} onChange={handleInput} />
                        </StyledLabel>
                        <StyledLabel>
                            Rounds:
                            <input name="numberOfRounds" type="number" placeholder="Rounds" value={config.numberOfRounds} onChange={handleInput} />
                        </StyledLabel>
                    </>
                )}
                {type === "tabata" && (
                    <>
                        <StyledLabel>
                            Work Time (seconds):
                            <input name="workTime" type="number" placeholder="Work Time (seconds)" value={config.workTime} onChange={handleInput} />
                        </StyledLabel>
                        <StyledLabel>
                            Rest Time (seconds):
                            <input name="restTime" type="number" placeholder="Rest Time (seconds)" value={config.restTime} onChange={handleInput} />
                        </StyledLabel>
                        <StyledLabel>
                            Rounds:
                            <input name="numberOfRounds" type="number" placeholder="Rounds" value={config.numberOfRounds} onChange={handleInput} />
                        </StyledLabel>
                    </>
                )}
                <StyledButtonContainer>

                    <Button
                        type="submit"
                        height={40}
                        width={100}
                        onClick={() => navigate("/")}
                    >
                        Back
                    </Button>
                    <Button
                        type="submit"
                        height={40}
                        width={100}
                        onClick={handleSubmit}
                    >
                        Add Timer
                    </Button>
                </StyledButtonContainer>
            </form>
        </FormContainer>
    );
};

export default AddTimerView;
