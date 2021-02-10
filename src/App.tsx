/**@jsx jsx */
import { useState } from "react"
import { css, jsx } from "@emotion/core"
import styled from "@emotion/styled"
import { uuid } from "uuidv4"
import { curryN, compose } from "ramda"
import { right, left, fold, Either } from 'fp-ts/lib/Either'
import { pipe } from "fp-ts/function";
import TodoForm from "./components/TodoForm"
import useLocalStorage from "./hooks/useLocalStorage"
import TodoList from "./components/TodoList"
interface Todo {
  id: string;
  todo: string;
}

const validateItem = (str: string): Either<string, string> =>
  str.trim().length > 0
    ? right(str)
    : left("Please enter a valid value")

const removeItem = (list: Todo[], id: string) => list.filter(item => item.id !== id)

const App: React.FC = () => {
  const [todoList, setTodoList] = useLocalStorage("todoList", [])
  const [input, setInput] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  const curriedRemoveItem = curryN(2, removeItem)(todoList)

  // These are not pure===========================================
  const removeTodo = compose(setTodoList, curriedRemoveItem)

  function generateNewItem(todo: Todo) {
    return { id: uuid(), todo }
  }

  function done(newItem: Todo) {
    setInput("")
    setError(null)
    setTodoList([generateNewItem(newItem), ...todoList])
  }


  function handleOnSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    pipe(validateItem(input), fold(setError, done))
    // validateItem(input).fold(setError, done)
  }
  //=============================================================
  return (
    <div>
      <Main>
        <div css={topWrapper}>
          <h1 css={h1}>Functional Todo App</h1>
          <p css={p}>This is my first step to be a functional programmer!</p>
          <p css={p}>UI: React, Emotion</p>
          <p css={p}>Library: Ramda, Folktale</p>
        </div>
        <TodoForm
          input={input}
          setInput={setInput}
          handleOnSubmit={handleOnSubmit}
          error={error}
        />
        <Buttons>
          <Button type="submit" onClick={handleOnSubmit} secondary>
            Add todo
          </Button>
          <Button
            type="button"
            onClick={() => setTodoList([])}
            disabled={todoList.length < 1}
          >
            Remove all
          </Button>
        </Buttons>
        <TodoList list={todoList} removeTodo={removeTodo} />
      </Main>
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
const Main = styled.main`
  font-family: "Didact Gothic", sans-serif;
  margin: 5rem 2rem;
  max-width: 80rem;
  @media (min-width: 768px) {
    margin: 5rem auto;
  }
`
const Buttons = styled.div(props => ({
  marginTop: "2rem",
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  columnGap: "2rem",
  justifyContent: "center",
}))

const Button = styled.button<{ secondary?: boolean, disabled?: boolean}>(({ secondary, disabled }) => ({
  backgroundColor: secondary ? "tomato" : "darkblue",
  color: "white",
  padding: ".5rem 1rem",
  cursor: "pointer",
  border: "1px solid transparent",
  borderRadius: "5px 5px",
  opacity: disabled ? ".5" : "1",
}))

export default App
