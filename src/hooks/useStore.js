import {useContext, useMemo} from 'react'
import { DataContext } from '../store/DataProvider'

export const useStore = () => {
    const {state} = useContext(DataContext)
    
    return useMemo(() => {
        return state
    }, [state])
}