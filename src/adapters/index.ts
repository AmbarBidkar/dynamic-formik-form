/**
 * UI Library Adapters
 * 
 * Export adapters for different UI libraries
 * Users can create custom adapters by implementing UILibraryAdapter interface
 */

export { defaultAdapter } from './default.adapter';
export { createMUIAdapter } from './mui.adapter';
export { createBootstrapAdapter } from './bootstrap.adapter';
export { createAntDesignAdapter } from './antd.adapter';
export type { UILibraryAdapter } from '../types/ui-library.types';

