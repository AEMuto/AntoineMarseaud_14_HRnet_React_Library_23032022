import React from "react";
import { render } from "@testing-library/react";

import Table from "./Table";

describe("Button", () => {
    test("renders the Button component", () => {
        render(<Table data={{title: "Hello world!"}} />);
    });
});