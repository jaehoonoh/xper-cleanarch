export interface SignupRequest {
    username: string;
    password: string;
}

export interface BaseResponse {
    message: string;
}

export interface SignupResponse extends BaseResponse {

}
