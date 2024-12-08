import { useEffect, useRef, useState } from "react";
import { useTimers } from "../../context/TimerContext";

import Button from "../generic/Button";
import { StyledButtonContainer, TimerDisplay, TimerContainer } from "../generic/ContainerDisplays";
import { formatTime } from "../../utils/helpers";

const XY = ({ id }: { id: string }) => {
  const { timers, updateTimerTimeLeft, updateTimerState, nextTimer, removeTimer } = useTimers();
  const timer = timers.find((t) => t.id === id);

  if (!timer) return null;

  const { minutes = 0, seconds = 0, numberOfRounds } = timer.config;
  const isRunning = timer.state === "running";

  const initialTime = (minutes * 60 + seconds) * 1000;
  const [roundsLeft, setRoundsLeft] = useState<number>(numberOfRounds);
  const timeLeft = timer.timeLeft === undefined ? initialTime : timer.timeLeft; // Default to initialTime if undefined

  const intervalRef = useRef<number | null>(null);

  useEffect(() => {

    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        updateTimerTimeLeft(id, timeLeft - 10);
      }, 10);
    } else if (isRunning && timeLeft <= 0 && roundsLeft > 1) {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current as number);
      } setRoundsLeft((prevRounds) => prevRounds - 1);
      updateTimerTimeLeft(id, initialTime);
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
  }, [isRunning, timeLeft, roundsLeft]);


  return (
    <TimerContainer>
      <TimerDisplay>{formatTime(timeLeft)}</TimerDisplay>
      <div>Rounds Remaining: {roundsLeft}</div>
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

export default XY;
