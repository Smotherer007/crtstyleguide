/**
 * CRT Living Style Guide - Main Application
 * Built with Lit Components using Atomic Design
 */

// Import styles FIRST
import '../src/styles/index.css';
import './style.css';

// Import components directly to ensure registration
import '../src/components/atoms/button';
import '../src/components/atoms/badge';
import '../src/components/atoms/typography';
import '../src/components/atoms/tabs';
import '../src/components/atoms/input';
import '../src/components/atoms/icon';
import '../src/components/atoms/link';
import '../src/components/atoms/search';
import '../src/components/atoms/file-upload';
import '../src/components/atoms/calendar';
import '../src/components/atoms/select';
import '../src/components/atoms/checkbox-radio';
import '../src/components/atoms/progress';
import '../src/components/atoms/tooltip';
import '../src/components/atoms/breadcrumb';
import '../src/components/atoms/pagination';
import '../src/components/atoms/slider';
import '../src/components/atoms/toggle';
import '../src/components/atoms/avatar';
import '../src/components/atoms/alert';
import '../src/components/atoms/spinner';
import '../src/components/molecules/card';
import '../src/components/molecules/table';
import '../src/components/molecules/grid';
import '../src/components/molecules/code-example';
import '../src/components/molecules/modal';
import '../src/components/molecules/toast';
import '../src/components/molecules/accordion';
import '../src/components/molecules/visualizer';
import '../src/components/molecules/playlist';
import '../src/components/molecules/music-player';
import '../src/components/molecules/terminal';
import '../src/components/molecules/navbar';
import '../src/components/molecules/header';
import '../src/components/molecules/footer';
import '../src/components/molecules/crt-screen';
import '../src/components/organisms/music-station';

// Import and render template
import { render } from 'lit';
import { styleGuideTemplate } from './template';
import { categories, componentDocs, useCases } from './data/components';

// Wait for custom elements to be defined, then render
customElements.whenDefined('crt-button').then(() => {
  console.log('✅ Components loaded, rendering style guide...');
  
  const root = document.getElementById('app');
  if (root) {
    render(styleGuideTemplate(), root);

    // Attach a demo async fetcher to the search demo (simulated server)
    setTimeout(() => {
      const data = [
        { value: 'patimwep', label: 'Patimwep - Verrostete Terminals' },
        { value: 'retro', label: 'Retro Beats' },
        { value: 'synth', label: 'Synthwave' },
        { value: 'chiptune', label: 'Chiptune Classics' },
        { value: 'ambient', label: 'Ambient Textures' }
      ];

      const sections = categories.map((category) => ({
        value: `#${category.id}`,
        label: category.label,
        href: `#${category.id}`,
      }));

      const components = componentDocs.map((component) => ({
        value: component.name.toLowerCase(),
        label: `${component.name} (${component.tag})`,
        href: `#${component.id}`,
      }));

      const cases = useCases.map((useCase) => ({
        value: useCase.title.toLowerCase(),
        label: `Use Case: ${useCase.title}`,
        href: `#${useCase.id}`,
      }));

      const suggestions = [...sections, ...components, ...cases, ...data];

      // Attach fetcher to all search instances in the styleguide (header + demo)
      const searches = Array.from(document.querySelectorAll('crt-search')) as any[];
      for (const sEl of searches) {
        // Avoid overwriting an existing fetcher
        if (!sEl.fetcher) {
          sEl.fetcher = async (q: string) => {
            await new Promise((r) => setTimeout(r, 200));
            const s = (q || '').toLowerCase();
            return suggestions.filter((item: any) => (item.label || item.value).toLowerCase().includes(s)).slice(0, 50);
          };
        }

        sEl.addEventListener('select', (e: any) => {
          const item = e.detail?.item;
          console.log('Search select:', e.detail);
          // Navigate to href if present
          if (item?.href) {
            const target = document.querySelector(item.href) as HTMLElement | null;
            if (target) {
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
              try { history.replaceState(null, '', item.href); } catch (err) { location.hash = item.href; }
            }
          }

          const toast = document.querySelector('crt-toast') as any;
          toast?.show?.({ message: `Selected: ${e.detail.label || e.detail.value}`, variant: 'success' });
        });
      }
      
      // Wire CRT power switch demo (if present in template)
      const powerSwitch = document.getElementById('crt-power-switch') as HTMLInputElement | null;
      if (powerSwitch) {
        const sync = () => document.documentElement.classList.toggle('sg-authentic', powerSwitch.checked);
        powerSwitch.addEventListener('change', sync);
        // initialize state
        sync();
      }

      // Global CRT Screen wrapper functionality
      let globalScreen: any = null;
      let currentColor: 'green' | 'amber' | 'blue' = 'green';
      const appContainer = document.getElementById('app');
      let originalContent: Node[] = [];
      
      // Use event delegation on document level to ensure events work after DOM changes
      document.addEventListener('screen-toggle', (e: any) => {
        const active = e.detail.active;
        
        if (active && !globalScreen) {
          // Store original DOM nodes
          originalContent = Array.from(appContainer?.childNodes || []);
          
          // Create and wrap content in CRT screen
          globalScreen = document.createElement('crt-screen');
          globalScreen.color = currentColor;
          globalScreen.active = true;
          globalScreen.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%; z-index: 1; background: #000;';
          
          // Move nodes into screen
          if (appContainer) {
            originalContent.forEach(node => {
              globalScreen.appendChild(node);
            });
            appContainer.appendChild(globalScreen);
          }
        } else if (!active && globalScreen) {
          // Trigger power-off animation first
          globalScreen.active = false;
          
          // Wait for power-off animation to complete (0.55s)
          setTimeout(() => {
            // Restore original content
            if (appContainer && globalScreen && globalScreen.parentNode) {
              // Move nodes back from screen to app container
              const nodes = Array.from(globalScreen.childNodes) as Node[];
              globalScreen.remove();
              nodes.forEach((node: Node) => {
                appContainer.appendChild(node);
              });
            }
            globalScreen = null;
          }, 600); // 550ms animation + 50ms buffer
        }
      });

      // Listen for color changes
      document.addEventListener('color-change', (e: any) => {
        currentColor = e.detail.color;
        if (globalScreen) {
          globalScreen.color = currentColor;
        }
      });
    }, 50);
  }
});
