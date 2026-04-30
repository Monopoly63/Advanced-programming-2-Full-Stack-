import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const TreeNode = ({ node, index }) => {
  const { t } = useTranslation();
  const [hover, setHover] = useState(false);
  const isOperator = node.type === 'operator';

  // Visual constants
  const radius = isOperator ? 28 : 24;
  const fill = isOperator ? 'rgba(198,255,61,0.18)' : 'rgba(255,255,255,0.08)';
  const stroke = isOperator ? '#C6FF3D' : 'rgba(255,255,255,0.45)';
  const textColor = isOperator ? '#C6FF3D' : '#F3F4F6';

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.6), ease: 'easeOut' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ cursor: 'pointer' }}
    >
      {/* Glow halo for operators */}
      {isOperator && (
        <circle
          cx={node.x}
          cy={node.y}
          r={radius + 10}
          fill="rgba(198,255,61,0.18)"
          style={{ filter: 'blur(10px)' }}
        />
      )}

      <circle
        cx={node.x}
        cy={node.y}
        r={radius}
        fill={fill}
        stroke={stroke}
        strokeWidth={isOperator ? 2.2 : 1.6}
        style={{
          filter: isOperator
            ? 'drop-shadow(0 0 10px rgba(198,255,61,0.55))'
            : 'drop-shadow(0 0 6px rgba(255,255,255,0.12))',
          transition: 'all 200ms ease',
          transformOrigin: `${node.x}px ${node.y}px`,
          transform: hover ? 'scale(1.08)' : 'scale(1)',
        }}
      />

      <text
        x={node.x}
        y={node.y}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="JetBrains Mono, monospace"
        fontWeight={700}
        fontSize={isOperator ? 20 : 15}
        fill={textColor}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        {node.value}
      </text>

      {/* Tooltip */}
      {hover && (
        <g pointerEvents="none">
          <rect
            x={node.x + radius + 6}
            y={node.y - 36}
            width={150}
            height={70}
            rx={10}
            fill="rgba(13,17,23,0.95)"
            stroke="rgba(198,255,61,0.4)"
            strokeWidth={1}
            style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.5))' }}
          />
          <text
            x={node.x + radius + 18}
            y={node.y - 16}
            fontSize={11}
            fill="rgba(255,255,255,0.6)"
            fontFamily="Inter, sans-serif"
          >
            {t('tree.tooltip.type')}:
          </text>
          <text
            x={node.x + radius + 58}
            y={node.y - 16}
            fontSize={11}
            fontWeight={600}
            fill="#C6FF3D"
            fontFamily="Inter, sans-serif"
          >
            {isOperator ? t('tree.tooltip.operator') : t('tree.tooltip.operand')}
          </text>

          <text
            x={node.x + radius + 18}
            y={node.y + 2}
            fontSize={11}
            fill="rgba(255,255,255,0.6)"
            fontFamily="Inter, sans-serif"
          >
            {t('tree.tooltip.value')}:
          </text>
          <text
            x={node.x + radius + 58}
            y={node.y + 2}
            fontSize={11}
            fontWeight={600}
            fill="#fff"
            fontFamily="JetBrains Mono, monospace"
          >
            {String(node.value)}
          </text>

          <text
            x={node.x + radius + 18}
            y={node.y + 20}
            fontSize={11}
            fill="rgba(255,255,255,0.6)"
            fontFamily="Inter, sans-serif"
          >
            {t('tree.tooltip.depth')}:
          </text>
          <text
            x={node.x + radius + 58}
            y={node.y + 20}
            fontSize={11}
            fontWeight={600}
            fill="#fff"
            fontFamily="Inter, sans-serif"
          >
            {node.depth}
          </text>
        </g>
      )}
    </motion.g>
  );
};

export default TreeNode;