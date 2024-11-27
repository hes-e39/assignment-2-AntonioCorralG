import { createContext, useContext, useState } from 'react';
import type { Timer, TimerContextType } from "../types/types";

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider = ({ children }: { children: any }) => {
    const [timers, setTimers] = useState<Timer[]>([]);
    const [currentTimerIndex, setCurrentTimerIndex] = useState(0);
    const [isWorkoutRunning, setIsWorkoutRunning] = useState(false);

    const addTimer = (timer: Timer) => {
        setTimers(prevTimers => [...prevTimers, timer]);
    };

    const removeTimer = (id: string) => {
        const updatedTimers = timers.filter(timer => timer.id !== id);
        setTimers(updatedTimers);
        if (currentTimerIndex >= updatedTimers.length) {
            setCurrentTimerIndex(Math.max(0, currentTimerIndex - 1));
        }
    };
    const startWorkout = () => {
        setIsWorkoutRunning(true);
        if (timers.length > 0) {
            setTimers(prevTimers => prevTimers.map((timer, index) =>
                (index === currentTimerIndex ? { ...timer, state: 'running' } : timer)
            ));
        }
    };

    const pauseWorkout = () => {
        setIsWorkoutRunning(false);
        setTimers(prevTimers => prevTimers.map(timer => (timer.state === 'running' ? { ...timer, state: 'notRunning' } : timer)));
    };

    const resetWorkout = () => {
        setCurrentTimerIndex(0);
        setIsWorkoutRunning(false);
        setTimers(prevTimers =>
            prevTimers.map(timer => ({
                ...timer,
                state: 'notRunning',
                timeLeft: timer.type === 'stopwatch' ? 0 : timer.config.initialTime || 0,
                currentRound: timer.type === 'xy' ? timer.config.numberOfRounds : undefined
            }))
        );
    };


    const fastForward = () => {
        nextTimer();
    };

    const updateTimerState = (id: string, state: 'running' | 'notRunning' | 'completed') => {
        setTimers(prevTimers => prevTimers.map(timer => (timer.id === id ? { ...timer, state } : timer)));
    };

    const updateTimerTimeLeft = (id: string, timeLeft: number) => {
        setTimers(prevTimers => prevTimers.map(timer => (timer.id === id ? { ...timer, timeLeft } : timer)));
    };

    const nextTimer = () => {
        const nextIndex = currentTimerIndex + 1;
        if (nextIndex < timers.length) {
            setCurrentTimerIndex(nextIndex);
            setIsWorkoutRunning(true);
            setTimers(prevTimers => prevTimers.map((timer, index) => (index === nextIndex ? { ...timer, state: 'running' } : timer)));
        } else {
            setCurrentTimerIndex(0);
            setIsWorkoutRunning(false);
        }
    };

    return (
        <TimerContext.Provider
            value={{ timers, currentTimerIndex, isWorkoutRunning, addTimer, removeTimer, startWorkout, pauseWorkout, resetWorkout, fastForward, updateTimerState, updateTimerTimeLeft, nextTimer }}
        >
            {children}
        </TimerContext.Provider>
    );
};

export const useTimers = () => {
    const context = useContext(TimerContext);
    if (context === undefined) {
        throw new Error('useTimers must be used within a TimerProvider');
    }
    return context;
};
