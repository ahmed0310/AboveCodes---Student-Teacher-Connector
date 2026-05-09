import jsPDF from 'jspdf';
import Papa from 'papaparse';

export interface ReportData {
  title: string;
  subtitle?: string;
  columns: string[];
  data: any[];
  summary?: Record<string, string | number>;
}

/**
 * Generate and download PDF report
 */
export const generatePDFReport = (reportData: ReportData) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  
  let yPosition = 15;
  
  // Title
  pdf.setFontSize(16);
  pdf.setFont(undefined, 'bold');
  pdf.text(reportData.title, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 10;
  
  // Subtitle
  if (reportData.subtitle) {
    pdf.setFontSize(11);
    pdf.setFont(undefined, 'normal');
    pdf.text(reportData.subtitle, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 8;
  }
  
  // Generated timestamp
  pdf.setFontSize(9);
  pdf.setFont(undefined, 'italic');
  const timestamp = new Date().toLocaleString();
  pdf.text(`Generated: ${timestamp}`, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 12;
  
  // Summary section if available
  if (reportData.summary && Object.keys(reportData.summary).length > 0) {
    pdf.setFontSize(12);
    pdf.setFont(undefined, 'bold');
    pdf.text('Summary', 15, yPosition);
    yPosition += 7;
    
    pdf.setFontSize(10);
    pdf.setFont(undefined, 'normal');
    Object.entries(reportData.summary).forEach(([key, value]) => {
      pdf.text(`${key}: ${value}`, 15, yPosition);
      yPosition += 6;
    });
    
    yPosition += 5;
  }
  
  // Table headers
  pdf.setFontSize(10);
  pdf.setFont(undefined, 'bold');
  const columnWidth = (pageWidth - 30) / reportData.columns.length;
  
  reportData.columns.forEach((col, index) => {
    pdf.text(col, 15 + index * columnWidth, yPosition, { maxWidth: columnWidth - 2 });
  });
  yPosition += 8;
  
  // Table rows
  pdf.setFont(undefined, 'normal');
  pdf.setFontSize(9);
  
  reportData.data.forEach((row) => {
    if (yPosition > pageHeight - 15) {
      pdf.addPage();
      yPosition = 15;
      
      // Repeat headers on new page
      pdf.setFont(undefined, 'bold');
      reportData.columns.forEach((col, index) => {
        pdf.text(col, 15 + index * columnWidth, yPosition, { maxWidth: columnWidth - 2 });
      });
      yPosition += 8;
      pdf.setFont(undefined, 'normal');
    }
    
    reportData.columns.forEach((col, index) => {
      const cellValue = String(row[col] || '');
      pdf.text(cellValue, 15 + index * columnWidth, yPosition, { maxWidth: columnWidth - 2 });
    });
    yPosition += 6;
  });
  
  // Footer
  yPosition = pageHeight - 10;
  pdf.setFontSize(8);
  pdf.setFont(undefined, 'italic');
  pdf.text('Student-Teacher Connector System', pageWidth / 2, yPosition, { align: 'center' });
  
  // Save PDF
  const filename = `${reportData.title.replace(/\s+/g, '_')}_${new Date().getTime()}.pdf`;
  pdf.save(filename);
};

/**
 * Generate and download CSV report
 */
export const generateCSVReport = (reportData: ReportData) => {
  const csvData = [];
  
  // Add title
  csvData.push([reportData.title]);
  
  // Add subtitle if available
  if (reportData.subtitle) {
    csvData.push([reportData.subtitle]);
  }
  
  // Add timestamp
  csvData.push([`Generated: ${new Date().toLocaleString()}`]);
  csvData.push([]); // Empty row for spacing
  
  // Add summary if available
  if (reportData.summary && Object.keys(reportData.summary).length > 0) {
    csvData.push(['SUMMARY']);
    Object.entries(reportData.summary).forEach(([key, value]) => {
      csvData.push([key, value]);
    });
    csvData.push([]); // Empty row for spacing
  }
  
  // Add table headers
  csvData.push(reportData.columns);
  
  // Add table data
  reportData.data.forEach((row) => {
    csvData.push(reportData.columns.map(col => row[col] || ''));
  });
  
  // Generate CSV using PapaParse
  const csv = Papa.unparse(csvData);
  
  // Create download link
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  const filename = `${reportData.title.replace(/\s+/g, '_')}_${new Date().getTime()}.csv`;
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Generate and print report
 */
export const printReport = (reportData: ReportData) => {
  const printWindow = window.open('', '', 'height=600,width=800');
  if (!printWindow) return;
  
  let html = `
    <html>
    <head>
      <title>${reportData.title}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { text-align: center; color: #333; }
        .subtitle { text-align: center; color: #666; font-style: italic; }
        .timestamp { text-align: center; color: #999; font-size: 0.9em; }
        .summary { margin: 20px 0; }
        .summary h3 { border-bottom: 2px solid #ddd; padding-bottom: 10px; }
        .summary-item { margin: 5px 0; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th { background-color: #f5f5f5; padding: 10px; text-align: left; border-bottom: 2px solid #ddd; }
        td { padding: 8px; border-bottom: 1px solid #ddd; }
        tr:nth-child(even) { background-color: #f9f9f9; }
      </style>
    </head>
    <body>
      <h1>${reportData.title}</h1>
  `;
  
  if (reportData.subtitle) {
    html += `<p class="subtitle">${reportData.subtitle}</p>`;
  }
  
  html += `<p class="timestamp">Generated: ${new Date().toLocaleString()}</p>`;
  
  if (reportData.summary && Object.keys(reportData.summary).length > 0) {
    html += `<div class="summary"><h3>Summary</h3>`;
    Object.entries(reportData.summary).forEach(([key, value]) => {
      html += `<div class="summary-item"><strong>${key}:</strong> ${value}</div>`;
    });
    html += `</div>`;
  }
  
  html += `<table><thead><tr>`;
  reportData.columns.forEach(col => {
    html += `<th>${col}</th>`;
  });
  html += `</tr></thead><tbody>`;
  
  reportData.data.forEach((row) => {
    html += `<tr>`;
    reportData.columns.forEach(col => {
      html += `<td>${row[col] || ''}</td>`;
    });
    html += `</tr>`;
  });
  
  html += `</tbody></table>`;
  html += `<p style="text-align: center; margin-top: 30px; color: #999; font-size: 0.9em;">
    <em>Student-Teacher Connector System</em>
  </p>`;
  html += `</body></html>`;
  
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.print();
};
