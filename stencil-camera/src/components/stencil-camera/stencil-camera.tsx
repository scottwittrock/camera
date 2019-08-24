import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'stencil-camera',
  styleUrl: 'stencil-camera.css',
  shadow: true
})
export class StencilCamera {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
