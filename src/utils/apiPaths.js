
export const  BASE_URL= 'http://localhost:3000'
export const API_PATHS = {
    AUTH: {
        SIGN_UP: '/api/auth/register',
        SIGN_IN: '/api/auth/login',
        SIGN_OUT: '/api/auth/signout',
        PROFILE: '/api/auth/profile',
        verifyOtp:'/api/auth/verify',
        verifyResetOtp:'/api/auth/verify-reset-otp',
        resetOtp:'/api/auth/reset-otp',
        resetPassword:'/api/auth/reset-password'
    },
    USER: {
        GET_USER_BY_ID:(userId) => `/api/auth/user/${userId}`,
        updateUser: '/api/auth/updateuser',
        deleteUser: '/api/auth/deleteuser',
        getUsers: '/api/auth/getusers',
        
    },
    IMAGE:{
        GENERATE_IMAGE:'/api/image/generate-image'
    }
    
};
