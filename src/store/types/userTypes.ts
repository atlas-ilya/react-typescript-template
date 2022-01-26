export interface IUser {
    id: number,
    login: string,
    createdAt: string,
}

export interface IUserState {
    user: IUser | null,
    error: string | undefined,
    loading: boolean
}


export enum UserActionTypes {
    LOAD_USER = "LOAD_USER",
    UPDATE_USER = "UPDATE_USER",
    LOGOUT_USER = "LOGOUT_USER",

    LOAD_USER_FAIL = "LOAD_USER_FAIL",
    UPDATE_USER_FAIL = "UPDATE_USER_FAIL",
    LOGOUT_USER_FAIL = "LOGOUT_USER_FAIL",

    LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS",
    UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS",
    LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS",
}


/////////////////////Actions/////////////////////////

interface ILoadUser {
    type: UserActionTypes.LOAD_USER;
}

interface IUpdateUser {
    type: UserActionTypes.UPDATE_USER;
}

interface ILogoutUser {
    type: UserActionTypes.LOGOUT_USER;
}

/////////////////////Fail/////////////////////////

interface ILoadUserFail {
    type: UserActionTypes.LOAD_USER_FAIL;
    error: string;
}

interface IUpdateUserFail {
    type: UserActionTypes.UPDATE_USER_FAIL;
    error: string;
}


interface ILogoutUserFail {
    type: UserActionTypes.LOGOUT_USER_FAIL;
    error: string;
}

/////////////////////Success/////////////////////////

interface ILoadUserSuccess {
    type: UserActionTypes.LOAD_USER_SUCCESS;
    user: IUser;
}

interface IUpdateUserSuccess {
    type: UserActionTypes.UPDATE_USER_SUCCESS;
    user: IUser | null;
}

interface ILogoutUserSuccess {
    type: UserActionTypes.LOGOUT_USER_SUCCESS;
}


export type userAction =
    ILoadUser | IUpdateUser | ILogoutUser |
    ILoadUserFail | IUpdateUserFail | ILogoutUserFail |
    ILoadUserSuccess | IUpdateUserSuccess | ILogoutUserSuccess
