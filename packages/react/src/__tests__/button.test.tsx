import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { CButton } from '../index'

describe('Test Button component', () => {
  it('export type', () => {
    expect(CButton).toBeDefined()
  })

  it('Test click event', async () => {
    const mockFn = vi.fn()
    render(<CButton onClick={mockFn}>ok!</CButton>)
    await userEvent.click(screen.getByRole('button'))
    // to click time 1
    expect(mockFn).toHaveBeenCalledTimes(1)
    // to click time 1
    expect(mockFn).toHaveBeenCalledTimes(1)
  })
})
