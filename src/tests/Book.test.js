import React from "react";
import { shallow, mount } from "enzyme";
import Book from "../Book";
import { wrap } from "module";

describe("<Book />", () => {
  it("Renderizou corretamente", () => {
    expect(shallow(<Book changeShelf={changeShelf} />));
  });
  it("Montou corretamente", () => {
    expect(mount(<Book changeShelf={changeShelf} />));
  });

});
