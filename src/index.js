import { mapBundleSync } from "@fluent/sequence";
import { CachedSyncIterable } from "cached-iterable";

const MESSAGE_ID_ATTRIBUTE = "messageId";

class FluentElement extends HTMLElement {
  getMessage({ messageId, args, whitelist = [] }) {
    if (this._bundles) {
      const bundle = mapBundleSync(this._bundles, messageId);

      if (bundle) {
        const message = bundle.getMessage(messageId);

        if (message) {
          const formatted = { value: null, attributes: {} };
          let errors = [];

          formatted.value = bundle.formatPattern(message.value, args, errors);

          Object.entries(message.attributes).forEach(([name, value]) => {
            if (whitelist.includes(name)) {
              formatted.attributes[name] = bundle.formatPattern(value, args, errors);
            }
          });

          if (errors.length > 0) {
            const errorEvent = new CustomEvent("fluent-web-error", {
              bubbles: true,
              detail: {
                messageId,
                args,
                message,
                errors,
              },
            });
            this.dispatchEvent(errorEvent);
          }

          return formatted;
        } else {
          const errorEvent = new CustomEvent("fluent-web-error", {
            bubbles: true,
            detail: {
              messageId,
              args,
              errors: [new Error("Message object not found")],
            },
          });
          this.dispatchEvent(errorEvent);
        }
      }
    }

    return null;
  }

  connectedCallback() {
    this.render();
  }

  set bundles(newBundles) {
    this._bundles = CachedSyncIterable.from(newBundles);
    this.render();
  }

  set attributeWhitelist(whitelist) {
    this.whitelist = whitelist;
    this.render();
  }

  set args(newValue) {
    this.messageArgs = newValue;
    this.render();
  }

  static get observedAttributes() {
    return [MESSAGE_ID_ATTRIBUTE];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === MESSAGE_ID_ATTRIBUTE && oldValue !== newValue) {
      this.render();
    }
  }
}

function semiSafeInnerHTML(el, message) {
  if (message.value && message.value !== "{???}") {
    const template = document.createElement("template");
    template.innerHTML = message.value;
    el.innerHTML = "";
    Array.from(template.content.childNodes).forEach((node) => {
      el.appendChild(node);
    });
  }
}

customElements.define(
  "fluent-text",
  class extends FluentElement {
    render() {
      const message = this.getMessage({
        messageId: this.getAttribute(MESSAGE_ID_ATTRIBUTE),
        args: this.messageArgs,
      });

      if (message) {
        semiSafeInnerHTML(this, message);
      }
    }
  }
);

customElements.define(
  "fluent-element",
  class extends FluentElement {
    render() {
      if (this.firstElementChild) {
        const message = this.getMessage({
          messageId: this.getAttribute(MESSAGE_ID_ATTRIBUTE),
          args: this.messageArgs,
          whitelist: this.whitelist
        });

        if (message) {
          Object.entries(message.attributes).forEach(([name, value]) => {
            this.firstElementChild.setAttribute(name, value);
          });

          semiSafeInnerHTML(this.firstElementChild, message);
        }
      }
    }
  }
);
