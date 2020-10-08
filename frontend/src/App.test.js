import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { screen } from '@testing-library/dom'

test('properly display startup page', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Miles Challenge/i);
  expect(linkElement).toBeInTheDocument();
});


// test ("can add reward", () => {
//   const { getByText } = render(<App />);
// });


// test("can add reward", () => {

// });


// test('uses jest-dom', () => {
//   document.body.innerHTML = `
//     <span data-testid="not-empty"><span data-testid="empty"></span></span>
//     <div data-testid="visible">Visible Example</div>
//   `

//   expect(screen.queryByTestId('not-empty')).not.toBeEmptyDOMElement()
//   expect(screen.getByText('Visible Example')).toBeVisible()
// })