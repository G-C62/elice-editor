import { type FileNode } from '@/atoms/fileTreeAtom';

export function FileTreeNode({ node, depth = 0 }: { node: FileNode; depth?: number }) {
  return (
    <div style={{ paddingLeft: depth * 16, fontFamily: 'monospace', fontSize: '12px' }}>
      <span style={{ fontWeight: node.type === 'folder' ? 'bold' : 'normal' }}>
        {node.type === 'folder' ? '📁' : '📄'} {node.name}
      </span>
      {node.children && node.children.map(child => <FileTreeNode key={child.id} node={child} depth={depth + 1} />)}
    </div>
  );
}
