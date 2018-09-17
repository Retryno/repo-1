import mainRequestService from './request.service'
export const getMyActions = email => {
  const url = `http://localhost:8081/user-actions/${email}`
  const options = {
    method: 'GET'
  }
  return mainRequestService(url, options)
}
export const authorization = body => {
  const url = 'http://localhost:8081/authorization'
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }
  return mainRequestService(url, options)
}
export const getAllMessages = body => {
  const url = 'http://localhost:8081/get-all-messages'
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }
  return mainRequestService(url, options)
}

export default {
  authorization,
  getMyActions,
  getAllMessages
}
