import React from 'react';
import { IconComponent } from '../../types/ui-library.types';

interface IconRendererProps {
  Icon?: IconComponent;
  size?: string | number;
  className?: string;
}

/**
 * IconRenderer component
 * Safely renders icon components with proper typing
 */
export const IconRenderer: React.FC<IconRendererProps> = ({
  Icon,
  size = 16,
  className,
}) => {
  if (!Icon) return null;
  
  // Render icon as a component
  return React.createElement(Icon, { size, className });
};

