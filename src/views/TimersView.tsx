import { useTimers } from "../context/TimerContext";
import Stopwatch from "../components/timers/Stopwatch";
import Countdown from "../components/timers/Countdown";
import XY from "../components/timers/XY";
import Tabata from "../components/timers/Tabata";
import type { Timer } from "../types/types";
import { TimerContainer } from '../components/generic/ContainerDisplays';
import Button from '../components/generic/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { TimerStyle } from "../components/generic/FormStyling";
import { ButtonContainer } from '../components/generic/ContainerDisplays'

const TimersView = () => {
  const {
    timers,
    currentTimerIndex,
    isWorkoutRunning,
    startWorkout,
    pauseWorkout,
    resetWorkout,
    fastForward,
  } = useTimers();

  const renderTimer = (timer: Timer) => {
    switch (timer.type) {
      case "stopwatch":
        return <Stopwatch id={timer.id} />;
      case "countdown":
        return <Countdown id={timer.id} />;
      case "xy":
        return <XY id={timer.id} />;
      case "tabata":
        return <Tabata id={timer.id} />;
      default:
        return null;
    }
  };

  return (
    <>
      <h2>Timers</h2>
      <ButtonContainer>
        <Button type={isWorkoutRunning ? "pause" : "start"}
          height={75}
          width={200}
          onClick={isWorkoutRunning ? pauseWorkout : startWorkout}>
          <FontAwesomeIcon
            icon={isWorkoutRunning ? faPause : faPlay}
            size="3x"
            color={isWorkoutRunning ? "#3E535C" : "#b8bebf"}
          />          </Button>
        <Button type="reset"
          height={60}
          width={70} onClick={resetWorkout}>Reset</Button>
        <Button
          height={60}
          type="submit"
          width={70}
          onClick={fastForward}>Fast Forward</Button>
        <Button
          height={60}
          type="submit"
          width={70}
          onClick={() => location.href = '/#/add'}>Add Timer</Button>
      </ButtonContainer>
      <TimerContainer>
        {timers.map((timer, index) => (
          <TimerStyle key={`timer-${timer.id}`} style={{ opacity: index === currentTimerIndex ? 1 : 0.5 }}>
            <div>{timer.type}</div>
            {renderTimer(timer)}
          </TimerStyle>
        ))}
      </TimerContainer>

    </>
  );
};

export default TimersView;
