import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useTranslation } from 'react-i18next';
import { ZoomIn, ZoomOut, RotateCcw, GitBranch } from 'lucide-react';
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
    <section className="glass p-6 md:p-7 flex flex-col">
      <header className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-gradient flex items-center justify-center shadow-glow-sm">
            <GitBranch className="w-5 h-5 text-white" strokeWidth={2.3} />
          </div>
          <div>
            <div className="label-eyebrow">{t('tree.title')}</div>
            {metadata ? (
              <div className="text-sm text-ink-secondary mt-0.5 flex flex-wrap gap-x-4 gap-y-0.5">
                <span><span className="text-white font-semibold">{metadata.nodeCount}</span> {t('tree.nodes')}</span>
                <span><span className="text-white font-semibold">{metadata.depth}</span> {t('tree.depth')}</span>
                <span><span className="text-white font-semibold">{metadata.tokenCount}</span> {t('tree.tokens')}</span>
              </div>
            ) : (
              <div className="text-sm text-ink-muted mt-0.5">—</div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => applyZoom(1.25)}
            aria-label={t('tree.zoomIn')}
            title={t('tree.zoomIn')}
            className="btn-icon"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => applyZoom(0.8)}
            aria-label={t('tree.zoomOut')}
            title={t('tree.zoomOut')}
            className="btn-icon"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={resetView}
            aria-label={t('tree.reset')}
            title={t('tree.reset')}
            className="btn-icon"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div
        className="relative w-full rounded-2xl overflow-hidden"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(59,123,255,0.10) 0%, rgba(123,91,255,0.05) 40%, transparent 70%), rgba(12,18,32,0.6)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* subtle grid inside */}
        <div className="absolute inset-0 bg-dot-grid opacity-[0.06] pointer-events-none" />

        {!tree ? (
          <div className="flex flex-col items-center justify-center text-center min-h-[360px] px-6 py-10">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                 style={{ background: 'rgba(59,123,255,0.1)', border: '1px solid rgba(59,123,255,0.25)' }}>
              <GitBranch className="w-6 h-6 text-accent" strokeWidth={2} />
            </div>
            <div className="text-sm text-ink-secondary max-w-xs">{t('tree.empty')}</div>
          </div>
        ) : (
          <svg
            ref={svgRef}
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
            className="relative w-full h-[420px] md:h-[520px] select-none"
            dir="ltr"
          >
            <defs>
              <linearGradient id="opGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B7BFF" />
                <stop offset="100%" stopColor="#7B5BFF" />
              </linearGradient>
              <linearGradient id="linkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(59,123,255,0.85)" />
                <stop offset="100%" stopColor="rgba(123,91,255,0.35)" />
              </linearGradient>
              <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g transform={`translate(${transform.x},${transform.y}) scale(${transform.k})`}>
              <g>
                {links.map((link) => (
                  <line
                    key={link.id}
                    x1={link.source.x}
                    y1={link.source.y}
                    x2={link.target.x}
                    y2={link.target.y}
                    stroke="url(#linkGradient)"
                    strokeWidth={2}
                    strokeLinecap="round"
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