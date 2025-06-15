interface FileImagePreviewProps {
  fileName: string;
  content: string;
}

export function FileImagePreview({ fileName, content }: FileImagePreviewProps) {
  const ext = fileName.split('.').pop()?.toLowerCase();
  const mime = ext === 'svg' ? 'image/svg+xml' : `image/${ext}`;
  const src = content.startsWith('data:') ? content : `data:${mime};base64,${content}`;
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img src={src} alt={fileName} style={{ maxWidth: '100%', maxHeight: '100%' }} />
    </div>
  );
}
