const headers = new Headers({
    "Accept": "application/json",
    "Content-Type": "application/json"
})
function get(url) {
    return fetch(url, {
        method: 'GET',
        headers: headers
    }).then(response => {
        return handleResponse(url, response)
    }).catch(err => {
        console.error(`request failed. url = ${url}. msg= ${err}`)
        return Promise.reject({error: {msg: 'request failed'}})
    })
}

function post(url, data) {
    return fetch(url, {
        method: 'POST',
        body: data,
        headers: headers
    }).then(response => {
        return handleResponse(url, response)
    }).catch(err => {
        console.error(`request failed. url = ${url}. msg= ${err}`)
        return Promise.reject({error: {msg: 'request failed'}})
    })
}

function handleResponse(url, res) {
    if (res.status === 200) {
        console.log(res)
        // res.json().then(function (jsonObject) {
        //     console.log(jsonObject)
        //     return jsonObject
        // })
        return res.json()
    } else {
        console.error(`request failed. url = ${url}`)
        return Promise.reject({error: {msg: 'request failed due to server error'}})
    }
}

export {get, post}
