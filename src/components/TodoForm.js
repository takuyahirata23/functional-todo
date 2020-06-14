/**@jsx jsx */
import { css, jsx } from "@emotion/core"
import { TextField } from "@material-ui/core"

function TodoForm() {
  return (
    <form>
      <TextField label="add todo" size="medium" error fullWidth css={label} />
    </form>
  )
}

const label = css`
  font-size: 2rem;
`

export default TodoForm
