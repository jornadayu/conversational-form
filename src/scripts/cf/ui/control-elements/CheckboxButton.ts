/*
 * Copyright (c) 2013-2018 SPACE10
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * Copyright (c) 2023 YU TECNOLOGIA E CONSULTORIA EM CAPITAL HUMANO LTDA.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { Button } from './Button'

export class CheckboxButton extends Button {
  public get type(): string {
    return 'CheckboxButton'
  }

  public get checked(): boolean {
    return this.el.getAttribute('checked') === 'checked'
  }

  public set checked(value: boolean) {
    if (!value) {
      this.el.removeAttribute('checked')
      ;(this.referenceTag.domElement as HTMLInputElement).removeAttribute(
        'checked'
      )
      ;(this.referenceTag.domElement as HTMLInputElement).checked = false
    } else {
      this.el.setAttribute('checked', 'checked')
      ;(this.referenceTag.domElement as HTMLInputElement).setAttribute(
        'checked',
        'checked'
      )
      ;(this.referenceTag.domElement as HTMLInputElement).checked = true
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected onClick(_event: MouseEvent): void {
    this.checked = !this.checked
  }

  // override
  public getTemplate(): string {
    const isChecked = !!(
      (this.referenceTag.domElement as HTMLInputElement).checked &&
      this.referenceTag.domElement?.hasAttribute('checked')
    )

    return `<cf-button class="cf-button cf-checkbox-button ${
      this.referenceTag.label.trim().length === 0 ? 'no-text' : ''
    }" checked=${isChecked ? 'checked' : ''}>
        <div>
          <cf-checkbox></cf-checkbox>
          <span>${this.referenceTag.label}</span>
        </div>
      </cf-button>
      `
  }
}
