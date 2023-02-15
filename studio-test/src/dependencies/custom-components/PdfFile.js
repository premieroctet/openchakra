import React, {useState} from 'react'
import {Flex, Button} from '@chakra-ui/react'
import workerSrc from "./pdf-worker";
const { Document, Page, pdfjs }=require('react-pdf')

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc

const sample = 'https://interactive-examples.mdn.mozilla.net/media/examples/In-CC0.pdf'

const PdfFile = ({src}) => {

  const [pagesCount, setPagesCount] = useState(0)
  const [pageNumber, setPageNumber] = useState(0)

  function onLoadSuccess({ numPages }) {
    setPagesCount(numPages)
    setPageNumber(1)
  }
  function onLoadError(err) {
    console.error(`Error ${err} while loading ${src}`)
  }

  const prevEnabled=pageNumber > 1
  const nextEnabled=pageNumber < pagesCount
  console.log(`refresh, page ${pageNumber} count ${pagesCount} prev:${prevEnabled}`)
  return (
    <>
    <Flex flexDirection={'row'} alignItems='center'>
    <Button isDisabled={!prevEnabled} onClick={()=>setPageNumber(pageNumber-1)}>{'<'}</Button>
    {`${pageNumber}/${pagesCount}`}
    <Button isDisabled={!nextEnabled} onClick={()=>setPageNumber(pageNumber+1)}>{'>'}</Button>
    </Flex>
    <Document
      file={src}
      onLoadSuccess={onLoadSuccess}
      onLoadError={onLoadError}
      >
      <Page key={`page_${pageNumber}`}
        pageNumber={pageNumber}
      />

    </Document>
    </>
  )

    /**
    return (
      <embed src={src} width='100%' height='100%' type="application/pdf" />
    )
    */

    /**
    return (
      <object data={src} type="application/pdf" width='100%' height='100%'>
      <embed src={src} type='application/pdf' />
      </object>
    )
    */

}


export default PdfFile
