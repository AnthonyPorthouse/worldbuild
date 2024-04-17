import { Link, createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/$world/pages/')({
  component: Pages
})

function Pages() {
  const pages = Route.useLoaderData();

  return (
    <div>
      <h1 className='text-2xl'>Pages</h1>
      <ul>
        {pages.map(({id, title, slug, world}) => <li key={id}><Link to='/$world/pages/$slug' params={{
          slug
        }}>{title}</Link></li>)}
      </ul>
    </div>
  )
}