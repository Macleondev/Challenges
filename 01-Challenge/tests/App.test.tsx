import React from "react";
import userEvent from '@testing-library/user-event'
import { describe, test, expect } from "vitest"
import { render, screen } from '@testing-library/react'
import App from '../src/App'

//the first test must to be 'end to end' or 'E2E'
//for this test, first we need write 'npm install @testing-library/user-event -D' in terminal
describe('<App />', () => {

   /*
   test('should work', () => {
      render(<App />) //Test Element Render
      screen.debug() //With debug, we can see all Html of render

      expect( //Find text in the render
         screen.getByText('Technical React Test')
      ).toBeDefined() // must to be defined
   })*/

   test('should add items and remove them', async () => {
      const user = userEvent.setup()

      render(<App />)

      //Search input
      const input = screen.getByRole('textbox')
      expect(input).toBeDefined()

      //Search in the form
      const form = screen.getByRole('form')
      expect(form).toBeDefined()

      const button = form.querySelector('button')
      expect(button).toBeDefined()

      await user.type(input, 'Me')
      await user.click(button!)

      const randomText = crypto.randomUUID()
      await user.type(input, randomText)
      await user.click(button!)

      //Ensure that the element is added
      const list = screen.getByRole('list')
      expect(list).toBeDefined()
      screen.debug()

      expect(list.childNodes.length).toBe(2)

      //Ensure that we can remove it
      const item = screen.getByText(randomText)
      var removeButton = item.querySelector('button')
      expect(removeButton).toBeDefined()
      
      await user.click(removeButton!) // Here, the user click

      const item2 = screen.getByText('Me')
      removeButton = item2.querySelector('button')

      await user.click(removeButton!) 

      screen.debug()

      const noResults = screen.getByText("There aren't elements in the list.")
      expect(noResults).toBeDefined()
   })
})