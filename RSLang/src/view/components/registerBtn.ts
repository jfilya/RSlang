export default function userLogout():void {
//   const loginBtn = document.querySelector('.header__register');
  const logoutBtn = document.querySelector('.header__logout');

  logoutBtn?.addEventListener('click', () => {
    localStorage.clear();
    // loginBtn?.classList.remove('header_hidden');
    // logoutBtn?.classList.add('header_hidden');
    window.location.reload();
  });
}
