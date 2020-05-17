
export const setSStorage = (key, value) => {
    let store = {value}
        store = JSON.stringify(store)
    sessionStorage.setItem(key, store)
}

export const getSStorage = key => {
    let store = sessionStorage.getItem(key)
    store = JSON.parse(store)
    return store.value
}

export const removeSStorage = key => sessionStorage.removeItem(key)