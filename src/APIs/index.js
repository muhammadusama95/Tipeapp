import { API_URL } from '../constants/Urls'

export const getUserById = async (userId) => {
  console.log('inside getUserById', API_URL)
  return fetch(`${API_URL}/user-by-id/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.data
    })
    .catch((error) => {
      console.log(error)
    })
}

export const userReturnedFalse = async (userId) => {
  fetch(`${API_URL}/user-returned-false`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userId)
  })
    .then((response) => response.json())
    .then((responseJson) => {})
    .catch((error) => {})
}

export const unverifyUser = async (userId) => {
  fetch(`${API_URL}/unverify-user/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: ''
  })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('responseJson', responseJson)
      return responseJson.data
    })
    .catch((error) => {})
}

export const updateUser = async (userId, updateData) => {
  console.log('in updateUser')
  console.log('userId', userId)
  console.log('updateData', updateData)
  fetch(`${API_URL}/update-user/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateData)
  })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('responseJson', responseJson)
      return responseJson.data
    })
    .catch((error) => {})
}

export const setUser = async (userId, setData) => {
  fetch(`${API_URL}/set-user/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    // body: {
    //   data: setData,
    //   userId: userId
    // }
    body: JSON.stringify(setData)
  })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('responseJson', responseJson)
      return responseJson.data
    })
    .catch((error) => {})
}

export const deleteUser = async (userId) => {
  fetch(`${API_URL}/delete-user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userId)
  })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('responseJson', responseJson)
      return responseJson.data
    })
    .catch((error) => {})
}

export const getAllWaiters = async (userId) => {
  return fetch(`${API_URL}/waiters/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.data
    })
    .catch((error) => {})
}

export const handlePaymentHistory = async (userId) => {
  console.log("handlePaymentHistory")
  return fetch(`${API_URL}/handle-payment-history/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: ''
  })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log("responseJson",responseJson)
      return responseJson.data
    })
    .catch((error) => {})
}

export const updateUserTransaction = async (wuid, userId, updateData) => {
  fetch(`${API_URL}/update-user-transaction/${wuid}/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: updateData
  })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('responseJson', responseJson)
      return responseJson.data
    })
    .catch((error) => {})
}

export const getUserByStripeId = async (stripe_id) => {
  return fetch(`${API_URL}/user-by-stripeId/${stripe_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.data
    })
    .catch((error) => {})
}

export const addUserTransaction = async (userId, updateData) => {
  fetch(`${API_URL}/add-user-transaction`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      data: updateData,
      userId: userId
    }
  })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('responseJson', responseJson)
      return responseJson.data
    })
    .catch((error) => {})
}
