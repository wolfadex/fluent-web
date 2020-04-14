import { FluentBundle, FluentResource } from "@fluent/bundle";
import { mapBundleSync } from "@fluent/sequence";
import { CachedSyncIterable } from "cached-iterable";

const MESSAGE_ID_ATTRIBUTE = "messageId";

class FluentWeb {
  setBundles(bundles) {
    this.bundles = CachedSyncIterable.from(bundles);
  }

  getMessage({ messageId, args, element }) {
    if (this.bundles) {
      const bundle = mapBundleSync(this.bundles, messageId);

      if (bundle) {
        const message = bundle.getMessage(messageId);

        if (message) {
          let errors = [];
          const value = bundle.formatPattern(message.value, args, errors);

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
            element.dispatchEvent(errorEvent);
          }

          return { value, attributes: message.attributes };
        } else {
          const errorEvent = new CustomEvent("fluent-web-error", {
            bubbles: true,
            detail: {
              messageId,
              args,
              errors: [new Error("Message object not found")],
            },
          });
          element.dispatchEvent(errorEvent);
        }
      } else {
        const errorEvent = new CustomEvent("fluent-web-error", {
          bubbles: true,
          detail: {
            messageId,
            args,
            errors: [
              new Error(`Bundle with messageId: ${messageId} not found`),
            ],
          },
        });
        element.dispatchEvent(errorEvent);
      }
    }

    return null;
  }
}

class FluentElement extends HTMLElement {
  constructor() {
    super();

    if (window.fluentWeb == null) {
      window.fluentWeb = new FluentWeb();
    }
  }

  connectedCallback() {
    this.render();
  }

  set messages(newValue) {
    this.buildBundles(newValue);
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

  buildBundles(fetchedMessages) {
    const bundles = [];

    for (let [locale, messages] of fetchedMessages) {
      let resource = new FluentResource(messages);
      let bundle = new FluentBundle(locale);

      bundle.addResource(resource);
      bundles.push(bundle);
    }

    window.fluentWeb.setBundles(bundles);
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
      const message = window.fluentWeb.getMessage({
        messageId: this.getAttribute(MESSAGE_ID_ATTRIBUTE),
        args: this.messageArgs,
        element: this,
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
        const message = window.fluentWeb.getMessage({
          messageId: this.getAttribute(MESSAGE_ID_ATTRIBUTE),
          args: this.messageArgs,
          element: this,
        });

        if (message) {
          Object.entries(message.attributes).forEach(([key, val]) => {
            this.firstElementChild.setAttribute(key, val);
          });

          semiSafeInnerHTML(this.firstElementChild, message);
        }
      }
    }
  }
);
