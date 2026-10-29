const AUTH_COOKIE_NAME = "isAuthenticated";

function validateCredentials(login, password){
    if(!login || !password){
        return { isValid: false, message: "Логін та пароль є обов'язковими"};
    }
    if (login !== "nastia3" || password !== "nastia3") {
    return {
      isValid: false,
      message: "Невірний логін або пароль",
    };
  }
  return { isValid: true, message: "" };
}

export function login(username, password){
    const validation = validateCredentials(username, password);

    if(!validation.isValid){
        return { success: false, error: validation.message };
    }

    document.cookie = `${AUTH_COOKIE_NAME}=true; path=/; max-age=86400; SameSite=Lax`;

    return {success: true};
}

export function isAuthenticated(){
    const cookies = document.cookie.split('; ');
    return cookies.some((cookie) => cookie===`${AUTH_COOKIE_NAME}=true`);
}

export function logout() {
    document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
}