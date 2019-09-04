const initialState = {
    userName: localStorage.getItem('userName') || '',
    password: '',
    isFetching: false,
    status: localStorage.getItem('login') || false, // 登录状态
}

export const types = {
    LOGIN_REQUEST: 'LOGIN/LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN/LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN/LOGIN_FAILURE',
    LOGOUT: 'LOGIN/LOGOUT',
    SET_USERNAME: 'LOGIN/SET_USERNAME',
    SET_PASSWORD: 'LOGIN/SET_PASSWORD'
}


export const actions = {
    // 异步action，执行登录
    login: () => {
        return (dispatch, getState) => {
            const {userName, password} = getState().ui.login
            if (!(userName && userName.length > 0 && password && password.length > 0)) {
                return dispatch(loginFailure('用户名和密码不能为空'))
            }
            dispatch(loginRequest())
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    dispatch(loginSuccess())
                    localStorage.setItem('userName', userName)
                    localStorage.setItem('login', true)
                    resolve()
                }, 1000)
            })
        }
    },
    logout: () => {
        localStorage.removeItem('userName')
        localStorage.removeItem('login')
        return {
            type: types.LOGOUT
        }
    },
    setUserName: (userName) => ({
        type: types.SET_USERNAME,
        userName
    }),
    setPassword: (password) => ({
        type: types.SET_PASSWORD,
        password
    })
}

const loginFailure = (error) => ({
    type: types.LOGIN_FAILURE,
    error
})
const loginRequest = () => ({
    type: types.LOGIN_REQUEST
})
const loginSuccess = () => ({
    type: types.LOGIN_SUCCESS
})


// reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_REQUEST:
            return {...state, isFetching: true}
        case types.LOGIN_SUCCESS:
            return {...state, isFetching: false, status: true}
        case types.LOGIN_FAILURE:
            return {...state, isFetching: false}
        case types.LOGOUT:
            return {...state, status: false, userName: '', password: ''}
        case types.SET_USERNAME:
            return {...state, userName: action.userName}
        case types.SET_PASSWORD:
            return {...state, password: action.password}
        default:
            return state
    }
}
export default reducer

// selectors

export const getUserName = (state) => state.ui.login.userName
export const getPassword = (state) => state.ui.login.password

export const isLogin = (state) => state.ui.login.status
