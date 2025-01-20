export const getUserInfo=()=>{
    const {name,email,uid,picture,isAuth}=JSON.parse(localStorage.getItem('userInfo'));
    return {name,email,uid,picture,isAuth};
}