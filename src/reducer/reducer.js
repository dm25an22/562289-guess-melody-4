import {combineReducers} from "redux";
import {reducer as data} from "./data/data";
import {reducer as game} from "./game/game";
import NameSpace from "./name-space";

export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.GAME]: game,
});
