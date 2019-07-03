import { CHANGE_THEME } from './configuration/action';

export default (previousState = 'light', { type, payload }) => {
    if (type === CHANGE_THEME) {
        return payload;
    }
    return previousState;
};
