export interface Timer {
    id: string;
    type: 'stopwatch' | 'countdown' | 'xy' | 'tabata';
    config: any;
    state: 'running' | 'notRunning' | 'completed';
    timeLeft: number;
    currentRound?: number;
}

export interface TimerContextType {
    timers: Timer[];
    currentTimerIndex: number;
    isWorkoutRunning: boolean;
    addTimer: (timer: Timer) => void;
    removeTimer: (id: string) => void;
    startWorkout: () => void;
    pauseWorkout: () => void;
    resetWorkout: () => void;
    fastForward: () => void;
    updateTimerState: (id: string, state: 'running' | 'notRunning' | 'completed') => void;
    updateTimerTimeLeft: (id: string, timeLeft: number) => void;
    nextTimer: () => void;
}
