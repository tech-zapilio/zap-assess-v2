import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../Store/reducers";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
