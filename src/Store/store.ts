import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { persistStore } from "redux-persist";

const store = createStore(reducers, applyMiddleware(thunk));

const persistor = persistStore(store);

export { store, persistor };
