/**
 * Component Registration
 * Ensures all components are imported and registered with the custom elements registry
 */

// Import FIRST - this triggers the @customElement decorators
// The key is to import the classes, not just the side-effects
import { Button } from '../src/components/atoms/button';
import { Badge } from '../src/components/atoms/badge';
import { Heading, Text } from '../src/components/atoms/typography';
import { Tabs } from '../src/components/atoms/tabs';
import { Input, Textarea } from '../src/components/atoms/input';
import { Icon } from '../src/components/atoms/icon';
import { Link } from '../src/components/atoms/link';
import { Search } from '../src/components/atoms/search';
import { FileUpload } from '../src/components/atoms/file-upload';
import { Calendar } from '../src/components/atoms/calendar';
import { Spinner } from '../src/components/atoms/spinner';

import { Card } from '../src/components/molecules/card';
import { Table } from '../src/components/molecules/table';
import { Grid } from '../src/components/molecules/grid';
import { Visualizer } from '../src/components/molecules/visualizer';
import { Playlist } from '../src/components/molecules/playlist';
import { MusicPlayer } from '../src/components/molecules/music-player';
import { Terminal } from '../src/components/molecules/terminal';
import { Navbar } from '../src/components/molecules/navbar';
import { Header } from '../src/components/molecules/header';
import { Footer } from '../src/components/molecules/footer';
import { Menu } from '../src/components/molecules/menu';
import { CRTOverlay } from '../src/components/molecules/crt-overlay';

import { MusicStation } from '../src/components/organisms/music-station';

// Create a dummy object that references all components to prevent tree-shaking
// This ensures the @customElement decorators are executed
const _components = {
  Button,
  Badge,
  Heading,
  Text,
  Tabs,
  Input,
  Textarea,
  Icon,
  Link,
  Search,
  FileUpload,
  Calendar,
  Spinner,
  Card,
  Table,
  Grid,
  Visualizer,
  Playlist,
  MusicPlayer,
  Terminal,
  Navbar,
  Header,
  Footer,
  Menu,
  CRTOverlay,
  MusicStation,
};

// Log registration to console
console.log('Component registry loaded:', Object.keys(_components).length, 'components');

// Export for type checking
export { Button, Badge, Heading, Text, Tabs, Input, Textarea, Icon, Link, FileUpload, Calendar, Spinner, Card, Table, Grid, Visualizer, Playlist, MusicPlayer, Terminal, Navbar, Header, Footer, Menu, CRTOverlay, MusicStation };


