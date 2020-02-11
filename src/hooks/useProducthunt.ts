import { useEffect } from 'react'
import useDispatch from './useDispatch'

const useProducthunt = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search)
    const refQueryParam = searchParams.get('ref')

    if (refQueryParam && refQueryParam === 'producthunt') {
      dispatch.components.loadDemo('ph')
      // eslint-disable-next-line
      history.replaceState(null, 'Openchakra', '/')
    }
  }, [dispatch.components])
}

export default useProducthunt
