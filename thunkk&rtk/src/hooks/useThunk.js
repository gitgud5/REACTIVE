import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";





export function useThunk(thunk) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();


    // useCallBack is a react hook, to remember the function and whatnot, it is da sibling of
    // useMemo
    const runThunk = useCallback((arg) => {
        setIsLoading(true);
        dispatch(thunk(arg))
            .unwrap()
            .catch(err => setError(err))
            .finally(() => setIsLoading(false));
    }, [dispatch, thunk])


    return [runThunk, isLoading, error]
};