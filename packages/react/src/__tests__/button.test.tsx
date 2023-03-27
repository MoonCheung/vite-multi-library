import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { CButton } from '../index';

describe('Test Button component', () => {
  it('export type', () => {
    expect(CButton).toBeDefined();
  });

  it('Test click event', async () => {
    const mockFn = vi.fn();
    render(<CButton onClick={mockFn}>ok!</CButton>);
    await userEvent.click(screen.getByRole('button'));
    // to click time 1
    expect(mockFn).toHaveBeenCalledTimes(1);
    // to click time 1
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
