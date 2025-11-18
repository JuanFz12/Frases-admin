import { Component, input, OnInit } from '@angular/core';
import { DynamicTagDirective } from '../../helpers/dynamic-tag';
@Component({
  selector: 'app-theme-text',
  templateUrl: './theme-text.html',
  styles: ``,
  imports: [DynamicTagDirective],

})
export class ThemeText {
  text = input<string | null>(null);

  variant = input<'title' | 'subtitle' | 'label' | 'paragraph' | 'small'>('paragraph');
  color = input<string>('text-gray-900');
  weight = input<string>('font-normal');
  tagName = input<'p' | 'span' | 'label' | 'h1' | 'h2' | 'h3'>('p');

  class = input<string>('');
  get classes() {
    const base = `${this.color()} ${this.weight()}`;

    const variants = {
      title: 'regular-text-title',
      subtitle: 'regular-text-xl',
      label: 'regular-text-m',
      paragraph: 'regular-text-l',
      small: 'regular-text-s',
    };

    return `${base} ${variants[this.variant()]}`;
  }


}
