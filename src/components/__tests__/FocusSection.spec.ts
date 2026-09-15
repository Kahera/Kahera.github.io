import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import FocusSection from '../FocusSection.vue';

const props = {
  id: 'making',
  eyebrow: 'Making and tinkering',
  heading: 'From an idea to a thing.',
  description: 'Sewing and woodworking.'
};

describe('FocusSection', () => {
  it('labels the section and renders text without requiring a photo', () => {
    const wrapper = mount(FocusSection, { props });
    expect(wrapper.attributes('aria-labelledby')).toBe('making-title');
    expect(wrapper.get('h3').attributes('id')).toBe('making-title');
    expect(wrapper.text()).toContain(props.description);
    expect(wrapper.find('img').exists()).toBe(false);
    expect(wrapper.get('.font-icon').element.closest('[aria-hidden="true"]')).not.toBeNull();
  });

  it('supports a work-level heading, reversed image, and caption', () => {
    const wrapper = mount(FocusSection, {
      props: {
        ...props,
        headingLevel: 2,
        reverse: true,
        tone: 'blue',
        image: { src: '/work.webp', alt: 'June at work', caption: 'At the keyboard.' }
      }
    });
    expect(wrapper.get('h2').text()).toBe(props.heading);
    expect(wrapper.get('img').attributes('alt')).toBe('June at work');
    expect(wrapper.get('img').attributes('loading')).toBe('lazy');
    expect(wrapper.get('figcaption').text()).toBe('At the keyboard.');
    expect(wrapper.find('.font-icon').exists()).toBe(false);
  });

  it('allows custom content, links, and media', () => {
    const wrapper = mount(FocusSection, {
      props,
      slots: {
        default: '<p>Custom work introduction</p>',
        links: '<a href="https://www.linkedin.com/">LinkedIn</a>',
        media: '<img src="/custom.webp" alt="A sewing project">'
      }
    });
    expect(wrapper.text()).toContain('Custom work introduction');
    expect(wrapper.text()).not.toContain(props.description);
    expect(wrapper.get('a').text()).toBe('LinkedIn');
    expect(wrapper.get('img').attributes('alt')).toBe('A sewing project');
  });
});