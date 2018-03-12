import React from "react";
import { shallow, mount } from "enzyme";
import BookShelfChanger from "../BookShelfChanger";
import { wrap } from "module";

describe("<BookShelfChanger />", () => {
  const changeShelf = jest.fn();

  it("Renderizou corretamente", () => {
    expect(shallow(<BookShelfChanger changeShelf={changeShelf} />));
  });
  it("Montou corretamente", () => {
    expect(mount(<BookShelfChanger changeShelf={changeShelf} />));
  });

  it("Ao alterar chamar a função onChange", () => {
    const value = "read";
    const wrapper = mount(<BookShelfChanger changeShelf={changeShelf} />);
    wrapper
      .find("select")
      .simulate('change', { target: { value } });
    console.log(wrapper)  

    expect(changeShelf).toHaveBeenCalledTimes(1);
  });

  it("Verificar valor padrão", () => {
      let wrapperNone = mount(<BookShelfChanger changeShelf={changeShelf} />)
      expect(wrapperNone.props().shelf).toBe("none")
      let wrapperShelf = mount(<BookShelfChanger changeShelf={changeShelf} shelf={"read"}/>)
      expect(wrapperShelf.props().shelf).toBe("read")
  })
});
