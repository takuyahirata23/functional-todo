/**@jsx jsx */
import { jsx } from "@emotion/core"
import styled from "@emotion/styled"
import PropTypes from "prop-types"
import { RiDeleteBin3Line } from "react-icons/ri"

function TodoList({ list, removeTodo }) {
  return (
    <Ul>
      {list.map(({ id, todo }) => (
        <Li key={id}>
          <span>{todo}</span>
          <IconWrapper>
            <RiDeleteBin3Line onClick={() => removeTodo(id)} />
          </IconWrapper>
        </Li>
      ))}
    </Ul>
  )
}

TodoList.propTypes = {
  list: PropTypes.array.isRequired,
  removeTodo: PropTypes.func.isRequired,
}

const Ul = styled.ul(props => ({
  display: "grid",
  rowGap: "1rem",
  marginTop: "2rem",
}))

const Li = styled.li(props => ({
  display: "grid",
  gridTemplateColumns: "9fr 1fr",
  justifyContent: "space-between",
  columnGap: "2rem",
  border: "1.5px solid lightgreen",
  borderRadius: "5px 5px",
  padding: "1rem",
}))

const IconWrapper = styled.div`
  display: grid;
  justify-items: end;

  svg {
    font-size: 2rem;
    cursor: pointer;
  }
`

export default TodoList
