import {PageRoute} from "../../../types/common";
import path from "path";

export const pages: Array<PageRoute> = [
    {
        path: "/",
        page: path.resolve(__dirname, "../../public/build/index.html")
    }
]