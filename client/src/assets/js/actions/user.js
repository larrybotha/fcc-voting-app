export const LOGIN_REQUEST = '@user/loginRequest';
export const login = ({email, password}) => ({
  type: LOGIN_REQUEST,
  email,
  password,
});

export const LOGIN_SUCCESS = '@user/loginSuccess';
export const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  user,
});

export const LOGIN_FAILURE = '@user/loginFailure';
export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  error,
});

export const CREATE_USER_REQUEST = '@user/createUserRequest';
export const createUser = ({email, password}) => {
  console.log('here');

  return {
    type: CREATE_USER_REQUEST,
    email,
    password,
  };
};

export const CREATE_USER_SUCCESS = '@user/createUserSuccess';
export const createUserSuccess = user => ({
  type: CREATE_USER_SUCCESS,
  user,
});

export const CREATE_USER_FAILURE = '@user/createUserFailure';
export const createUserFailure = error => ({
  type: CREATE_USER_FAILURE,
  error,
});
