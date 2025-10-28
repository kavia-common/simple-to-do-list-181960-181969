 /**
  * PUBLIC_INTERFACE
  * setLiveMessage updates the text content of a live region element reference.
  */
export function setLiveMessage(ref, message) {
  if (!ref || !ref.current) return;
  ref.current.textContent = '';
  setTimeout(() => {
    if (ref.current) ref.current.textContent = message;
  }, 30);
}
