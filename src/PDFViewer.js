import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import './PDFViewer.css';

// Fix: Use the worker file from the pdfjs-dist package directly
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function PDFViewer({ file }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const goToPrevPage = () => setPageNumber((prevPage) => prevPage - 1);
  const goToNextPage = () => setPageNumber((prevPage) => prevPage + 1);

  const handlePageChange = (e) => {
    const pageNum = parseInt(e.target.value);
    if (pageNum >= 1 && pageNum <= numPages) {
      setPageNumber(pageNum);
    }
  };

  return (
    <div className="pdf-viewer-container">
      <div className="pdf-toolbar">
        <button onClick={goToPrevPage} disabled={pageNumber <= 1}>
          ◀
        </button>
        <span>
          <input
            type="number"
            value={pageNumber}
            onChange={handlePageChange}
            min={1}
            max={numPages}
            className="page-input"
          />{' '}
          of {numPages || 'Loading...'}
        </span>
        <button onClick={goToNextPage} disabled={pageNumber >= numPages}>
          ▶
        </button>
        <div className="search-container">
          <input
            type="text"
            placeholder="పేజీని వెతకండి..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="pdf-document">
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
      </div>
    </div>
  );
}

export default PDFViewer;