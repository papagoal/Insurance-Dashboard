import { gql } from 'apollo-boost'
import { Show } from 'baseui/icon'
import Delete from 'baseui/icon/delete'
import { StyledAction, StyledBody, StyledCell, StyledHead, StyledHeadCell, StyledRow, StyledTable } from 'baseui/table'
import React from 'react'
import { useMutation, useQuery } from 'react-apollo'
import { Link, useHistory } from 'react-router-dom'

export const ALL_LINKS = gql`
  query AllLinks {
    links {
      id
      url
      description
    }
  }
`
const DELETE_LINK = gql`
  mutation DeleteLink ($id: ID!) {
    deleteLink(id: $id) {
      id
    }
  }
`

const updateCache = (cache, { data: { deleteLink } }) => {
  const { links } = cache.readQuery({ query: ALL_LINKS })
  const filteredLinks = links.filter(({ id }) => id !== deleteLink.id)
  cache.writeQuery({
    query: ALL_LINKS,
    data: { links: filteredLinks }
  })
}

const LinkTable = () => {
  const { loading, error, data } = useQuery(ALL_LINKS)
  const [deleteLink] = useMutation(
    DELETE_LINK, { update: updateCache }
  )
  const history = useHistory()

  if (loading) return <p>Loading</p>
  if (error) return <p>Error</p>

  const columns = ['URL', 'Description', 'Actions']

  return (
    <StyledTable>
      <StyledHead>
        {columns.map(c => <StyledHeadCell key={c}>{c}</StyledHeadCell>)}
      </StyledHead>
      <StyledBody>
        {data.links.map(({ id, url, description }) => (
          <StyledRow key={id}>
            <StyledCell>{url}</StyledCell>
            <StyledCell>{description}</StyledCell>
            <StyledCell>
              <StyledAction>
                <Delete onClick={() => {
                  deleteLink({ variables: { id } })
                  history.push('/link/list')
                }}
                />
              </StyledAction>
              <StyledAction>
                <Link to={`/link/update/${id}`} style={{ textDecoration: 'none', color: 'black' }}>
                  <Show />
                </Link>
              </StyledAction>
            </StyledCell>
          </StyledRow>
        ))}
      </StyledBody>
    </StyledTable>
  )
}

export default LinkTable
