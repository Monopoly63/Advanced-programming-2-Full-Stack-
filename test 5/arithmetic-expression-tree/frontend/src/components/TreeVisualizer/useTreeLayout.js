import { useMemo } from 'react';
import * as d3 from 'd3';

/**
 * Compute node positions and link paths from an expression tree.
 * React owns the DOM — this hook only returns data to render as JSX.
 */
export function useTreeLayout(treeData, width = 800, height = 500) {
  return useMemo(() => {
    if (!treeData) return { nodes: [], links: [] };

    const root = d3.hierarchy(treeData, (d) => {
      const children = [];
      if (d.left) children.push(d.left);
      if (d.right) children.push(d.right);
      return children.length ? children : null;
    });

    const layout = d3.tree().size([Math.max(200, width - 80), Math.max(200, height - 80)]);
    layout(root);

    const nodes = root.descendants().map((n) => ({
      id: n.data.id,
      value: n.data.value,
      type: n.data.type,
      x: n.x + 40,
      y: n.y + 40,
      depth: n.depth,
    }));

    const links = root.links().map((l) => ({
      source: { x: l.source.x + 40, y: l.source.y + 40 },
      target: { x: l.target.x + 40, y: l.target.y + 40 },
      id: `${l.source.data.id}-${l.target.data.id}`,
    }));

    return { nodes, links };
  }, [treeData, width, height]);
}