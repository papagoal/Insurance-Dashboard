import { useMutation, useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import React, { useEffect, useState } from 'react'
import Form from './Form'
import LinkLayout from './LinkLayout'
import LinkTable from './LinkTable'

const UPDATE_LINK = gql`
  mutation UpdateLink($id: ID!, $url: String!, $description: String!) {
    updateLink(id: $id, url: $url, description: $description) {
      id
      url
      description
    }
  }
`

const GET_LINK = gql`
  query GetLink($id: ID!) {
    link(id: $id) {
      id
      url
      description
    }
  }
`

const UpdateLink = ({ match: { params: { id } } }) => {
  const [udpateLink] = useMutation(UPDATE_LINK)
  const { loading, error, data } = useQuery(GET_LINK, { variables: { id } })
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  useEffect(() => {
    if (data) {
      setUrl(data.link.url)
      setDescription(data.link.description)
    }
  }, [data])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <LinkLayout hideSearch>
      <LinkTable />
      <Form
        handleSubmit={v => udpateLink({ variables: { ...v, id } })}
        url={url}
        setUrl={setUrl}
        description={description}
        setDescription={setDescription}
        buttonLabel='Update'
      />
    </LinkLayout>
  )
}

export default UpdateLink
