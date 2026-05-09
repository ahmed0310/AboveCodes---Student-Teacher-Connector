import React, { useState } from 'react';
import { Button } from './ui/button';
import { FileText, Download, Printer } from 'lucide-react';
import { generatePDFReport, generateCSVReport, printReport, ReportData } from '../utils/reportGenerator';

interface ReportGeneratorProps {
  reportData: ReportData;
  showPrint?: boolean;
}

export function ReportGenerator({ reportData, showPrint = true }: ReportGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePDFExport = async () => {
    setIsGenerating(true);
    try {
      generatePDFReport(reportData);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCSVExport = async () => {
    setIsGenerating(true);
    try {
      generateCSVReport(reportData);
    } catch (error) {
      console.error('Error generating CSV:', error);
      alert('Failed to generate CSV');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = async () => {
    setIsGenerating(true);
    try {
      printReport(reportData);
    } catch (error) {
      console.error('Error printing report:', error);
      alert('Failed to print report');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg text-sm">
        <FileText className="w-4 h-4 text-gray-600" />
        <span className="text-gray-700 font-medium">Export Report:</span>
      </div>
      
      <Button
        onClick={handlePDFExport}
        disabled={isGenerating}
        variant="outline"
        className="flex items-center gap-2"
      >
        <Download className="w-4 h-4" />
        {isGenerating ? 'Generating...' : 'PDF'}
      </Button>
      
      <Button
        onClick={handleCSVExport}
        disabled={isGenerating}
        variant="outline"
        className="flex items-center gap-2"
      >
        <Download className="w-4 h-4" />
        {isGenerating ? 'Generating...' : 'CSV'}
      </Button>
      
      {showPrint && (
        <Button
          onClick={handlePrint}
          disabled={isGenerating}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Printer className="w-4 h-4" />
          Print
        </Button>
      )}
    </div>
  );
}
