
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Overlay from '@/components/Overlay.vue'

describe('Overlay', () => {
	it('renders with default props', () => {
        const wrapper = mount(Overlay)
        expect(wrapper.exists()).toBe(true)
    })

	it('applies dark background by default', () => {
        const 
			wrapper = mount(Overlay),
        	dialog = wrapper.findComponent({ name: 'Dialog' })

        expect(dialog.props('pt').mask.style).toContain('rgba(0, 0, 0, 0.3)')
    })

	it('applies light background when specified', () => {
        const 
			wrapper = mount(Overlay, { props: { background: 'light' } }),
        	dialog = wrapper.findComponent({ name: 'Dialog' })

        expect(dialog.props('pt').mask.style).toContain('rgba(255, 255, 255, 0.3)')
    })
})