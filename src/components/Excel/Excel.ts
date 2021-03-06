import { Dom } from "./../../core/dom";
import { $ } from "../../core/dom";
import { ExcelComponent } from "../../core/ExcelComponent";

type Component = { new (el: Dom): ExcelComponent; className: string };

type Options = {
  components: Component[];
};
export class Excel {
  static className = "excel";
  private components: Array<Component>;
  private renderedComponents: Array<ExcelComponent>;
  private $el: Dom;

  constructor(selector: string, options: Options) {
    this.$el = $(selector);
    this.components = options.components || [];
  }

  getRoot = (): Dom => {
    const excelRoot = $.create("div", Excel.className);

    this.renderedComponents = this.components.map((Component) => {
      const $el = $.create("div", Component.className);
      const component = new Component($el);
      if (component.name) {
        //DEBUG
        window["c" + component.name] = component;
      }
      $el.html(component.toHTML());
      excelRoot.append($el);
      return component;
    });
    return excelRoot;
  };

  render(): void {
    this.$el.insert(this.getRoot());
    this.renderedComponents.forEach((component) => {
      component.init();
    });
  }
}
