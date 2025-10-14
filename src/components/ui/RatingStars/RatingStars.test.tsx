import { render, screen } from '@/lib/test-utils';
import { describe, it, expect } from 'vitest';
import { RatingStars } from './RatingStars';

describe('RatingStars', () => {
  it('renders 5 stars by default', () => {
    const { container } = render(<RatingStars value={0} />);
    const stars = container.querySelectorAll('svg');
    expect(stars).toHaveLength(5);
  });

  it('fills stars based on value', () => {
    const { container } = render(<RatingStars value={3} />);
    const stars = container.querySelectorAll('svg');
    
    // First 3 stars should be filled (filled prop is true)
    expect(stars[0].querySelector('path')).toHaveAttribute('fill', 'currentColor');
    expect(stars[1].querySelector('path')).toHaveAttribute('fill', 'currentColor');
    expect(stars[2].querySelector('path')).toHaveAttribute('fill', 'currentColor');
    
    // Last 2 stars should be empty (filled prop is false)
    expect(stars[3].querySelector('path')).toHaveAttribute('fill', 'none');
    expect(stars[4].querySelector('path')).toHaveAttribute('fill', 'none');
  });

  it('handles decimal values with half stars', () => {
    const { container } = render(<RatingStars value={3.5} />);
    const stars = container.querySelectorAll('svg');
    expect(stars).toHaveLength(5);
    // We round to nearest integer (4 stars filled)
    expect(stars[3].querySelector('path')).toHaveAttribute('fill', 'currentColor');
  });

  it('displays count when provided', () => {
    render(<RatingStars value={4} count={128} />);
    expect(screen.getByText('(128)')).toBeInTheDocument();
  });

  it('does not display count when not provided', () => {
    const { container } = render(<RatingStars value={4} />);
    expect(container.textContent).not.toContain('(');
  });

  it('has proper aria-label', () => {
    render(<RatingStars value={4.5} />);
    expect(screen.getByLabelText(/valoración 4\.5 de 5/i)).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<RatingStars value={3} className="custom-rating" />);
    expect(container.firstChild).toHaveClass('custom-rating');
  });

  it('handles value of 0', () => {
    const { container } = render(<RatingStars value={0} />);
    const stars = container.querySelectorAll('svg');
    stars.forEach(star => {
      expect(star.querySelector('path')).toHaveAttribute('fill', 'none');
    });
  });

  it('handles value of 5 (max)', () => {
    const { container } = render(<RatingStars value={5} />);
    const stars = container.querySelectorAll('svg');
    stars.forEach(star => {
      expect(star.querySelector('path')).toHaveAttribute('fill', 'currentColor');
    });
  });

  it('applies custom size', () => {
    const { container } = render(<RatingStars value={3} size={20} />);
    const stars = container.querySelectorAll('svg');
    stars.forEach(star => {
      expect(star).toHaveAttribute('width', '20');
      expect(star).toHaveAttribute('height', '20');
    });
  });

  it('uses default size of 16', () => {
    const { container } = render(<RatingStars value={3} />);
    const stars = container.querySelectorAll('svg');
    expect(stars[0]).toHaveAttribute('width', '16');
    expect(stars[0]).toHaveAttribute('height', '16');
  });
});
