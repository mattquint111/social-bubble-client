import {onGetLoggedUser} from '../framework/actions'

export const getLoggedInUser = (dispatch) => async(
    user
) => {
    console.log(user)
    const response = await fetch(`http://localhost:8080/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(user),
    })

    let userResponse = await response.json()

    return dispatch(onGetLoggedUser(userResponse))

    }
export default getLoggedInUser