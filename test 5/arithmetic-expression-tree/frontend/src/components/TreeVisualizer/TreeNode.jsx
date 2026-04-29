import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const NODE_RADIUS = 26;

export default function TreeNode({ node }) {
  const { t } = useTranslation();
  const [hovered, setHovered] = useState(false);

  const isOperator = node.type === 'operator';
  const fill = isOperator ? '#10B981' : '#ffffff';
  const stroke = isOperator ? '#047857' : '#10B981';
  const textColor = isOperator ? '#ffffff' : '#065F46';

  return (
    <g
      transform={`translate(${node.x}, ${node.y})`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: 'pointer' }}
    >
      <circle
        r={NODE_RADIUS}
        fill={fill}
        stroke={stroke}
        strokeWidth={2.5}
        style={{
          filter: hovered ? 'drop-shadow(0 4px 10px rgba(16,185,129,0.45))' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.08))',
          transition: 'filter 150ms ease',
        }}
      />
      <text
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="'JetBrains Mono', monospace"
        fontSize={isOperator ? 18 : 15}
        fontWeight={700}
        fill={textColor}
      >
        {node.value}
      </text>

      {hovered && (
        <g transform={`translate(0, ${-NODE_RADIUS - 10})`} pointerEvents="none">
          <rect
            x={-70}
            y={-34}
            width={140}
            height={30}
            rx={8}
            fill="#111827"
            opacity={0.92}
          />
          <text
            x={0}
            y={-14}
            textAnchor="middle"
            fill="#ffffff"
            fontSize={11}
            fontFamily="Inter, sans-serif"
          >
            {`${t(isOperator ? 'tree.operator' : 'tree.operand')} • ${node.value}`}
          </text>
        </g>
      )}
    </g>
  );
}