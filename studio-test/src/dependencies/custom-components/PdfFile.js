import React, {useState} from 'react'
import {Flex, Button} from '@chakra-ui/react'
import { Document, Page, pdfjs } from 'react-pdf';
import workerSrc from "./PdfWorker";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const PdfFile = ({src}) => {

  const [pagesCount, setPagesCount] = useState(0)
  const [pageNumber, setPageNumber] = useState(0)

  function onLoadSuccess({ numPages }) {
    setPagesCount(numPages)
    setPageNumber(1)
  }

  function onLoadError(err) {
    console.error(`Error ${err} when loading ${src}`)
  }

  const prevEnabled=pageNumber>1
  const nextEnabled=pageNumber<pagesCount

  return (
    <>
    <Flex flexDirection='row' alignItems='center'>
    <Button isDisabled={!prevEnabled} onClick={()=>setPageNumber(pageNumber-1)}>{'<'}</Button>
    {`${pageNumber}/${pagesCount}`}
    <Button isDisabled={!nextEnabled} onClick={()=>setPageNumber(pageNumber+1)}>{'>'}</Button>
    </Flex>
    <Document
      file={src}
      onLoadSuccess={onLoadSuccess}
      onLoadError={onLoadError}
      >
        <Page
          wrap
          key={`page_${pageNumber}`}
          pageNumber={pageNumber}
        />
    </Document>
    </>
  )
}


export default PdfFile
