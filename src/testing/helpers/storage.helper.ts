export const mockSessionStorage = (storage: {[key: string]: string}) => {
    const sessionStorageFunctions = {
        getItem: jest.fn(key => storage[key]),
        setItem: jest.fn(key => null),
    };

    Object.defineProperty(window, 'sessionStorage', {
        value: sessionStorageFunctions,
        writable: true
    })
}
