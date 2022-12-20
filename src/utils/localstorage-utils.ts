export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('asteroids');
        return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (err) {

    }
};

export const saveState = (state: any) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('asteroids', serializedState);
    } catch {

    }
};