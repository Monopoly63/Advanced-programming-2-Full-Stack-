import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const NODE_RADIUS = 28;

export default function TreeNode({ node }) {
  const { t } = useTranslation();
  const [hovered, setHovered] = useState(false);

  const isOperator = node.type === 'operator';

  return (
    <g
      transform={`translate(${node.x}, ${node.y})`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: 'pointer' }}
    >
      {/* outer glow halo */}
      {isOperator && (
        <circle
          r={NODE_RADIUS + 6}
          fill="rgba(59,123,255,0.18)"
          style={{
            opacity: hovered ? 1 : 0.5,
            transition: 'opacity 200ms ease',
            filter: 'blur(6px)',
          }}
        />
      )}

      <circle
        r={NODE_RADIUS}
        fill={isOperator ? 'url(#opGradient)' : 'rgba(12,18,32,0.95)'}
        stroke={isOperator ? 'rgba(255,255,255,0.25)' : 'rgba(59,123,255,0.55)'}
        strokeWidth={isOperator ? 1.5 : 2}
        style={{
          filter: hovered
            ? 'drop-shadow(0 0 20px rgba(59,123,255,0.6))'
            : 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))',
          transition: 'filter 200ms ease',
        }}
      />
      <text
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="'JetBrains Mono', monospace"
        fontSize={isOperator ? 18 : 15}
        fontWeight={700}
        fill={isOperator ? '#FFFFFF' : '#A8C4FF'}
      >
        {node.value}
      </text>

      {hovered && (
        <g transform={`translate(0, ${-NODE_RADIUS - 14})`} pointerEvents="none">
          <rect
            x={-76}
            y={-36}
            width={152}
            height={30}
            rx={8}
            fill="rgba(8,13,26,0.95)"
            stroke="rgba(59,123,255,0.4)"
            strokeWidth={1}
          />
          <text
            x={0}
            y={-16}
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize={11}
            fontFamily="'Plus Jakarta Sans', sans-serif"
            fontWeight={500}
          >
            {`${t(isOperator ? 'tree.operator' : 'tree.operand')} • ${node.value}`}
          </text>
        </g>
      )}
    </g>
  );
}