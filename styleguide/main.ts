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
import '../src/components/atoms/skeleton';
import '../src/components/atoms/alert';
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
import '../src/components/organisms/music-station';

// Import and render template
import { render } from 'lit';
import { styleGuideTemplate } from './template';

// Wait for custom elements to be defined, then render
customElements.whenDefined('crt-button').then(() => {
  console.log('✅ Components loaded, rendering style guide...');
  
  const root = document.getElementById('app');
  if (root) {
    render(styleGuideTemplate(), root);
  }
});
