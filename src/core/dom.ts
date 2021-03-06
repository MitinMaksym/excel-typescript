export class Dom {
  public $el: HTMLElement;
  constructor(selector: string | HTMLElement) {
    this.$el =
      typeof selector === "string"
        ? document.querySelector(selector)
        : selector;
  }

  html(html?: string): string | Dom {
    if (html) {
      this.$el.innerHTML = html;
      return this;
    } else {
      return this.$el.innerHTML.trim();
    }
  }

  clear(): Dom {
    this.html("");
    return this;
  }

  append(node: Element | Dom): void {
    if (node instanceof Dom) {
      node = node.$el;
    }
    this.$el.append(node);
  }
  on(eventType: string, handler: () => void): void {
    this.$el.addEventListener(eventType, handler);
  }
  off(eventMame: string, handler: () => void): void {
    this.$el.removeEventListener(eventMame, handler);
  }

  css(styles: { [key: string]: string }): Dom {
    // for (const key in styles) {
    //   this.$el.style[key] = styles[key];
    // }
    const keys = Object.keys(styles);
    keys.forEach((key) => (this.$el.style[key] = styles[key]));

    return this;
  }
  findAll(selector: string): Dom[] {
    const items = this.$el.querySelectorAll(selector);
    return Array.from(items).map((el) => $(el as HTMLElement));
  }
  closest(selector): Dom {
    return $(this.$el.closest(selector));
  }
  getCoords(): DOMRect {
    return this.$el.getBoundingClientRect();
  }
  get data(): { [key: string]: string } {
    return this.$el.dataset;
  }
  insert(node: Dom | HTMLElement): Dom {
    if (node instanceof Dom) {
      node = node.$el;
    }
    this.$el.append(node);
    return this;
  }
}

export function $(selector: string | HTMLElement): Dom {
  return new Dom(selector);
}

$.create = (tagName: string, classes = "") => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
