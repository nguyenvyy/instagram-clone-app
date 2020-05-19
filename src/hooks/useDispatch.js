import {useContext, useCallback} from 'react'
import { DataContext } from '../store/DataProvider'

export const dispatchLogger = (dispatch, onTracking = false) => action => {
    if(onTracking) {
        const {type, payload} = action
                console.log(`Action: %c${type}`, "color:green")
                console.log(`Payload: `, payload)
    }
    return dispatch(action)
}

export const useDispatch = (onTracking = false) => {
    const {dispatch} = useContext(DataContext)
    return useCallback((action) => {
        if(onTracking) {
            const {type, payload} = action
            console.log(`Action: %c${type}`, "color:green")
            console.log(`Payload: `, payload)
        }
        return dispatch(action)
    }, [dispatch, onTracking])
}

