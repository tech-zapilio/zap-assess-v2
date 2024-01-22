import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import assessment_app_reducers from "./assessment-app-reducers";

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["app", "assessment_app"],
};

const rootReducers = combineReducers({
  assessment_app: assessment_app_reducers,
});

export default persistReducer(persistConfig, rootReducers);

export type RootState = ReturnType<typeof rootReducers>;
