import { prerenderToNodeStream } from 'react-dom/static'
import { StaticRouter } from 'react-router-dom'
import App from './App.jsx'

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined

export async function render(pathname) {
  let renderError
  const { prelude, postponed } = await prerenderToNodeStream(
    <StaticRouter basename={basename} location={`${basename ?? ''}${pathname}`}>
      <div id="root">
        <App />
      </div>
    </StaticRouter>,
    {
      // Wait for every lazy route, and inline completed Suspense content even
      // when a page exceeds the default streaming chunk size.
      signal: AbortSignal.timeout(30_000),
      progressiveChunkSize: Number.MAX_SAFE_INTEGER,
      onError(error) {
        renderError = error
      },
    },
  )
  if (renderError) throw renderError
  if (postponed) throw new Error(`Static rendering did not finish for ${pathname}`)

  const chunks = []
  for await (const chunk of prelude) chunks.push(Buffer.from(chunk))
  return Buffer.concat(chunks).toString('utf8')
}
