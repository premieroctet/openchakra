import React, {useState} from 'react'
import { Document, Page, pdfjs } from 'react-pdf';

import workerSrc from "../../../pdf-worker";
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const sample = 'https://interactive-examples.mdn.mozilla.net/media/examples/In-CC0.pdf'

const PdfFile = ({src}) => {

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);    

    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }
  return (
    <div>
    <Document 
      file={src} 
      onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(
        new Array(numPages),
        (el, index) => (
          <Page
            wrap
            key={`page_${index + 1}`}
            pageNumber={index + 1}
          />
        ),
      )}
    </Document>
    <p>
    Page {pageNumber} of {numPages}
  </p>
  </div>
  )
}


export default PdfFile