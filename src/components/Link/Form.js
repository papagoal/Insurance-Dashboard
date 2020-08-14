import { useStyletron } from 'baseui'
import { Button, KIND, SIZE } from 'baseui/button'
import { FormControl } from 'baseui/form-control'
import { Input } from 'baseui/input'
import { Textarea } from 'baseui/textarea'
import React from 'react'
import { useHistory } from 'react-router-dom';

const Form = ({ handleSubmit, url, setUrl, description, setDescription, buttonLabel }) => {
  const [css, theme] = useStyletron()
  const space = css({ marginLeft: theme.sizing.scale300 })
  const history = useHistory()

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        handleSubmit({ url, description })
      }}
    >
      <FormControl
        label='URL'
        caption='Please enter URL'
      >
        <Input
          type='text'
          value={url}
          onChange={e => setUrl(e.currentTarget.value)}
          required
        />
      </FormControl>
      <FormControl
        label='Description'
        caption='Please enter a description'
      >
        <Textarea
          type='text'
          value={description}
          onChange={e => setDescription(e.currentTarget.value)}
          required
        />
      </FormControl>
      <Button
        type='reset'
        kind={KIND.secondary}
        size={SIZE.large}
        onClick={() => {
          setUrl('')
          setDescription('')
          history.push('/link/list')
        }}
      >Clear
      </Button>
      <span className={space} />
      <Button type='submit' size={SIZE.large}>{buttonLabel}</Button>
    </form>
  )
}

export default Form
