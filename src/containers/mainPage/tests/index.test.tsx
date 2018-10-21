import React from "react";
import { shallow } from "enzyme";

import {MainPage} from "../index";

describe("MainPage", () => {
    it("renders", () => {
        const props: any = {}
        const wrapper = shallow(<MainPage {...props}/>);
        expect(wrapper.text()).toBe("Welcome!");
    })
})