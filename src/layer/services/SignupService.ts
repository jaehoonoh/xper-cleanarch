import {ResponseMessage, SignupParams} from "../domain/SignUp";


export class SignupService {

    public create(data: SignupParams): ResponseMessage {

        let responseMessage: ResponseMessage = {} as ResponseMessage;
        // TODO : 사용자 이름, 암호 유효성 검사 - 길이 체크만
        if (data.username.length < 3 || data.username.length > 20) {
            responseMessage.message = "사용자 이름이 잘못 되었습니다."
            return responseMessage;
        }
        if (data.password.length < 3 || data.password.length > 20) {
            responseMessage.message = "사용자 비밀번호가 잘못 되었습니다."
            return responseMessage;
        }

        // TODO : 사용자 이름 - DB
        if (data.username == "user") {
            responseMessage.message = "이미 등록된 사용자입니다."
            return responseMessage;
        }

        // // TODO : 사용자 암호 - DB
        // if (data.password != "password") {
        //     responseMessage.message = "암호가 일치하지 않습니다."
        //     return responseMessage;
        // }

        responseMessage.message = "가입 성공하셨습니다."
        return responseMessage;
    }

}

// 함수형
// const SignupService = () => {

//     return (
//         create: (data: SignupParams): ResponseMessage => {

//         }
//     )
// }

// export default SignupService;
