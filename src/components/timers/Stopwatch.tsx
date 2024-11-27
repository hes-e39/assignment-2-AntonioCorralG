import { useEffect, useRef } from "react";
import { useTimers } from "../../context/TimerContext";
import Button from "../generic/Button";
import { StyledButtonContainer, TimerDisplay, TimerContainer } from "../generic/ContainerDisplays";
import { formatTime } from "../../utils/helpers";

const Stopwatch = ({ id }: { id: string }) => {
  const { timers, updateTimerTimeLeft, updateTimerState, nextTimer, removeTimer } = useTimers();
  const timer = timers.find((t) => t.id === id);

  if (!timer) return null;

  const isRunning = timer.state === "running";
  const timeLeft = timer.timeLeft;
  const { hours = 0, minutes = 0, seconds = 0 } = timer.config;
  const targetTime = (hours * 3600 + minutes * 60 + seconds) * 1000;

  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft < targetTime) {
      intervalRef.current = setInterval(() => {
        updateTimerTimeLeft(id, timeLeft + 10);
      }, 10);
    } else if (isRunning && timeLeft >= targetTime) {
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
  }, [isRunning, timeLeft, targetTime]);

  return (
    <TimerContainer>
      <TimerDisplay>{formatTime(timeLeft)}</TimerDisplay>
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

export default Stopwatch;
