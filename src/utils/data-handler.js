'use-strict'
export const fallbackConfig = {
  language: 'javascript',
  width: "600",
  height: "400",
  theme: "vs-dark",
  code: 'console.log("Hello, World!"); \n // Begin Typing your code here...',
  options: null,
}

export const isObjectEmpty = (o) => {
    return Object.entries(0).length === 0
}

/**
 * window method so that we can call the method from anywhere whithin grape. 
 * @param {key} string
 * @param {config} object
 */
window.Editor_dispatchDataEventToLocalStorage = (key, config) => {
  const date = new Date()
  const keyToStore = typeof key === 'string' ? key : date.getTime()
  const configToStore =
    typeof config === 'object' &&
    !(Object.entries(config).length === 0)
      ? config
      : fallbackConfig
  localStorage.setItem(keyToStore, configToStore)
  return { keyToStore, configToStore }
}

/**
 * @param {key} string
 * @returns {object}
 */
window.Editor_getDataFromLocalStorage = (key) => {
const keyToSearch = typeof key === 'string'? key: null
return localStorage.getItem(keyToSearch);
}

// Called to ensure that the user can call methods on the window object or on the document object
document.Editor_dispatchDataEventToLocalStorage = window.Editor_dispatchDataEventToLocalStorage
document.Editor_getDataFromLocalStorage  = window.Editor_getDataFromLocalStorage
