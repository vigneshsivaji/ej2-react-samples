export const PdfViewerSampleOrder:Object = [
    { 'path': 'pdfviewer/default', 'component':'Default', 'name': 'Default', 'order': '01', 'category': 'PDF Viewer', 'description': 'This demo for Essential JS 2 PdfViewer shows the default rendering of the PdfViewer with minimum configuration.' , 'api':'{"PdfViewerComponent":["serviceUrl", "documentPath"] }'},
    { 'path': 'pdfviewer/read-only', 'type': 'new', 'component': 'ReadOnly', 'name': 'Read-Only', 'order': '02', 'category': 'Document Security', 'description':  'The illustration demonstrates the PDF viewer in read-only mode, preventing edits to annotations,form fields, and disabling text selection.', 'api': '{"PdfViewerComponent":["serviceUrl", "documentPath", "documentLoad"]}'},
    { 'path': 'pdfviewer/document-list', 'type': 'new','description': 'This demo illustrates how to display the list of documents in grid layout and open the document for viewing or editing using PDFViewer editor in Dialog.', 'component':'DocumentList', 'name': 'Document List', 'order': '03', 'category': 'File Management', 'api':'{"PdfViewerComponent":["serviceUrl", "documentPath"] }'},
    { 'path': 'pdfviewer/custom-toolbar','type':'update' ,'component': 'CustomToolbar', 'name': 'Custom Toolbar', 'order': '04', 'category': 'Toolbar', 'description': 'This demo for Essential JS 2 PdfViewer shows the default rendering of the PdfViewer with custom toolbar configuration.', 'api': '{"PdfViewerComponent":["serviceUrl", "documentPath","documentLoad","pageChange","enableToolbar"] }'},
    { 'path': 'pdfviewer/right-to-left', 'component': 'RightToLeft', 'name': 'Right To Left', 'order': '05', 'category': 'Localization', 'description': 'This demo for Essential JS 2 PdfViewer shows the default rendering of the PdfViewer with Right To Left Configuration.', 'api': '{"PdfViewerComponent":["serviceUrl", "documentPath","enableRtl"] }'},
    { 'path': 'pdfviewer/form-filling', 'component': 'FormFilling', 'name': 'Form Filling', 'order': '06', 'category': 'PDF Form', 'description': 'This demo for Essential JS 2 PdfViewer shows the default rendering of the PdfViewer with Form Filling Configuration.', 'api': '{"PdfViewerComponent":["serviceUrl", "documentPath"] }' },
    { 'path': 'pdfviewer/form-designer', 'component': 'FormDesignerComponent', 'name': 'Form Designer', 'order': '06', 'category': 'PDF Form', 'description': 'This sample demonstrates the creation of different types of annotations such as text markup, shapes, measurements, free text, stamps, etc. in the PDF viewer.', 'api': '{"PdfViewerComponent":["serviceUrl", "documentPath", "documentLoad"]}'},
    { 'path': 'pdfviewer/annotations', 'component': 'Annotations', 'name': 'Annotations', 'order': '07', 'category': 'Annotation', 'description': 'This sample demonstrates the creation of different types of annotations such as text markup, shapes, measurements, free text, stamps, etc. in the PDF viewer.', 'api': '{"PdfViewerComponent":["serviceUrl", "documentPath", "documentLoad"]}'},
    { 'path': 'pdfviewer/hand-written', 'component': 'HandWrittenSignature', 'name': 'Handwritten Signature', 'order': '08', 'category': 'Signature', 'description': 'This sample shows the handwritten signature and initial support of PDF viewer. The signature or initial support reduces the paperwork.', 'api': '{"PdfViewerComponent":["serviceUrl", "documentPath", "documentLoad"]}'},
    { 'path': 'pdfviewer/invisible-signature','component': 'InvisibleSignature', 'name': 'Invisible Signature', 'order': '08', 'category': 'Signature', 'description': 'This sample demonstrates how to digitally sign a PDF document from code behind using Syncfusions PDF Viewer and PDF Library.', 'api': '{"PdfViewerComponent":["serviceUrl", "documentPath", "documentLoad"]}'}
]