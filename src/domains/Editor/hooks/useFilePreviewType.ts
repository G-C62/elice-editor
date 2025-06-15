// 파일 확장자 기반 프리뷰 타입 판별 훅
import { useMemo } from 'react';

const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'];

export function useFilePreviewType(fileName?: string): 'image' | 'text' {
  return useMemo(() => {
    if (!fileName) return 'text';
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (ext && IMAGE_EXTENSIONS.includes(ext)) return 'image';
    return 'text';
  }, [fileName]);
}
