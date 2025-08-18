"use client";

import { useEffect } from 'react';

export default function HydrationFix() {
  useEffect(() => {
    // Remove browser extension attributes that cause hydration issues
    const removeExtensionAttributes = () => {
      const elements = document.querySelectorAll('[data-darkreader-inline-stroke], [data-darkreader-inline-fill], [data-darkreader-inline-bgcolor], [data-darkreader-inline-color], [data-darkreader-proxy-injected]');
      
      elements.forEach((element) => {
        // Store the original styles to preserve functionality
        const originalStroke = element.getAttribute('stroke');
        const originalFill = element.getAttribute('fill');
        
        // Remove extension attributes
        element.removeAttribute('data-darkreader-inline-stroke');
        element.removeAttribute('data-darkreader-inline-fill'); 
        element.removeAttribute('data-darkreader-inline-bgcolor');
        element.removeAttribute('data-darkreader-inline-color');
        element.removeAttribute('data-darkreader-proxy-injected');
        
        // Restore original attributes if they existed
        if (originalStroke) element.setAttribute('stroke', originalStroke);
        if (originalFill) element.setAttribute('fill', originalFill);
      });
    };

    // Run on mount
    removeExtensionAttributes();

    // Also run when DOM changes (for dynamic content)
    const observer = new MutationObserver(removeExtensionAttributes);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-darkreader-inline-stroke', 'data-darkreader-inline-fill', 'data-darkreader-inline-bgcolor', 'data-darkreader-inline-color', 'data-darkreader-proxy-injected']
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
