const { ApolloServer } = require('apollo-server')
const gql = require('graphql-tag')
const jwt = require('jsonwebtoken')
const fetch = require('node-fetch')

const typeDefs = gql`
  type auth0_profile {
    email: String
    picture: String
  }

  type Query {
    auth0: auth0_profile
  }
`

const AUTH0_MANAGEMENT_API_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5rVkVOa0ZHTVVGRU5rVkdNRGhEUmtZNU9VWTRRa05CTlVVMU5rRkZSamswT0RoQk5FSkdNUSJ9.eyJpc3MiOiJodHRwczovL2Fpcm1jb25zdWx0aW5nLmF1dGgwLmNvbS8iLCJzdWIiOiJPeWZadFNpOTZPcVcxRzM2RXBXMzc5dzNHODRaMkV5Z0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9haXJtY29uc3VsdGluZy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTU4MTkyNTQ3NCwiZXhwIjoxNTgyMDExODc0LCJhenAiOiJPeWZadFNpOTZPcVcxRzM2RXBXMzc5dzNHODRaMkV5ZyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.t_eg4OUx-hASSomXWnKB1TcWM_ueGu0AgfppKAyAt6kayGtcAH91Brz3K-0eM1jWhBsiGyh-Bo6e2YatmNISK00HV8hM21eyguYC6SlN8P1KbRHHhfxLSkxrUX7u-VM6rqa9i4SQM1vK4HT3Y41YnJN9gPGCf8xJTINw8NUVYYLpSRuAIZklQIiMABz6lP10XFeybCvK8qcFtEaXakjBTZQC6AIWSDFGvc5bEY2ZPLotP3-0N1c3EnuutcFuhoeBgC_N3NCJPKgoOMYfZ_j8qUgb8njpw4yfixJXmtRxKe_fiABfk7mxsFIxqk8WNWmV-pN35ulgDTXOx4JpT0F11Q'
const AUTH0_DOMAIN = 'airmconsulting.auth0.com'
const PORT = 3000
function getProfileInfo (user_id) {
  const headers = {
    Authorization: 'Bearer ' + AUTH0_MANAGEMENT_API_TOKEN
  }
  return fetch('https://' + AUTH0_DOMAIN + '/api/v2/users/' + user_id,
    { headers: headers })
    .then(response => response.json())
}

const resolvers = {
  Query: {
    auth0: (parent, args, context) => {
      const authHeaders = context.headers.authorization || ''
      console.log(context)
      const token = authHeaders.replace('Bearer ', '')
      try {
        if (!token) {
          return 'Authorization token is missing!'
        }
        const decoded = jwt.decode(token)
        const user_id = decoded.sub
        console.log('user id', user_id)
        return getProfileInfo(user_id).then(function (resp) {
          console.log(resp)
          if (!resp) {
            return null
          }
          return { email: resp.email, picture: resp.picture }
        })
      } catch (e) {
        console.log(e)
        return null
      }
    }
  }
}

const context = ({ req }) => ({ headers: req.headers })
const schema = new ApolloServer({ typeDefs, resolvers, context })
schema.listen({ port: PORT }).then(({ url }) => {
  console.log('schma ready at ', url)
})
