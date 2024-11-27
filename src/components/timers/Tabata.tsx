import { useEffect, useRef, useState } from "react";
import { useTimers } from "../../context/TimerContext";

import Button from "../generic/Button";
import {
  StyledButtonContainer,
  TimerDisplay,
  TimerContainer,
  DisplayRounds
} from "../generic/ContainerDisplays";

import { formatTime } from "../../utils/helpers";

const Tabata = ({ id }: { id: string }) => {
  const { timers, updateTimerTimeLeft, updateTimerState, nextTimer, removeTimer } = useTimers();
  const timer = timers.find((t) => t.id === id);

  if (!timer) return null;

  const { workTime = 0, restTime = 0, numberOfRounds = 1, isWorkPhase = true } = timer.config;
  const initialWorkTime = workTime * 1000;
  const initialRestTime = restTime * 1000;
  const [roundsLeft, setRoundsLeft] = useState<number>(numberOfRounds);
  const [phase, setPhase] = useState<boolean>(isWorkPhase); // true for work, false for rest
  const isRunning = timer.state === "running";
  const timeLeft = timer.timeLeft;

  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        updateTimerTimeLeft(id, timeLeft - 10);
      }, 10);
    } else if (isRunning && timeLeft <= 0 && roundsLeft > 1) {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current as number);
      } if (phase) {
        setPhase(false);
        updateTimerTimeLeft(id, initialRestTime);
      } else {
        setRoundsLeft((prevRounds) => prevRounds - 1);
        setPhase(true);
        updateTimerTimeLeft(id, initialWorkTime);
      }
      updateTimerState(id, "running");
    } else if (isRunning && timeLeft <= 0 && roundsLeft <= 1) {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current as number);
      } updateTimerState(id, "completed");
      nextTimer();
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current as number);
      }
    };
  }, [isRunning, timeLeft, roundsLeft, phase]);

  return (
    <TimerContainer>
      <TimerDisplay>{formatTime(timeLeft)}</TimerDisplay>
      <div>{phase ? "Work" : "Rest"}</div>
      <DisplayRounds>Rounds Remaining: {roundsLeft}</DisplayRounds>
      <StyledButtonContainer>
        <Button
          type="remove"
          height={60}
          width={70}
          onClick={() => removeTimer(id)}
        >
          Remove
        </Button>
      </StyledButtonContainer>
    </TimerContainer>
  );
};

export default Tabata;
