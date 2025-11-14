export default {
    EXISTING_USER: {
        statusCode: 101,
        message: 'This user already exists'
    },
    PASSWORD_ERROR: {
        statusCode: 102,
        message: `The password must meet the following requirements:
                         - At least 1 lowercase letter
                         - At least 1 uppercase letter
                         - At least 1 number
                         - At least 1 special character (@.#$!%*?&)
                         - At least 8 characters long`
    },
    EMAIL_ERROR: {
        statusCode: 103,
        message: 'Your email address is invalid'
    },
    PASS_ERROR: {
        statusCode: 104,
        message: 'Your password  is wrong'
    },
    USER_ERROR: {
        statusCode: 105,
        message: 'Invalid User'
    },
    TOKEN_ERROR: {
        statusCode: 106,
        message: 'Token Error'
    },
    VERIFY_ERROR: {
        statusCode: 107,
        message: 'You need to verify your account.'
    },
    CODE_ERROR: {
        statusCode: 108,
        message: 'this code doesnt exist'
    },
    EXIT_ERROR: {
        statusCode: 108,
        message: 'Exit failed'
    },
}