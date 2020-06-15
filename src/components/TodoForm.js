/**@jsx jsx */
import { jsx } from "@emotion/core"
import styled from "@emotion/styled"
import PropTypes from "prop-types"

function TodoForm({ input, setInput, error, handleOnSubmit }) {
  function handleOnChange(e) {
    setInput(e.target.value)
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <label>
        <Input
          type="text"
          value={input}
          onChange={handleOnChange}
          placeholder="Todo"
        />
      </label>
      {Boolean(error) && <Span>{error}</Span>}
    </form>
  )
}

TodoForm.propTypes = {
  input: PropTypes.string.isRequired,
  setInput: PropTypes.func.isRequired,
}

const Input = styled.input`
  border-top: 1px solid transparent;
  border-left: 1px solid transparent;
  border-right: 1px solid transparent;
  border-bottom: 1px solid teal;
  padding: 1rem;
  width: 100%;
  display: block;
  margin: auto;
  font-size: 1.8rem;
`
const Span = styled.span(props => ({
  display: "inline-block",
  marginTop: "1rem",
  color: "red",
}))

export default TodoForm
