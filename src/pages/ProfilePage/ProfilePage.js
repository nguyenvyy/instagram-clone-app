import React, { useEffect } from 'react'
import { Button } from 'antd'
import './ProfilePage.css'
import { useDispatch } from '../../hooks/useDispatch'
import { clearAuth } from '../../store/actions'
import { useRouter } from '../../hooks/useRouter'
import { useStore } from '../../hooks/useStore'

export const ProfilePage = () => {
    const dispatch = useDispatch()
    const {auth: {user}} = useStore()
    const router = useRouter()
    const signOut = () => {
        dispatch(clearAuth())
    }
    useEffect(() => {
        if(router.pathname !== user.username) {
            router.replace(`/${user.username}`)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.pathname, user.username])
    return (
        <div className="d-flex-center" 
            style={{
                marginTop: '40vh',
            }}>
            <Button onClick={signOut}>Đăng xuất</Button> 
        </div>
    )
}
