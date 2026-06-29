import DirectoryItem from '@/components/directory-item/directory-item.component';
import { DIRECTORY_CATEGORIES } from './directory.data';

const directoryStyles = {
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap' as const,
  justifyContent: 'space-between',
};

const Directory = () => (
  <div style={directoryStyles}>
    {DIRECTORY_CATEGORIES.map((category) => (
      <DirectoryItem
        key={category.id}
        title={category.title}
        imageUrl={category.imageUrl}
        imageAlt={category.imageAlt}
        href={category.href}
        priority={category.priority}
      />
    ))}
  </div>
);

export default Directory;