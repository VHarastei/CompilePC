import { DEFAULT_REGION } from './constants';
import app from './firebaseApp';

const functions = app.functions(DEFAULT_REGION);
functions.useEmulator('localhost', 5001);

export default functions;
