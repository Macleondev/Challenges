import './App.css'
import { Item } from './components/Item'
import { useSEO } from './hooks/useSEO'
import { useItems } from './hooks/useltems'

export type ItemId = `${string}-${string}-${string}-${string}-${string}`

export interface Item {
  id: ItemId
  timestamp: number
  text: string
}


function App() {

  const { items, addItem, removeItem } = useItems()
  
  useSEO({
    title: `[${items.length}] Technical React Test`,
    description: 'Add and remove elements from a list'
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    //e.target.value -> for hear the onChange of a INPUT

    const {elements} = event.currentTarget

    //Strategy 1, Trap of TypeScript
    //I don't recommend
    //const input = item.namedItem('element') as HTMLInputElement

    //Strategy 2, Make sure it's what it's
    const input = elements.namedItem('item')
    const isInput = input instanceof HTMLInputElement //Pure JavaScript
    if (!isInput || input == null) return

    addItem(input.value)

    input.value = ''
  }

  /*
  Whitout arrow function
  function createHandleRemoveItem(id: ItemdId) {
    return function() {
      setItems(function(prevItems) {
        return prevItems.filter(function (currentItem) {
          return currentItem.id != id
        })
      })
    }
  }
  */
  // With arrow function, eslint-disable
  const createHandleRemoveItem = (id: ItemId) => () => {
    removeItem(id)
  }

  return (
    <main>
      <aside>
        <h1>Technical React Test</h1>
        <h2>Add and remove elements from a list</h2>

        <form onSubmit={handleSubmit} aria-label='Add elements to list'>
          <label>
            Element to be Introduce:
            <input
            name="item"
            required
            type="text"
            placeholder="Videogame 🎮"
            />
          </label>
          <button>Add element to list</button>
        </form>
      </aside>

      <section>
        <h2>List of Elements</h2>
        {
          items.length == 0 ? (
            <p>
              <strong>There aren't elements in the list.</strong>
            </p>
            ) : (
              <ul>{
                items.map((item) => {
                  return (
                    <Item {...item}
                    handleClick={createHandleRemoveItem(item.id)}
                    key={item.id} />
                  )
                })
              }
              </ul>
            )
          }
      </section>
    </main>
  )
}

export default App
