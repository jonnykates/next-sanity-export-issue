import groq from 'groq'
import client from '../client'

function Author (props) {
  const {
    name = 'Missing name',
  } = props
  return (
    <article>
      <h1>{name}</h1>
    </article>
  )
}

const query = groq`*[_type == "author" && slug.current == $slug][0]{
  name,
}`

Author.getInitialProps = async function (context) {
  const { slug = "" } = context.query
  return await client.fetch(query, { slug })
}

export default Author
