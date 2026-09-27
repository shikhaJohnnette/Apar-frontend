import type { Book } from '../../domain/entities/Book';

type Props = { icon: Book['icon'] };

export function BookIcon({ icon }: Props) {
  if (icon === 'brain') return <span className="book-symbol brain-symbol">●</span>;
  if (icon === 'robot') return <span className="book-symbol robot-symbol">▣</span>;
  if (icon === 'chart') return <span className="book-symbol chart-symbol">⌁</span>;
  if (icon === 'leaf') return <span className="book-symbol leaf-symbol">◒</span>;
  if (icon === 'target') return <span className="book-symbol target-symbol">◉</span>;
  return <span className="book-symbol trend-symbol">↗</span>;
}
