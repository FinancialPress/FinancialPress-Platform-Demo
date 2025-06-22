
import { useState, useEffect } from 'react';
import { useProfile } from './useProfile';

interface UsernameValidation {
  isValid: boolean;
  isAvailable: boolean | null;
  isChecking: boolean;
  error: string | null;
  suggestions: string[];
}

export const useUsernameValidation = (username: string, displayName?: string) => {
  const { checkUsernameAvailability } = useProfile();
  const [validation, setValidation] = useState<UsernameValidation>({
    isValid: false,
    isAvailable: null,
    isChecking: false,
    error: null,
    suggestions: []
  });

  const generateSuggestions = (baseName: string): string[] => {
    if (!baseName) return [];
    
    const cleaned = baseName.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
    const suggestions = [
      cleaned,
      `${cleaned}_fp`,
      `${cleaned}trader`,
      `${cleaned}_${Math.floor(Math.random() * 999)}`,
      `fp_${cleaned}`
    ].filter(s => s.length >= 3 && s.length <= 20);
    
    return suggestions.slice(0, 3);
  };

  useEffect(() => {
    const validateUsername = async () => {
      if (!username) {
        setValidation({
          isValid: false,
          isAvailable: null,
          isChecking: false,
          error: null,
          suggestions: generateSuggestions(displayName || '')
        });
        return;
      }

      // Format validation
      const formatRegex = /^[a-zA-Z0-9_-]{3,20}$/;
      if (!formatRegex.test(username)) {
        setValidation({
          isValid: false,
          isAvailable: null,
          isChecking: false,
          error: 'Username must be 3-20 characters and contain only letters, numbers, underscores, and hyphens',
          suggestions: generateSuggestions(displayName || '')
        });
        return;
      }

      // Check availability
      setValidation(prev => ({ ...prev, isChecking: true, error: null }));
      
      try {
        const isAvailable = await checkUsernameAvailability(username);
        setValidation({
          isValid: isAvailable,
          isAvailable,
          isChecking: false,
          error: isAvailable ? null : 'Username is already taken',
          suggestions: isAvailable ? [] : generateSuggestions(displayName || '')
        });
      } catch (error) {
        setValidation({
          isValid: false,
          isAvailable: null,
          isChecking: false,
          error: 'Error checking username availability',
          suggestions: generateSuggestions(displayName || '')
        });
      }
    };

    const timeoutId = setTimeout(validateUsername, 500); // Debounce
    return () => clearTimeout(timeoutId);
  }, [username, displayName, checkUsernameAvailability]);

  return validation;
};
