// React의 useState와 useEffect를 가져옵니다.
import { useState, useEffect } from 'react'; 

// 디바운스 훅을 정의합니다.
const useDebounce = (value, delay) => {
    // 디바운스된 값을 저장할 상태 변수
    const [debouncedValue, setDebouncedValue] = useState(value); 

    // value 또는 delay가 변경될 때마다 실행되는 useEffect
    useEffect(() => {
        // 타이머를 설정하여 지정된 지연 후 상태를 업데이트합니다.
        const handler = setTimeout(() => {
            setDebouncedValue(value); // 지연 후 상태 업데이트
        }, delay);

        // 컴포넌트가 언마운트될 때 타이머를 정리합니다.
        return () => {
            clearTimeout(handler); 
        };
    }, [value, delay]); // value나 delay가 변경될 때마다 실행

    return debouncedValue; // 디바운스된 값을 반환
};

// 훅을 내보냅니다.
export default useDebounce; 