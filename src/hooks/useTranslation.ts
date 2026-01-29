/**
 * Translation hook
 * 
 * This is a simple fallback. Users should provide their own translation hook
 * (e.g., from react-i18next) if they need internationalization.
 */

export const useTranslation = () => {
  return {
    t: (key: string) => {
      // Simple key mapping - users should replace this with their translation library
      const translations: Record<string, string> = {
        'COMMON:add': 'Add',
        'COMMON:choose_attribute': 'Choose Attribute',
        'COMMON:attribute_mapping.no_attributes_added':
          'No attributes added',
      };
      return translations[key] || key;
    },
  };
};

