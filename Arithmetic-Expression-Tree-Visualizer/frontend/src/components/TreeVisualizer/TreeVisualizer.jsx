import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import useAppStore from '../../store/appStore';
import { useTreeLayout } from './useTreeLayout';
import TreeNode from './TreeNode';

const WIDTH = 900;
const HEIGHT = 520;

const TreeVisualizer = () => {
  const { t } = useTranslation();
  const tree = useAppStore((s) => s.tree);
  const svgRef = useRef(null);
  const zoomBehaviorRef = useRef(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, k: 1 });

  const { nodes, links } = useTreeLayout(tree, WIDTH, HEIGHT);

  useEffect(() => {
    if (!svgRef.current) return;
    const selection = d3.select(svgRef.current);
    const zoom = d3
      .zoom()
      .scaleExtent([0.3, 3])
      .on('zoom', (event) => {
        setTransform({
          x: event.transform.x,
          y: event.transform.y,
          k: event.transform.k,
        });
      });
    zoomBehaviorRef.current = zoom;
    selection.call(zoom);
    return () => {
      selection.on('.zoom', null);
    };
  }, []);

  const zoomBy = (factor) => {
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    d3.select(svgRef.current).transition().duration(200).call(zoomBehaviorRef.current.scaleBy, factor);
  };

  const resetZoom = () => {
    if (!svgRef.current || !zoomBehaviorRef.current) return;
    d3.select(svgRef.current)
      .transition()
      .duration(300)
      .call(zoomBehaviorRef.current.transform, d3.zoomIdentity);
  };

  if (!tree) {
    return (
      <div className="glass rounded-2xl p-8 h-[560px] flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-neon-300/10 border border-neon-300/30 flex items-center justify-center mb-4 animate-pulse-slow">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 3v4M12 17v4M5 12H1m22 0h-4M6.34 6.34 3.51 3.51m16.97 16.97-2.83-2.83M6.34 17.66l-2.83 2.83M20.49 3.51l-2.83 2.83"
              stroke="#C6FF3D"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <h3 className="text-lg font-display font-semibold text-white/90 mb-1">
          {t('tree.empty')}
        </h3>
        <p className="text-sm text-white/50">{t('tree.emptyHint')}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-2xl p-5 md:p-6 relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-display text-lg font-semibold text-white">
            {t('tree.title')}
          </h3>
          <div className="flex items-center gap-3 mt-1 text-xs text-white/60">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-neon-300 shadow-neon-sm" />
              {t('tree.legend.operator')}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-white/60" />
              {t('tree.legend.operand')}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => zoomBy(1.25)}
            className="w-9 h-9 rounded-lg glass hover:bg-white/10 transition flex items-center justify-center text-white/80 hover:text-neon-300"
            title={t('tree.zoomIn')}
            aria-label={t('tree.zoomIn')}
          >
            <ZoomIn size={16} />
          </button>
          <button
            onClick={() => zoomBy(0.8)}
            className="w-9 h-9 rounded-lg glass hover:bg-white/10 transition flex items-center justify-center text-white/80 hover:text-neon-300"
            title={t('tree.zoomOut')}
            aria-label={t('tree.zoomOut')}
          >
            <ZoomOut size={16} />
          </button>
          <button
            onClick={resetZoom}
            className="w-9 h-9 rounded-lg glass hover:bg-white/10 transition flex items-center justify-center text-white/80 hover:text-neon-300"
            title={t('tree.reset')}
            aria-label={t('tree.reset')}
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      <div className="rounded-xl bg-bg-deep/60 border border-white/5 grid-bg overflow-hidden">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          preserveAspectRatio="xMidYMid meet"
          style={{ width: '100%', height: 500, cursor: 'grab', direction: 'ltr' }}
        >
          <defs>
            <linearGradient id="linkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C6FF3D" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#C6FF3D" stopOpacity="0.25" />
            </linearGradient>
          </defs>

          <g
            transform={`translate(${transform.x}, ${transform.y}) scale(${transform.k})`}
          >
            {links.map((l) => (
              <line
                key={l.id}
                x1={l.source.x}
                y1={l.source.y}
                x2={l.target.x}
                y2={l.target.y}
                stroke="url(#linkGradient)"
                strokeWidth={1.8}
                strokeLinecap="round"
                className="tree-link"
              />
            ))}
            {nodes.map((n, i) => (
              <TreeNode key={n.id} node={n} index={i} />
            ))}
          </g>
        </svg>
      </div>
    </motion.div>
  );
};

export default TreeVisualizer;