import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Form from './Form'
import LinkLayout from './LinkLayout'
import LinkTable, { ALL_LINKS } from './LinkTable'

const ADD_LINK = gql`
  mutation AddLink($url: String!, $description: String!) {
    createLink(url: $url, description: $description) {
      id
      url
      description
    }
  }
`

const updateCache = (cache, { data: { createLink } }) => {
  const { links } = cache.readQuery({ query: ALL_LINKS })
  cache.writeQuery({
    query: ALL_LINKS,
    data: { links: [...links, createLink] }
  })
}

const CreateLink = () => {
  const [addLink] = useMutation(
    ADD_LINK, { update: updateCache }
  )
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const history = useHistory()

  return (
    <LinkLayout hideSearch>
      <LinkTable />
      <Form
        handleSubmit={variables => {
          addLink({ variables })
          setUrl('')
          setDescription('')
          history.push('/link/list')
        }}
        url={url}
        setUrl={setUrl}
        description={description}
        setDescription={setDescription}
        buttonLabel='Create'
      />
    </LinkLayout>
  )
}

export default CreateLink
