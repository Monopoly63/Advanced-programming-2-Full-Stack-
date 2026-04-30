import { useMemo } from 'react';
import * as d3 from 'd3';

export function useTreeLayout(treeData, width = 900, height = 520) {
  return useMemo(() => {
    if (!treeData) return { nodes: [], links: [], bounds: { w: width, h: height } };

    const root = d3.hierarchy(treeData, (d) => {
      const children = [];
      if (d.left) children.push(d.left);
      if (d.right) children.push(d.right);
      return children.length ? children : null;
    });

    const layout = d3.tree().size([width - 100, height - 100]).separation((a, b) => (a.parent === b.parent ? 1.2 : 1.6));
    layout(root);

    const nodes = root.descendants().map((n) => ({
      id: n.data.id,
      value: n.data.value,
      type: n.data.type,
      x: n.x + 50,
      y: n.y + 50,
      depth: n.depth,
    }));

    const links = root.links().map((l) => ({
      source: { x: l.source.x + 50, y: l.source.y + 50 },
      target: { x: l.target.x + 50, y: l.target.y + 50 },
      id: `${l.source.data.id}-${l.target.data.id}`,
    }));

    return { nodes, links, bounds: { w: width, h: height } };
  }, [treeData, width, height]);
}