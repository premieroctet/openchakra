import { loadable } from "frontity";
/**
 * Codesplit the archive component so it's not included if the users
 * load a post directly.
 */
export default loadable(() => import("./archive"));
