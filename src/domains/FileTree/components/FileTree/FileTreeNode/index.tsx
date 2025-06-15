import { type FileNode } from '@/atoms/fileTreeAtom';
import styled from 'styled-components';

interface FileTreeNodeProps {
  node: FileNode;
  depth?: number;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onOpenTab: (file: { id: string; name: string }) => void;
}

const NodeContainer = styled.div<{ selected: boolean; $depth: number }>`
  background: ${({ selected }) => (selected ? '#1976d2' : 'transparent')};
  color: ${({ selected }) => (selected ? 'white' : 'inherit')};
  padding-left: ${({ $depth }) => $depth * 16}px;
  font-family: monospace;
  font-size: 12px;
  cursor: pointer;
  border-radius: 4px;
  user-select: none;
`;

export function FileTreeNode({ node, depth = 0, selectedId, onSelect, onOpenTab }: FileTreeNodeProps) {
  const isSelected = selectedId === node.id;
  const isFile = node.type === 'file';

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFile) {
      onSelect(node.id);
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFile) {
      onOpenTab({ id: node.id, name: node.name });
    }
  };

  return (
    <NodeContainer selected={isSelected} $depth={depth} onClick={handleClick} onDoubleClick={handleDoubleClick}>
      <span style={{ fontWeight: node.type === 'folder' ? 'bold' : 'normal' }}>
        {node.type === 'folder' ? '📁' : '📄'} {node.name}
      </span>
      {node.children &&
        node.children.map(child => (
          <FileTreeNode
            key={child.id}
            node={child}
            depth={depth + 1}
            selectedId={selectedId}
            onSelect={onSelect}
            onOpenTab={onOpenTab}
          />
        ))}
    </NodeContainer>
  );
}
