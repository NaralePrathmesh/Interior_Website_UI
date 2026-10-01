import { CATS } from '@/lib/data';
import { ICON } from '../ui/primitives';

export const PERMS = {
  'Super Admin': '*',
  'Content Manager': ['dashboard', 'projects', 'services', 'packages', 'gallery', 'designs', 'testimonials', 'team'],
  'Lead Manager': ['dashboard', 'enquiries'],
};
export const can = (role, v) => PERMS[role] === '*' || PERMS[role].includes(v);

const F = (k, l, t = 'text', o) => ({ k, l, t, o });
export const SCHEMA = {
  projects: {
    title: 'Projects', one: 'project', flag: 'published',
    cols: [['thumb', ''], ['name', 'Project'], ['category', 'Category'], ['location', 'Location'], ['area', 'Area'], ['featured', 'Home page'], ['published', 'Status']],
    fields: [F('name', 'Project name *'), F('category', 'Category', 'select', CATS), F('type', 'Project type', 'select', ['Residential', 'Commercial']), F('location', 'Location'), F('area', 'Area (sq.ft.)', 'number'), F('style', 'Interior style'), F('date', 'Completion month', 'month'), F('client', 'Client name (optional)'), F('desc', 'Description', 'textarea'), F('highlights', 'Highlights, one per line', 'lines'), F('image', 'Cover image', 'image'), F('featured', 'Show on home page', 'check'), F('published', 'Published', 'check')],
  },
  services: {
    title: 'Services', one: 'service', flag: 'enabled',
    cols: [['thumb', ''], ['name', 'Service'], ['short', 'Short description'], ['enabled', 'Status']],
    fields: [F('name', 'Service name *'), F('icon', 'Icon', 'select', Object.keys(ICON)), F('short', 'Short description', 'textarea'), F('detail', 'Detailed description', 'textarea'), F('features', 'Features, one per line', 'lines'), F('image', 'Service image', 'image'), F('enabled', 'Enabled', 'check')],
  },
  packages: {
    title: 'Packages', one: 'package', flag: 'enabled',
    cols: [['thumb', ''], ['name', 'Package'], ['tier', 'Type'], ['price', 'Starting price'], ['enabled', 'Status']],
    fields: [F('name', 'Package name *'), F('tier', 'Package type', 'select', ['Basic', 'Premium', 'Luxury']), F('price', 'Starting price (₹)', 'number'), F('desc', 'Description', 'textarea'), F('features', 'Features, one per line', 'lines'), F('image', 'Package image', 'image'), F('enabled', 'Enabled', 'check')],
  },
  gallery: {
    title: 'Gallery', one: 'item', flag: 'published',
    cols: [['thumb', ''], ['title', 'Title'], ['type', 'Type'], ['room', 'Room'], ['project', 'Project'], ['published', 'Status']],
    fields: [F('title', 'Title *'), F('type', 'Media type', 'select', ['Image', 'Video']), F('room', 'Room type', 'select', ['Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Office', 'Dining', 'Restaurant', 'Exterior']), F('project', 'Project', 'project'), F('image', 'Image or video thumbnail', 'image'), F('url', 'Video URL (YouTube or MP4 link)'), F('duration', 'Video length, e.g. 2:40'), F('published', 'Published', 'check')],
  },
  designs: {
    title: '3D Designs', one: 'design', flag: 'published',
    cols: [['thumb', ''], ['name', 'Design'], ['dtype', 'Type'], ['category', 'Category'], ['project', 'Project'], ['published', 'Status']],
    fields: [F('name', 'Design name *'), F('dtype', 'Type', 'select', ['Design render', 'Floor Plan', 'Walkthrough', '360° View']), F('category', 'Category', 'select', CATS), F('project', 'Project', 'project'), F('desc', 'Description', 'textarea'), F('image', 'Image (leave empty on a floor plan to show the drawing)', 'image'), F('published', 'Published', 'check')],
  },
  testimonials: {
    title: 'Testimonials', one: 'testimonial', flag: 'published',
    cols: [['name', 'Customer'], ['rating', 'Rating'], ['project', 'Project'], ['date', 'Date'], ['published', 'Status']],
    fields: [F('name', 'Customer name *'), F('review', 'Review', 'textarea'), F('rating', 'Rating', 'select', ['5', '4', '3', '2', '1']), F('project', 'Project', 'project'), F('date', 'Date', 'date'), F('image', 'Customer photo', 'image'), F('published', 'Approved & published', 'check')],
  },
  team: {
    title: 'Team', one: 'team member', flag: 'published',
    cols: [['name', 'Name'], ['role', 'Designation'], ['exp', 'Experience'], ['published', 'Status']],
    fields: [F('name', 'Name *'), F('role', 'Designation'), F('exp', 'Years of experience', 'number'), F('bio', 'Bio', 'textarea'), F('image', 'Profile image', 'image'), F('published', 'Show on website', 'check')],
  },
  users: {
    title: 'Admin Users', one: 'admin user', flag: 'published',
    cols: [['name', 'Name'], ['email', 'Email'], ['role', 'Role'], ['published', 'Status']],
    fields: [F('name', 'Name *'), F('email', 'Email'), F('role', 'Role', 'select', ['Super Admin', 'Content Manager', 'Lead Manager']), F('published', 'Active', 'check')],
  },
};

export const NAV = [
  ['Overview', [['dashboard', 'Dashboard']]],
  ['Leads', [['enquiries', 'Enquiries']]],
  ['Content', [['projects', 'Projects'], ['services', 'Services'], ['packages', 'Packages'], ['gallery', 'Gallery'], ['designs', '3D Designs'], ['testimonials', 'Testimonials'], ['team', 'Team']]],
  ['Admin', [['users', 'Admin Users'], ['settings', 'Settings']]],
];

export const SETTINGS_GROUPS = [
  ['General', [['name', 'Website name'], ['tagline', 'Tagline'], ['email', 'Email'], ['phone', 'Phone']]],
  ['Homepage hero', [['heroHeading', 'Heading'], ['heroSub', 'Subheading', 'textarea'], ['heroCta', 'Button text'], ['promises', 'Promise strip (one per line, “Title | detail”)', 'textarea']]],
  ['Contact', [['whatsapp', 'WhatsApp number (with country code, digits only)'], ['address', 'Address', 'textarea'], ['hours', 'Working hours']]],
  ['About us', [['about', 'Company description', 'textarea'], ['vision', 'Vision'], ['mission', 'Mission'], ['philosophy', 'Design philosophy', 'textarea'], ['years', 'Years experience', 'number'], ['projectsDone', 'Projects completed', 'number'], ['clients', 'Happy clients', 'number'], ['designers', 'Designers', 'number']]],
  ['Social media', [['instagram', 'Instagram URL'], ['facebook', 'Facebook URL'], ['youtube', 'YouTube URL'], ['linkedin', 'LinkedIn URL']]],
  ['SEO', [['seoTitle', 'Meta title'], ['seoDesc', 'Meta description', 'textarea'], ['keywords', 'Keywords'], ['ga', 'Google Analytics ID']]],
];
