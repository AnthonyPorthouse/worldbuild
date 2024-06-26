/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as WorldPagesIndexImport } from './routes/$world/pages/index'
import { Route as WorldPagesSlugImport } from './routes/$world/pages/$slug'

// Create Virtual Routes

const AuthLoginIndexLazyImport = createFileRoute('/auth/login/')()

// Create/Update Routes

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const AuthLoginIndexLazyRoute = AuthLoginIndexLazyImport.update({
  path: '/auth/login/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/auth/login/index.lazy').then((d) => d.Route),
)

const WorldPagesIndexRoute = WorldPagesIndexImport.update({
  path: '/$world/pages/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/$world/pages/index.lazy').then((d) => d.Route),
)

const WorldPagesSlugRoute = WorldPagesSlugImport.update({
  path: '/$world/pages/$slug',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/$world/pages/$slug.lazy').then((d) => d.Route),
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/$world/pages/$slug': {
      preLoaderRoute: typeof WorldPagesSlugImport
      parentRoute: typeof rootRoute
    }
    '/$world/pages/': {
      preLoaderRoute: typeof WorldPagesIndexImport
      parentRoute: typeof rootRoute
    }
    '/auth/login/': {
      preLoaderRoute: typeof AuthLoginIndexLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  WorldPagesSlugRoute,
  WorldPagesIndexRoute,
  AuthLoginIndexLazyRoute,
])

/* prettier-ignore-end */
