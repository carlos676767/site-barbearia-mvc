export default class Alerts {
  static alert(icon, text, title) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
    });
  }
}
