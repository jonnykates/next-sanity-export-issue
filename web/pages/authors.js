import Link from 'next/link'
import client from '../client'

function Authors(props) {
    const { authors = [] } = props
    return (
      <div>
        <h1>Here are our authors</h1>
        {authors.map(
          ({ _id, name = '', slug = '' }) =>
            slug && (
              <li key={_id}>
                <Link prefetch href={`/a/${slug.current}`}>
                  <a>{name}</a>
                </Link>{' '}
              </li>
            )
        )}
      </div>
    )
}

Authors.getInitialProps = async () => ({
  authors: await client.fetch(`*[_type == "author"]`)
})

export default Authors