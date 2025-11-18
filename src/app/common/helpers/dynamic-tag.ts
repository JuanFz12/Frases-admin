import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[dynamicTag]',
})
export class DynamicTagDirective implements OnInit {
  @Input('dynamicTag') tag!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const host = this.el.nativeElement;
    const parent = host.parentNode;

    const newEl = this.renderer.createElement(this.tag);

    // Copiar atributos (clases)
    if (host.className) {
      this.renderer.setAttribute(newEl, 'class', host.className);
    }

    // Mover contenido
    while (host.firstChild) {
      this.renderer.appendChild(newEl, host.firstChild);
    }

    // Reemplazar elemento
    this.renderer.insertBefore(parent, newEl, host);
    this.renderer.removeChild(parent, host);
  }
}
