import { describe, expect, test } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useItems } from "../src/hooks/useltems";

describe('useItems hook', () => {
   test('should add and remove items', () => {
      const { result } = renderHook(() => useItems())

      expect(result.current.items.length).toBe(0)

      act(() => {
         result.current.addItem('Play videogames')
         result.current.addItem('Go to run')
      })

      console.log(result.current.items)
      expect(result.current.items.length).toBe(2)

      act(() => {
         result.current.removeItem(result.current.items[1].id)
         result.current.removeItem(result.current.items[0].id)
      })

      expect(result.current.items.length).toBe(0)

   })
})