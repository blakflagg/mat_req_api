import {
  UniqueConstraintError,
  InvalidPropertyError,
  RequiredParameterError
} from '../../helpers/errors';
import makeHttpError from '../../helpers/http-error';
import generateJWT from '../../helpers/jwtTokenGenerator';


export default function makeUsersEndpointHandler({ userDAL }) {
  return async function handle(httpRequest) {
    switch (httpRequest.method) {
      case 'POST':
        return postPathRouter(httpRequest);
      case 'GET':
        return getUser(httpRequest)

      default:
        return makeHttpError({
          statusCode: 405,
          errorMessage: `${httpRequest.method} method not allowed.`
        })
    }
  }

  async function getUser(httpRequest) {
    const { payload: { id } } = httpRequest;
    const { email } = httpRequest.body || {}
    const result = await userDAL.findByEmail(email);
    const retVal = Object.freeze({
      name: result.name,
      id: id
    });

    return {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 200,
      data: JSON.stringify(retVal)
    }
  }

  async function registerUser(httpRequest) {
    //function stub not ready production - DD 10.18.19
    const { user: { email, password } } = httpRequest.body || {}
    let retVal = {};
    if (!email || !password) {
      return makeHttpError({
        statusCode: 422,
        errorMessage: 'missing password or email'
      })
    }

  }

  async function loginUser(httpRequest) {
    const { user: { email, password } } = httpRequest.body || {}
    let retVal = {};
    if (!email || !password) {
      return makeHttpError({
        statusCode: 422,
        errorMessage: 'missing password or email'
      })
    }

    try {
      const user = await userDAL.authByEmail(email);
      const authenticated = user.validatePassword(password);
      if (authenticated) {
        const retVal = Object.freeze({
          Token: generateJWT(user.id),
        });

        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
          data: JSON.stringify(retVal)
        }
      }
      return makeHttpError({
        statusCode: 401,
        errorMessage: "Unauthorized User"
      })

    } catch (err) {
      return makeHttpError({
        statusCode: 500,
        errorMessage: err.message
      })
    }
  }

  async function resetPassword(httpRequest) {
    const { email, newPassword } = httpRequest.body
    let retVal = {};
    try {
      const isReset = await userDAL.resetPassword({ email, newPassword })
      if (isReset) {
        const user = await userDAL.authByEmail(email);
        const authenticated = user.validatePassword(newPassword);
        if (authenticated) {
          retVal = Object.freeze({
            Message: "Password Reset Successful",
            Token: generateJWT(user.id)
          });
        } else {
          retVal = Object.freeze({
            Message: "Password Reset Not Successful"
          });
        }
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
          data: JSON.stringify(retVal)
        }
      }
    } catch (err) {
      return makeHttpError({
        statusCode: 500,
        errorMessage: err.message
      })
    }
  }

  function postPathRouter(httpRequest) {
    switch (httpRequest.path) {
      case '/login':
        return loginUser(httpRequest);
      case '/resetpassword':
        return resetPassword(httpRequest)
    }
  }
}