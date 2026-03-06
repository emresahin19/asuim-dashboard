import { useContext } from 'react';
import { ToasterContext } from './ToasterContext';

export function useToaster() {
  const context = useContext(ToasterContext);

  if (!context) {
    throw new Error('useToaster must be used inside ToasterProvider');
  }

  return context;
}
