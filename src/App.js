/**@jsx jsx */
import { css, jsx } from "@emotion/core"
import TodoForm from "./components/TodoForm"
import useLocalStorage from "./hooks/useLocalStorage"

function App() {
  const [todoList, setTodoList] = useLocalStorage("todoList", [])
  return (
    <div className="App">
      <main css={main}>
        <div css={topWrapper}>
          <h1 css={h1}>Functional Todo App</h1>
          <p css={p}>Simple todo application using function programming.</p>
          <p css={p}>
            I built this app to practice writing pure functions and using
            Ramda.js as well as Folktale(Monad)
          </p>
        </div>
        <TodoForm />
      </main>
    </div>
  )
}

const topWrapper = css`
  margin-bottom: 2rem;
`
const h1 = css`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 2rem;
`
const p = css`
  font-size: 2rem;
  line-height: 1.3;
`
const main = css`
  margin: 5rem 2rem;
  max-width: 120rem;
`

export default App
