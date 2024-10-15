import { useEffect, useRef, useState } from 'react';

// useRef 값이 변할 때마다 로그를 찍는 커스텀 훅
export function useLoggingRef(initialValue) {
    const ref = useRef(initialValue);
    const [, setState] = useState(0);

    const setRef = (value) => {
        ref.current = value;
        console.log('useRef 값 변경:', value);
        setState((prev) => prev + 1); // 강제로 리렌더링
    };

    return [ref, setRef];
}

function App() {
    const [myRef, setMyRef] = useLoggingRef(0);

    useEffect(() => {
        setTimeout(() => {
            setMyRef(1);
        }, 1000);
    }, [setMyRef]);

    return <div>현재 useRef 값: {myRef.current}</div>;
}
