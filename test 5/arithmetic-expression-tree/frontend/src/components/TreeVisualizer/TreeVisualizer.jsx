import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useTranslation } from 'react-i18next';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { useExpressionParser } from '../../hooks/useExpressionParser';
import { useTreeLayout } from './useTreeLayout';
import { computeCanvasSize } from '../../utils/treeHelpers';
import TreeNode from './TreeNode';

export default function TreeVisualizer() {
  const { t } = useTranslation();
  const { tree, metadata } = useExpressionParser();
  const svgRef = useRef(null);
  const zoomRef = useRef(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, k: 1 });

  const { width, height } = useMemo(() => computeCanvasSize(tree), [tree]);
  const { nodes, links } = useTreeLayout(tree, width, height);

  useEffect(() => {
    if (!svgRef.current) return undefined;
    const selection = d3.select(svgRef.current);
    const zoom = d3
      .zoom()
      .scaleExtent([0.3, 3])
      .on('zoom', (event) => {
        const { x, y, k } = event.transform;
        setTransform({ x, y, k });
      });
    selection.call(zoom);
    zoomRef.current = zoom;
    return () => {
      selection.on('.zoom', null);
    };
  }, []);

  const applyZoom = (factor) => {
    if (!svgRef.current || !zoomRef.current) return;
    d3.select(svgRef.current).transition().duration(200).call(zoomRef.current.scaleBy, factor);
  };

  const resetView = () => {
    if (!svgRef.current || !zoomRef.current) return;
    d3.select(svgRef.current)
      .transition()
      .duration(250)
      .call(zoomRef.current.transform, d3.zoomIdentity);
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-6 flex flex-col">
      <header className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{t('tree.title')}</h2>
          {metadata && (
            <div className="text-xs text-gray-500 mt-1 flex flex-wrap gap-x-4 gap-y-1">
              <span>
                <span className="font-semibold text-gray-700">{metadata.nodeCount}</span>{' '}
                {t('tree.nodes')}
              </span>
              <span>
                <span className="font-semibold text-gray-700">{metadata.depth}</span>{' '}
                {t('tree.depth')}
              </span>
              <span>
                <span className="font-semibold text-gray-700">{metadata.tokenCount}</span>{' '}
                {t('tree.tokens')}
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => applyZoom(1.25)}
            aria-label={t('tree.zoomIn')}
            title={t('tree.zoomIn')}
            className="p-2 rounded-lg border border-gray-200 hover:bg-primary-50 hover:border-primary-200 text-gray-700 transition"
          >
            <ZoomIn size={18} />
          </button>
          <button
            type="button"
            onClick={() => applyZoom(0.8)}
            aria-label={t('tree.zoomOut')}
            title={t('tree.zoomOut')}
            className="p-2 rounded-lg border border-gray-200 hover:bg-primary-50 hover:border-primary-200 text-gray-700 transition"
          >
            <ZoomOut size={18} />
          </button>
          <button
            type="button"
            onClick={resetView}
            aria-label={t('tree.reset')}
            title={t('tree.reset')}
            className="p-2 rounded-lg border border-gray-200 hover:bg-primary-50 hover:border-primary-200 text-gray-700 transition"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </header>

      <div className="relative w-full rounded-xl bg-gradient-to-br from-primary-50/60 to-white border border-primary-100 overflow-hidden">
        {!tree ? (
          <div className="flex items-center justify-center text-center text-sm text-gray-500 min-h-[320px] px-6">
            {t('tree.empty')}
          </div>
        ) : (
          <svg
            ref={svgRef}
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-[420px] md:h-[520px] select-none"
            dir="ltr"
          >
            <g transform={`translate(${transform.x},${transform.y}) scale(${transform.k})`}>
              <g>
                {links.map((link) => (
                  <line
                    key={link.id}
                    x1={link.source.x}
                    y1={link.source.y}
                    x2={link.target.x}
                    y2={link.target.y}
                    stroke="#10B981"
                    strokeOpacity={0.55}
                    strokeWidth={2}
                  />
                ))}
              </g>
              <g>
                {nodes.map((node) => (
                  <TreeNode key={node.id} node={node} />
                ))}
              </g>
            </g>
          </svg>
        )}
      </div>
    </section>
  );
}