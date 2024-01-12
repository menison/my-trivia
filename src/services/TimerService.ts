interface TimerService {
  timerId: NodeJS.Timeout | null;
  timeLeft: number;
  startTimer: (callback: () => void) => void;
  pauseTimer: () => void;
  resetTimer: () => void;
}

export const createTimerService = (initialTime: number): TimerService => {
  let timerId: NodeJS.Timeout | null = null;
  let timeLeft = initialTime;

  const startTimer = (callback: () => void) => {
    timerId = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
      } else {
        clearInterval(timerId!);
        callback();
      }
    }, 1000);
  };

  const pauseTimer = () => {
    if (timerId) {
      clearInterval(timerId);
    }
  };

  const resetTimer = () => {
    clearInterval(timerId!);
    timeLeft = initialTime; // Reset to the initial value
  };

  return {
    timerId,
    timeLeft,
    startTimer,
    pauseTimer,
    resetTimer,
  };
};
