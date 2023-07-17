export  function doLogin(data){
    localStorage.setItem("jwttoken",JSON.stringify(data));
}

export  function isLoggedIn(){
    let data = localStorage.getItem("jwttoken");
    if(data==null || data==="" || data===undefined){
        return true;
    }
    else{
        return false;
    }
}

export function currentUserDetail(){
    return JSON.parse(localStorage.getItem("jwttoken"));
}

export  function isLogOut(){
    localStorage.removeItem("jwttoken");
    console.log(localStorage.removeItem("jwttoken"))
}