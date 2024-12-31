import { useState, useEffect, useRef } from 'react';

export function useCountdown(initialTime: number) {
    // 使用 useState Hook 来创建一个时间和一个更新时间的函数
    const [time, setTime] = useState(initialTime);

    // 使用 useState Hook 来创建一个状态和一个更新状态的函数
    const [isRunning, setIsRunning] = useState(false);

    const timerRef = useRef<number>();

    // 使用 useEffect Hook 来实现倒计时的逻辑
    useEffect(() => {
        // 如果状态为运行并且时间大于零
        if (isRunning && time > 0) {
            // 设置一个定时器，每隔一秒更新一次时间
            timerRef.current = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
            // 返回一个清理函数，用于取消定时器
            return () => {
                clearTimeout(timerRef.current);
            };
        }
        // 如果状态为停止或者时间等于零
        else {
            // 设置状态为停止
            setIsRunning(false);
        }
    }, [isRunning, time]); // 依赖于状态和时间

    // 定义一个开始倒计时的函数
    function start() {
        setIsRunning(true);
    }

    // 定义一个暂停倒计时的函数
    function pause() {
        setIsRunning(false);
    }

    // 定义一个重置倒计时的函数
    function reset() {
        setTime(initialTime);
        setIsRunning(false);
    }

    function clear() {
        clearTimeout(timerRef.current);
    }

    // 返回时间和控制函数
    return { time, start, pause, reset, clear };
}
