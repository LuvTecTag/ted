import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function UploadComponent({ onUpload }) {
  const [successCount, setSuccessCount] = useState(0);
  const [failureCount, setFailureCount] = useState(0);
  const [uploadHistory, setUploadHistory] = useState([]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.png'],
      'video/*': ['.mp4', '.mov']
    },
    onDrop: acceptedFiles => {
      try {
        onUpload(acceptedFiles);
        setSuccessCount(prev => prev + 1);
        setUploadHistory(prev => [
          {
            files: acceptedFiles.map(f => f.name),
            timestamp: new Date().toLocaleString(),
            status: 'success'
          },
          ...prev
        ].slice(0, 5));
      } catch (error) {
        setFailureCount(prev => prev + 1);
        setUploadHistory(prev => [
          {
            files: acceptedFiles.map(f => f.name),
            timestamp: new Date().toLocaleString(),
            status: 'failed'
          },
          ...prev
        ].slice(0, 5));
      }
    }
  });

  return (
    <div>
      <button
        {...getRootProps()}
        className="upload-zone"
        disabled={isDragActive}
      >
        <div>
          <input {...getInputProps()} />
          <div className="button-content">
            <span className="icon">📷🎥</span>
            <div>
              <p>点击上传媒体文件</p>
              <small>(支持 JPEG/PNG 图片和 MP4/MOV 视频)</small>
            </div>
          </div>
        </div>
      </button>

      <div className="stats-panel">
        <div className="success-rate">
          成功率：{((successCount / (successCount + failureCount)) * 100 || 0).toFixed(1)}%
        </div>
        <div className="upload-history">
          <h4>最近上传记录：</h4>
          {uploadHistory.map((record, index) => (
            <div key={index} className={`history-item ${record.status}`}>
              <span>{record.timestamp}</span>
              <span>{record.files.join(', ')}</span>
              <span>{record.status === 'success' ? '✓' : '✕'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}