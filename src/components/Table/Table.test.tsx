import React from "react";
import { render } from "@testing-library/react";

import Table from "./Table";
import { employees } from "../../mock/employees_50";

describe("Button", () => {
    test("renders the Button component", () => {
        render(<Table data={employees} />);
    });
});