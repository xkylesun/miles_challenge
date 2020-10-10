import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import configureStore from "./store/store";

import {
  getByLabelText,
  getByText,
  getByTestId,
  queryByTestId,
  // Tip: all queries are also exposed on an object
  // called "queries" which you could import here as well
  waitFor,
  screen
} from '@testing-library/dom'
import { fireEvent, within } from '@testing-library/dom/dist/@testing-library/dom.umd.js'

const createBubbledEvent = (type, props = {}) => {
  const event = new Event(type, { bubbles: true });
  Object.assign(event, props);
  return event;
};

let start = {
  arrange: {
    C1: [],
    C2: [],
    C3: [],
    C4: [],
    C5: [],
  },
  undo: null,
  redo: null
}
let store = configureStore(start);

// test section

test('properly display startup page', () => {
  const { getByText } = render(<App store={store}/>);
  const linkElement = getByText(/Miles Front-end Challenge/i);
  expect(linkElement).toBeInTheDocument();
});

test ("can add reward", () => {
  const { container } = render(<App store={store} />);

  let start = container.querySelector(".select_R1");
  let end = container.querySelector("#C2");

  start.dispatchEvent(
      createBubbledEvent("dragstart", {})
    );
  end.dispatchEvent(
    createBubbledEvent("drop", {})
  );

  let res = container.querySelector("#C2").childElementCount;
  expect(res).toEqual(1);
});


test("can move reward", () => {
  const { container } = render(<App store={store} />);

  let start = container.querySelector("#C2").childNodes[0];
  let end = container.querySelector("#C4");

  start.dispatchEvent(
    createBubbledEvent("dragstart", {})
  );
  end.dispatchEvent(
    createBubbledEvent("drop", {})
  );

  let res = container.querySelector("#C4").childElementCount;
  expect(res).toEqual(1);
});

test("can remove reward", () => {
  const { container } = render(<App store={store} />);
  let target = container.querySelector(".reward_button")
  fireEvent(
    target,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  )
  let res = container.querySelector("#C4").childElementCount;
  expect(res).toEqual(0);
});

test("can undo last move", () => {
  const { container } = render(<App store={store} />);
  fireEvent(
    getByText(container, 'Undo'),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  )
  let res = container.querySelector("#C4").childElementCount;
  expect(res).toEqual(1);
});

test("can redo the undone op", () => {
  const { container } = render(<App store={store} />);
  fireEvent(
    getByText(container, 'Redo'),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  )
  let res = container.querySelector("#C4").childElementCount;
  expect(res).toEqual(0);
})
